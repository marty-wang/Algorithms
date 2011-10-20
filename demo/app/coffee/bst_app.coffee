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

            _render.call this

        # Private

        _render = ->
            unless @_set?
                set = @_paper.set()
                leaf = @_paper.circle @_x, @_y, @_radius
                label = @_paper.text @_x, @_y, @_text
                set.push leaf, label

                @_leaf = leaf
                @_label = label
                @_set = set

            @_leaf.attr {
                stroke: "white"
                fill: "black"
                x: @_x
                y: @_y
            }

            @_label.attr {
                fill: "white"
                "font-size": 20
                "font-weight": 800
                x: @_x
                y: @_y
                text: @_text
            }

      

###############################################################################

do (App) ->

    class BSTDemo
    
        constructor: (container, width = 640, height = 480) ->
            @_width = width
            @_height = height
            @_paper = Raphael container, width, height
            @_data = new Alg.BST()
            @_levels = 0

            _setup.call this
        
        put: (key, value) ->
            trace = new Alg.Stack()
            @_data.put key, value, (obj)->
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
                if !iterator.hasNext()
                    if item.isNew
                        status = "create "
                        curLevels = trace.size()
                        _setLevels.call this, curLevels
                    else "update "
                
                traceStr += status + "node: '#{item.key}' #{branch}"

            console.log traceStr

            leaf = @_paper.algLeaf 100, 100, "40"

        get: (key) ->
    
    # Private

    _setup = ->
        @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"})
    
    _setLevels = (newLevels) ->
        return if newLevels <= @_levels

        @_levels = newLevels
        _updateTree.call this


    _updateTree = ->
        console.log "update tree"

        maxLeavesOfLastLevel = Math.pow 2, @_levels-1
        console.log maxLeavesOfLastLevel
    
    # End of BSTDemo
    
    App.BSTDemo = BSTDemo

###############################################################################

$ ->
    console.log "BST Demo"

    bstDemo = new App.BSTDemo "bst-demo"
    bstDemo.put 4, "node 4"
    bstDemo.put 2, "node 2"
    bstDemo.put 5, "node 5"
    bstDemo.put 3, "node 3"
    bstDemo.put 1, "node 1"

    bstDemo.put 2, "node 22"

