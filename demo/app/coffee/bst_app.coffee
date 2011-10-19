do (App) ->

    class BSTDemo
    
        constructor: (container, width = 640, height = 480) ->
            @_width = width
            @_height = height
            @_paper = Raphael container, width, height
            @_data = new Alg.BST()

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
                    traceStr += "; "
                traceStr += "branch #{item.branch} value: #{item.value} isNew: #{item.isNew}"

            console.log traceStr

        get: (key) ->
    
    # Private

    _setup = ->
        @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"})
    
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

    bstDemo.put 1, "node 1 updated"

