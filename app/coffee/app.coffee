App ?= {}

###############################################################################  

do (App) ->

  Raphael.fn.algLabel = (x, y, width, height, text, r = 0) ->
    return new Label this, x, y, width, height, text, r

  class Label
  
    constructor: (paper, x, y, width, height, text, r) ->
      @_paper = paper
      @_x = x
      @_y = y
      @_width = width
      @_height = height
      @_text = text
      @_r = r
      @_attr = {
        background: 'black'
        stroke: 'white'
        textColor: 'white'
        fontFamily: "Arial"
        fontSize: 18
        fontWeight: 40
      }

      @_rectElm = null
      @_textElm = null
      @_set = null

      _render.call this
    
    getSet: ->
      @_set
    
    getText: ->
      @_text
        
    _render = ->
      unless @_set?
        @_set = @_paper.set()
        @_rectElm = @_paper.rect @_x, @_y, @_width, @_height, @_r
        @_textElm = @_paper.text 0, 0, @_text
        @_set.push @_rectElm, @_textElm

      @_rectElm.attr {
        fill: @_attr.background
        stroke: @_attr.stroke
      }

      @_textElm.attr {
        fill: @_attr.textColor
        "font-family": @_attr.fontFamily
        "font-size": @_attr.fontSize
        "font-weight": @_attr.fontWeight
        x: @_x + @_width/2  
        y: @_y + @_height/2
      }


###############################################################################  

do (App) ->
  class StackDemo
  
    constructor: (container, width = 640, height = 480, initPosition = 420) ->
      @_width = width
      @_height = height
      @_data = new Alg.Stack()
      @_paper = Raphael container, width, height
      @_countText = null
      @_lastY = initPosition

      @_counter = 0

      @_duration = 400
      @_itemInitX = 100
      @_itemInitY = -32
      @_stepDistance = 34

      _setup.call this
    
    push: (item) =>
      item ?= @_counter
      @_counter++
      c = @_paper.algLabel @_itemInitX, @_itemInitY, 120, 30, item
      @_data.push c
      c.getSet().animate({
        transform: "t0," + @_lastY
      }, @_duration, '<>')
      @_lastY -= @_stepDistance
      @_countText.attr "text", @_data.size()

    pop: ->
      try
        c = @_data.pop()
        c.getSet().animate {
          transform: "t0," + @_itemInitY
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
    stackDemo.push()

  $stackRemoveButton = $ '#stack .remove'
  $stackRemoveButton.click (e)->
    e.preventDefault()
    stackDemo.pop()

  queueDemo = new App.QueueDemo "queue"