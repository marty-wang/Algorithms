do (App) ->

    Raphael.fn.algLeaf = (x, y, text="", r=20) ->
        return new Leaf this, x, y, text, r

    class Leaf
    
        constructor: (paper, x, y, text, r) ->
            @_paper = paper
            @_x = x
            @_y = y
            @_text = text
            @_radius = r

            @_set = null
            @_leaf = null
            @_label = null
            @_centerLine = null

            # property
            @level = 0
            @payload = null
            @key = null # TODO: key probably should be set in constructor and should not be writtable

            _render.call this
            _registerEventHandler.call this

        getPosition: ->
            [@_x, @_y]


        move: (x, y, animate = false) ->
            @_x = x
            @_y = y

            props = {
                cx: x
                cy: y
                x: x
                y: y
                path: "M#{@_x} #{@_y}L#{@_x} #{@_y+400}"
            }

            if animate
                @_set.animate props, 500
            else
                @_set.attr props


        # Private

        _render = ->
            unless @_set?
                set = @_paper.set()
                leaf = @_paper.circle @_x, @_y, @_radius
                label = @_paper.text @_x, @_y, @_text
                centerLine = @_paper.path()
                set.push leaf, label, centerLine

                @_leaf = leaf
                @_label = label
                @_centerLine = centerLine
                @_set = set

            @_leaf.attr {
                stroke: "white"
                fill: "black"
            }

            @_label.attr {
                fill: "white"
                "font-size": 12
                "font-weight": 800
                text: @_text
            }

            @_centerLine.attr {
                stroke: "white"
                "stroke-width": 2
                "stroke-dasharray": "-"
                "stroke-opacity": 0.5
            }

            this.move @_x, @_y
        
        _registerEventHandler = ->
            self = this
            @_set.click ->
                console.log self
      

###############################################################################

do (App) ->

    class BSTDemo
    
        constructor: (container, width = 640, height = 480) ->
            @_width = width
            @_height = height
            @_paper = Raphael container, width, height
            @_data = new Alg.BST()
            @_levels = 0

            @_centerX = width / 2
            @_centerY = 100
            @_leafRadius = 10
            @_minLeafDistance = 40 # from leaf center to leaf center
            @_verticalLevelDistance = 40

            _setup.call this
        
        put: (key, value) ->
            leaf = @_paper.algLeaf @_centerX, @_centerY, key, @_leafRadius
            leaf.payload = value
            leaf.key = key

            trace = new Alg.Stack()
            @_data.put key, leaf, (obj)->
                trace.push obj

            iterator = trace.iterator()
            traceStr = ""
            while iterator.hasNext()
                item = iterator.next()

                if traceStr isnt ""
                    traceStr += " => "

                branch = ""
                switch item.branch
                    when -1 then branch = "left"
                    when 1 then branch = "right"
                
                status = ""
                # if this is the last one
                unless iterator.hasNext()
                    unless item.oldValue? # added new leaf
                        status = "create "
                        level = trace.size()
                        leaf.level = level - 1
                        level = Math.max level, @_levels
                        _setLevels.call this, level
                    else # updated existing leaf
                        status = "update "
                
                traceStr += status + "node: '#{item.key}' #{branch}"

            #console.log traceStr

        get: (key) ->
    
    # Private

    _setup = ->
        @_paper.rect(0, 0, @_width, @_height, 10).attr {
            fill: "gray"
            stroke: "none"
        }
        # @_paper.path("M#{@_centerX} #{@_centerY}L#{@_centerX} #{@_centerY+400}").attr {
        #     stroke: "white"
        #     "stroke-width": 2
        #     "stroke-dasharray": "-"
        #     "stroke-opacity": 0.5
        # }
    
    _setLevels = (newLevels) ->
        @_levels = newLevels
        _updateTree.call this

    _updateTree = ->
        # console.log "=== update tree levels: #{@_levels}"

        maxLeavesOfLastLevel = Math.pow 2, @_levels-1
        maxWidthOfLastLevel = (maxWidthOfLastLevel - 1) * 2 * @_leafRadius

        hOffsets = _calcHOffsetToFatherLeaf.call this, @_levels
        v = @_verticalLevelDistance

        stack = new Alg.Stack()
        # pre-order iterate the bst
        @_data.iterate -1, (key, leaf)->
            try
                level = leaf.level
                h = hOffsets[level]
                item1 = stack.pop()
                while item1.level > level
                    item1 = stack.pop()
                if item1.level < leaf.level # This leaf is the child item of the item1
                    pos = item1.getPosition()
                    if item1.key > leaf.key # leaf is the left child of the item1
                        leaf.move pos[0]-h, pos[1]+v
                        stack.push item1
                        stack.push leaf
                    else if item1.key < leaf.key # leaf is the right child of the item1
                        leaf.move pos[0]+h, pos[1]+v
                        stack.push item1
                        stack.push leaf
                        
                else if item1.level is leaf.level # This leaf is the right sibling of the item1
                    item2 = stack.pop() # the father item of item1 and this leaf
                    pos = item2.getPosition()
                    leaf.move pos[0]+h, pos[1]+v
                    stack.push item2
                    stack.push leaf

            catch e
                # This is root
                stack.push leaf
        
    # level: 0-based
    # numOfLevels >= 1
    _calcHOffsetToFatherLeaf = (numOfLevels) ->
        offsets = []

        if numOfLevels <= 1
            offsets.unshift 0
        else
            maxLeavesOfLastLevel = Math.pow 2, numOfLevels-1
            previousLeafDistance = @_minLeafDistance
            widthOfPreviousLevel = (maxLeavesOfLastLevel - 1) * previousLeafDistance
            
            for level in [numOfLevels..1]
                if level is numOfLevels
                    offsets.unshift previousLeafDistance/2
                else if level <= 1
                    offsets.unshift 0
                else
                    widthOfPreviousLevel -= previousLeafDistance
                    numOfLeaves = Math.pow 2, level-1
                    previousLeafDistance = widthOfPreviousLevel / (numOfLeaves - 1)
                    offsets.unshift previousLeafDistance/2

        offsets
    
    # End of BSTDemo
    
    App.BSTDemo = BSTDemo

###############################################################################

$ ->
    console.log "BST Demo"

    bstDemo = new App.BSTDemo "bst-demo"
    bstDemo.put 4, "node 4"
    bstDemo.put 2, "node 2"
    bstDemo.put 5, "node 5"
    bstDemo.put 6, "node 6"
    
    bstDemo.put 1, "node 1"
    bstDemo.put 3, "node 3"
    bstDemo.put 0.5, "node 0.5"
    bstDemo.put 0.25, "node 0.25"
    bstDemo.put 0.75, "node 0.75"
    bstDemo.put 1.5, "node 1.5"

    # bstDemo.put 2, "node 22"

