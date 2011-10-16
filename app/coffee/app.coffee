App ?= {}

do (App) ->
  class StackDemo
  
    constructor: (container, width = 640, height = 480) ->
      @_paper = Raphael container, width, height
      @_width = width
      @_height = height

      _init.call this

    # Private

    _init = ->
      @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"});
      
  App.StackDemo = StackDemo
  
###############################################################################

do (App) ->
  class QueueDemo
          
    constructor: (container) ->
      _init.call this

    # Private
    
    _init = ->
      console.log this    
    
  App.QueueDemo = QueueDemo

###############################################################################                  

$ ->
  stackDemo = new App.StackDemo "stack"
  queueDemo = new App.QueueDemo "queue"