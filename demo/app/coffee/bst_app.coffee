do (App) ->

    class BSTDemo
    
        constructor: (container, width = 640, height = 480) ->
            @_width = width
            @_height = height
            @_paper = Raphael container, width, height

            _setup.call this
        
        put: (key, value) ->

        get: (key) ->
    
    # Private

    _setup = ->
        @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"})
    
    # End of BSTDemo
    
    App.BSTDemo = BSTDemo

###############################################################################

$ ->
    bstDemo = new App.BSTDemo "bst-demo"

    console.log bstDemo
