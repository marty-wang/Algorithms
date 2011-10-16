App ?= {}

###############################################################################  

do (App) ->
  class StackDemo
  
    constructor: (container, width = 640, height = 480, initPosition = 400) ->
      @_width = width
      @_height = height
      @_data = new Alg.Stack()
      @_paper = Raphael container, width, height
      @_countText = null
      @_lastY = initPosition

      @_duration = 400
      @_itemInitX = 100
      @_itemInitY = -32
      @_stepDistance = 34

      _setup.call this
    
    push: (item) =>
      c = @_paper.rect @_itemInitX, @_itemInitY, 120, 30
      @_data.push c
      c.attr({
        fill: 'black',
        stroke: 'white'
      }).animate({
        y: @_lastY
      }, @_duration, '<>')
      @_lastY -= @_stepDistance
      @_countText.attr "text", @_data.size()

    pop: ->
      try
        c = @_data.pop()
        c.animate {
          y: @_itemInitY
        }, @_duration, '>'
        @_lastY += @_stepDistance
        @_countText.attr "text", @_data.size()
      catch error
        alert "#{error}"

    # Private

    _setup = ->
      @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"});
      ct = @_paper.text 420, 250, "0";
      ct.attr {
        fill: "white"
        "font-family": "Arial"
        "font-weight": 800
        "font-size": 200
      }
      @_countText = ct

      
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
  
  $stackAddButton = $ '#stack .add'
  $stackAddButton.click (e)->
    e.preventDefault()
    stackDemo.push "foo"

  $stackRemoveButton = $ '#stack .remove'
  $stackRemoveButton.click (e)->
    e.preventDefault()
    stackDemo.pop()

  queueDemo = new App.QueueDemo "queue"