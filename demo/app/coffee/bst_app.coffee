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
            @_centerLine = @_paper.path("M#{x} #{y}L#{x} #{y}")
            @_leaf = @_paper.circle @_x, @_y, @_radius
            @_label = @_paper.text @_x, @_y, @_text            
            
            @_set.push @_leaf, @_label

            @_branchEnd = [@_x, @_y]
            @_payload = null
            @_highlightBranchTimer = null
            @_highlightTimer = null

            # property
            @level = 0

            # config
            @_animDuration = 250
            @_branchHighlightColor = "blue"

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
            centerLinePath = {
                path: "M#{@_x} #{@_y}L#{@_x} #{@_y+400}"
                opacity: 1
            }
            if animate
                @_set.animate props, animDuration, "<>"
                @_branch.animate props, animDuration, "<>"
                @_centerLine.animate centerLinePath, animDuration, "<>"
            else
                @_set.attr props
                @_branch.attr props
                @_centerLine.attr props

            this.highlightBranch(false)
        
        highlight: (stopOldAnim = true)->
            clearTimeout @_highlightTimer
            @_leaf.stop() if stopOldAnim

            highlightColor = @_branchHighlightColor
            @_leaf.attr {
                fill: highlightColor
            }

            highlightAnim = Raphael.animation {
                fill: "black"
            }, 1000, "<>"

            @_highlightTimer = setTimeout (=>
                @_leaf.animate highlightAnim
            ), 1000

            
        highlightBranch: (stopOldAnim = true)->
            clearTimeout @_highlightBranchTimer
            @_branch.stop() if stopOldAnim

            highlightColor = @_branchHighlightColor
            @_branch.attr {
                stroke: highlightColor
            }

            highlightAnim = Raphael.animation {
                stroke: "white"
            }, 1000, "<>"

            @_highlightBranchTimer = setTimeout (=>
                @_branch.animate highlightAnim
            ), 1000
        
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
                opacity: 0
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
            status = ""
            while iterator.hasNext()
                item = iterator.next()

                if traceStr isnt ""
                    traceStr += " => "

                branch = ""
                switch item.branch
                    when -1 then branch = "left"
                    when 1 then branch = "right"
                
                # status = ""
                # if this is the last one
                unless iterator.hasNext()
                    
                    unless item.oldValue? # added new leaf
                        status = "create"
                        level = trace.size()
                        leaf.level = level - 1
                        @_levels = level if level > @_levels
                        _updateTree.call this, ->
                            leaf.show true
                        _triggerLog.call this, {
                            type: "log"
                            subtype: status
                            message: "create new leaf, key: #{leaf.getKey()}, value: #{leaf.getPayload()}"
                        }
                    
                    else # updated existing leaf
                        status = "update"
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
                        _triggerLog.call this, {
                            type: "log"
                            subtype: status
                            message: "update leaf, key: #{newLeaf.getKey()}, new value: #{newLeaf.getPayload()}, old value: #{oldPayload}"
                        }
                else
                    curLeaf = item.value
                    curLeaf.highlightBranch()

                previousItem = item

                traceStr += status + " leaf: '#{item.key}' #{branch}"

            _triggerLog.call this, {
                type: "trace"
                subtype: status
                message: traceStr
            }

        get: (key) ->
            traceStr = "from"
            value = @_data.get key, (item)->
                        branch = "found"
                        switch item.branch
                            when -1 then branch = "left=>"
                            when 1 then branch = "right=>"
                        
                        traceStr += " Leaf #{item.key} #{branch}"
                        item.value.highlightBranch()
            
            traceStr += " dead end" unless value?
            found = value?
            _triggerLog.call this, {
                type: "get"
                message: traceStr
                found: found
                key: key
            }
            value

        clear: ->
            # clear all leafs from @_data

        log: (fn) ->
            @_logHandlers.push fn
    
    # Private

    _createTraceLine = (trace)->
        iterator = trace.iterator()
        while iterator.hasNext()
            curLeaf = iterator.next().value

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
    
    bstDemo = new App.BSTDemo "bst-demo"
    bstDemo.log (e)->
        switch e.type
            when "log"
                $log.text e.message
                if e.subtype is "create"
                    $log.removeClass "negative"
                    $log.addClass "positive"
                else if e.subtype is "update"
                    $log.removeClass "negative positive"
            when "trace" 
                $trace.text e.message
                if e.subtype is "create"
                    $trace.removeClass "negative"
                    $trace.addClass "positive"
                else if e.subtype is "update"
                    $trace.removeClass "negative positive"
            when "get"
                $trace.text e.message
                found = e.found
                logMessage = "found Leaf #{e.key}"
                logMessage = "cannot " + logMessage unless found
                $log.text logMessage
                if found
                    $trace.removeClass "negative positive"
                    $log.removeClass "negative positive"
                else
                    $trace.removeClass "positive"
                    $log.removeClass "positive"
                    $trace.addClass "negative"
                    $log.addClass "negative"
                    

    $key_select = $('#key_select')
    $value_input = $('#value_input')
    $add_button = $('#add_button')
    $get_button = $('#get_button')

    $log = $('#bst-demo .log')
    $trace = $('#bst-demo .trace')

    $add_button.click (e)->
        e.preventDefault()
        key = $key_select.val()
        value = $value_input.val()
        $value_input.val("")
        value = "Leaf #{key}" if value is ""
        bstDemo.put key, value
    
    $get_button.click (e)->
        e.preventDefault()
        key = $key_select.val()
        leaf = bstDemo.get key
        leaf.highlight() if leaf?
    
    $(document).bind "keypress", (e)->
        if 48 <= e.keyCode <= 57
            key = e.keyCode - 48
            value = "Leaf #{key}"
            bstDemo.put key, value