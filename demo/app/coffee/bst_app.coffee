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
            @_branch = null

            # property
            @level = 0
            @_payload = null
            @key = null # TODO: key probably should be set in constructor and should not be writtable

            _render.call this
            _registerEventHandler.call this

        getPosition: ->
            [@_x, @_y]

        setPayload: (payload)->
            @_payload = payload
            @_set.attr {
                title: payload
            }

        getPayload: ->
            @_payload

        show: (animate = false)->
            props = {
                transform: "s1"
                opacity: 1
            }
            if animate
                @_set.animate props, 250, "<>"
            else
                @_set.attr props
        
        move: (x, y, animate = false) ->
            @_x = x
            @_y = y

            props = {
                cx: x
                cy: y
                x: x
                y: y
            }

            if animate
                animDuraiton = 500
                @_set.animate props, animDuraiton
                @_centerLine.animate {
                    path: "M#{@_x} #{@_y}L#{@_x} #{@_y+400}"
                }, animDuraiton
            else
                @_set.attr props
                @_centerLine.attr {
                    path: "M#{@_x} #{@_y}L#{@_x} #{@_y+400}"
                }

        connect: (leaf) ->
            myCx = @_x
            myCy = @_y

            pos = leaf.getPosition()
            cx1 = pos[0]
            cy1 = pos[1]

            @_branch.attr {
                path: "M#{myCx} #{myCy}L#{cx1} #{cy1}"
            }
            @_branch.toBack()
        
        remove: (animate = false, fn) ->
            self = this
            if animate
                @_centerLine.remove()
                @_branch.remove()
                @_set.animate {
                    transform: 's0'
                    opacity: 0
                }, 250, '<>', ->
                    self._set.remove()
                    fn.call self if fn?
            else
                _remove.call this

        # Private

        _remove = ->
            @_set.remove()
            @_centerLine.remove()
            @_branch.remove()

        _render = ->
            unless @_set?
                set = @_paper.set()
                centerLine = @_paper.path()
                branch = @_paper.path()
                leaf = @_paper.circle @_x, @_y, @_radius
                label = @_paper.text @_x, @_y, @_text
                set.push leaf, label

                @_leaf = leaf
                @_label = label
                @_set = set

                @_centerLine = centerLine
                @_branch = branch
                

            @_leaf.attr {
                stroke: "white"
                fill: "black"
                opacity: 0.4
            }

            @_label.attr {
                fill: "white"
                "font-size": 20
                "font-weight": 800
                text: @_text
            }

            @_centerLine.attr {
                stroke: "white"
                "stroke-width": 2
                "stroke-dasharray": "-"
                "stroke-opacity": 0.5
            }

            @_branch.attr {
                stroke: "white"
                "stroke-width": 2
            }

            @_set.attr {
                transform: "s0"
                opacity: 0
            }

            this.move @_x, @_y
        
        _registerEventHandler = ->
            self = this
            @_set.click ->
                alert self._payload
      

###############################################################################

do (App) ->

    class BSTDemo
    
        constructor: (container, width = 1024, height = 480) ->
            @_width = width
            @_height = height
            @_paper = Raphael container, width, height
            @_data = new Alg.BST()
            @_levels = 0

            @_centerX = width / 2
            @_centerY = 100
            @_leafRadius = 20
            @_minLeafDistance = 60 # from leaf center to leaf center
            @_verticalLevelDistance = 80

            @_logHandlers = []
        
        put: (key, value) ->
            leaf = @_paper.algLeaf @_centerX, @_centerY, key, @_leafRadius
            leaf.setPayload value
            leaf.key = key

            trace = new Alg.Stack()
            @_data.put key, leaf, (obj)->
                trace.push obj

            iterator = trace.iterator()
            traceStr = ""
            previousItem = null
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
                        leaf.show true
                        _triggerLog.call this, "created new leaf, key: #{leaf.key}, value: #{leaf.getPayload()}"
                    else # updated existing leaf
                        status = "update "
                        oldLeaf = item.oldValue
                        oldPayload = oldLeaf.getPayload()
                        oldPos = oldLeaf.getPosition()
                        oldLevel = oldLeaf.level
                        oldLeaf.remove()                      
                        # oldLeaf.remove true, ->                        
                        newLeaf = item.value
                        newLeaf.level = oldLevel
                        newLeaf.move oldPos[0], oldPos[1]
                        newLeaf.connect previousItem.value if previousItem?
                        newLeaf.show true
                        _triggerLog.call this, "updated leaf, key: #{newLeaf.key}, new value: #{newLeaf.getPayload()}, old value: #{oldPayload}"

                previousItem = item

                traceStr += status + "node: '#{item.key}' #{branch}"

            #console.log traceStr

        get: (key) ->

        log: (fn) ->
            @_logHandlers.push fn
    
    # Private
    
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
            #console.log "key #{key} value #{leaf.getPayload()}"
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
                    
                    leaf.connect item1
                        
                else if item1.level is leaf.level # This leaf is the right sibling of the item1
                    item2 = stack.pop() # the father item of item1 and this leaf
                    pos = item2.getPosition()
                    leaf.move pos[0]+h, pos[1]+v
                    stack.push item2
                    stack.push leaf

                    leaf.connect item2

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

    _triggerLog = (info) ->
        for fn in @_logHandlers
            fn.call this, info
    
    # End of BSTDemo
    
    App.BSTDemo = BSTDemo

###############################################################################

$ ->
    console.log "BST Demo"

    bstDemo = new App.BSTDemo "bst-demo"
    bstDemo.log (e)->
        $log.text e

    # bstDemo.put 4, "node 4"
    # bstDemo.put 2, "node 2"
    # bstDemo.put 5, "node 5"
    # bstDemo.put 6, "node 6"
    
    # bstDemo.put 1, "node 1"
    # bstDemo.put 3, "node 3"
    # bstDemo.put 0.5, "node 0.5"
    # bstDemo.put 0.25, "node 0.25"
    # bstDemo.put 0.75, "node 0.75"
    # bstDemo.put 1.5, "node 1.5"
    # bstDemo.put 4.5, "node 4.5"
    # bstDemo.put 5.5, "node 5.5"

    #bstDemo.put 2, "node 22"

    $key_select = $('#key_select')
    $value_input = $('#value_input')
    $add_button = $('#add_button')

    $log = $('#bst-demo .log')

    $add_button.click (e)->
        e.preventDefault()
        key = $key_select.val()
        value = $value_input.val()
        $value_input.val("")
        value = "Leaf #{key}" if value is ""
        bstDemo.put key, value
        