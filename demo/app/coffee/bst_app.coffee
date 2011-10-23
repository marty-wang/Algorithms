do (App) ->

    Raphael.fn.algLeaf = (x, y, key, text="", r=20) ->
        return new Leaf this, x, y, key, text, r

    class Leaf
    
        constructor: (paper, x, y, key, text, r) ->
            @_paper = paper
            @_x = x
            @_y = y
            @_key = key
            @_text = text
            @_radius = r

            # UI
            @_set = @_paper.set()
            @_branch = @_paper.path()
            @_centerLine = @_paper.path()
            @_leaf = @_paper.circle @_x, @_y, @_radius
            @_label = @_paper.text @_x, @_y, @_text            
            
            @_set.push @_leaf, @_label

            @_branchEnd = [@_x, @_y]
            @_payload = null

            # property
            @level = 0

            # config
            @_animDuration = 250

            _render.call this
            _registerEventHandler.call this

        getKey: ->
            @_key

        getCenter: ->
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
            animDuration = @_animDuration
            if animate
                @_set.animate props, animDuration, "<>"
                @_branch.animate props, animDuration, "<>"
            else
                @_set.attr props
                @_branch.props
        
        move: (x, y, animate = false, fn) ->
            self = this
            @_x = x
            @_y = y

            cx1 = @_branchEnd[0]
            cy1 = @_branchEnd[1]

            branchPath = {
                path: "M#{x} #{y}L#{cx1} #{cy1}"   
            }

            centerLinePath = {
                path: "M#{@_x} #{@_y}L#{@_x} #{@_y+400}"
            }

            props = {
                cx: x
                cy: y
                x: x
                y: y
            }

            @_branch.toBack()

            if animate
                animDuraiton = @_animDuration
                @_set.animate props, animDuraiton
                @_branch.animate branchPath, animDuraiton
                @_centerLine.animate centerLinePath, animDuraiton, ->
                    fn.call self if fn?
            else
                @_set.attr props
                @_branch.attr branchPath
                @_centerLine.attr centerLinePath
                fn.call self if fn?

        connect: (leaf) ->
            cx = @_x
            cy = @_y

            pos = leaf.getCenter()
            cx1 = pos[0]
            cy1 = pos[1]

            @_branchEnd = [cx1, cy1]
        
        remove: (animate = false, fn) ->
            self = this
            if animate
                @_centerLine.remove()
                @_branch.remove()
                @_set.animate {
                    transform: 's0'
                    opacity: 0
                }, @_animDuration, '<>', ->
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
                opacity: 0
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

            @_centerX = width / 2
            @_centerY = 100
            @_leafRadius = 20
            @_minLeafDistance = 60 # from leaf center to leaf center
            @_verticalLevelDistance = 80

            @_paper = Raphael container, width, height
            @_data = new Alg.BST()
            @_levels = 0

            @_logHandlers = []
        
        put: (key, value) ->
            leaf = @_paper.algLeaf @_centerX, @_centerY, key, key, @_leafRadius
            leaf.setPayload value

            trace = new Alg.Stack()
            @_data.put key, leaf, (item)->
                trace.push item

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
                        @_levels = level if level > @_levels
                        _updateTree.call this, ->
                            leaf.show true
                        _triggerLog.call this, "created new leaf, key: #{leaf.getKey()}, value: #{leaf.getPayload()}"
                    
                    else # updated existing leaf
                        status = "update "
                        oldLeaf = item.oldValue
                        oldPayload = oldLeaf.getPayload()
                        oldPos = oldLeaf.getCenter()
                        oldLevel = oldLeaf.level
                        oldLeaf.remove()                      
                        # oldLeaf.remove true, ->                        
                        newLeaf = item.value
                        newLeaf.level = oldLevel
                        newLeaf.connect previousItem.value if previousItem?
                        newLeaf.move oldPos[0], oldPos[1]
                        newLeaf.show true
                        _triggerLog.call this, "updated leaf, key: #{newLeaf.getKey()}, new value: #{newLeaf.getPayload()}, old value: #{oldPayload}"

                previousItem = item

                traceStr += status + "node: '#{item.key}' #{branch}"

            #console.log traceStr

        get: (key) ->

        clear: ->
            # clear all leafs from @_data

        log: (fn) ->
            @_logHandlers.push fn
    
    # Private

    _updateTree = (fn)->
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
                    pos = item1.getCenter()
                    leaf.connect item1
                    if item1.getKey() > leaf.getKey() # leaf is the left child of the item1
                        leaf.move pos[0]-h, pos[1]+v, true
                        stack.push item1
                        stack.push leaf
                    else if item1.getKey() < leaf.getKey() # leaf is the right child of the item1
                        leaf.move pos[0]+h, pos[1]+v, true
                        stack.push item1
                        stack.push leaf                    
                        
                else if item1.level is leaf.level # This leaf is the right sibling of the item1
                    item2 = stack.pop() # the father item of item1 and this leaf
                    pos = item2.getCenter()
                    leaf.connect item2
                    leaf.move pos[0]+h, pos[1]+v, true
                    stack.push item2
                    stack.push leaf

            catch e
                # This is root
                stack.push leaf        
        
        setTimeout (=>
            fn.call this            
        ), 250
        
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
    
    $(document).bind "keypress", (e)->
        if 48 <= e.keyCode <= 57
            key = e.keyCode - 48
            value = "Leaf #{key}"
            bstDemo.put key, value