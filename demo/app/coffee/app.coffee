App ?= {}
App.Util ?= {}

App.Util.throttle = (method, context, timeout = 200) ->
  clearTimeout method.tId
  method.tId = setTimeout (->
    method.call context
  ), timeout

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

    setTransform: (transform) ->

        
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
      @CAPACITY = 11

      @_duration = 400
      @_itemInitX = 100
      @_itemInitY = -32
      @_stepDistance = 34

      @_errorHandlers = []

      _setup.call this
    
    push: (item) ->
      if @_data.size() > @CAPACITY - 1
        _triggerError.call this, "Stack is full"
        return

      item ?= @_counter
      @_counter++
      c = @_paper.algLabel @_itemInitX, @_itemInitY, 120, 30, item
      @_data.push c
      c.getSet().animate({
        transform: "t0," + @_lastY
      }, @_duration, '<>')
      @_lastY -= @_stepDistance

    pop: ->
      try
        c = @_data.pop()
        c.getSet().animate {
          transform: "t0," + @_itemInitY
        }, @_duration, '>'
        @_lastY += @_stepDistance
      catch error
        _triggerError.call this, error

    size: ->
      @_data.size()
    
    iterate: ->
      iterator = @_data.iterator()
      list = ""
      while iterator.hasNext()
        if list isnt ""
          list += ", "
        list += iterator.next().getText()
      list

    error: (fn) ->
      @_errorHandlers.push fn

    # Private

    _setup = ->
      @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"})
    
    _triggerError = (error) ->
      for fn in @_errorHandlers
        fn.call(this, error)
      
  App.StackDemo = StackDemo
  
###############################################################################

do (App) ->
  class QueueDemo
          
    constructor: (container, width = 640, height = 480, initPosition = 465) ->
      @_width = width
      @_height = height
      @_data = new Alg.Queue()
      @_paper = Raphael container, width, height
      @_countText = null
      @_lastX = initPosition

      @_counter = 0
      @CAPACITY = 11

      @_duration = 400
      @_itemInitX = 600
      @_itemInitY = 300
      @_stepDistance = 34

      @_errorHandlers = []

      _setup.call this
    
    enqueue: (item) ->
      if @_data.size() > @CAPACITY - 1
        _triggerError.call this, "Queue is full"
        return

      item ?= @_counter
      @_counter++
      c = @_paper.algLabel @_itemInitX, @_itemInitY, 30, 120, item
      @_data.enqueue c
      c._lastX = @_lastX
      c.getSet().animate {
        transform: "t-" + @_lastX + ",0"
      }, @_duration, '<>'
      @_lastX -= @_stepDistance

    dequeue: ->
      try
        c = @_data.dequeue()
        c.getSet().animate {
          transform: "t-640,0"
        }, @_duration, '>'

        iterator = @_data.iterator()
        while iterator.hasNext()
          n = iterator.next()
          n._lastX += @_stepDistance
          n.getSet().animate {
            transform: "t-" + n._lastX + ",0"
          }, @_duration, '<>'

        @_lastX += @_stepDistance
      catch error
        _triggerError.call this, error

    size: ->
      @_data.size()
    
    iterate: ->
      iterator = @_data.iterator()
      list = ""
      while iterator.hasNext()
        if list isnt ""
          list += ", "
        list += iterator.next().getText()
      list

    error: (fn) ->
      @_errorHandlers.push fn
          
    # Private

    _setup = ->
      @_paper.rect(0, 0, @_width, @_height, 10).attr({fill: "gray", stroke: "none"})
    
    _triggerError = (error) ->
      for fn in @_errorHandlers
        fn.call(this, error) 
    
  App.QueueDemo = QueueDemo

###############################################################################                  

$ ->

  do ->
    stackDemo = new App.StackDemo "stack-demo"
    stackDemo.error (error)->
      $error.text "#{error}"
      setTimeout (->
        $error.text ""
      ), 2000

    $capacityNumber = $ '#stack .capacity .number'
    $countNumber = $ '#stack .count .number'
    $all = $ '#stack .all'
    $error = $ '#stack .error'

    $capacityNumber.text stackDemo.CAPACITY
  
    $addButton = $ '#stack .add'
    $addButton.click (e)->
      e.preventDefault()
      stackDemo.push()
      updateCountNumber()
      App.Util.throttle iterate, null, 500

    $removeButton = $ '#stack .remove'
    $removeButton.click (e)->
      e.preventDefault()
      stackDemo.pop()
      updateCountNumber()
      App.Util.throttle iterate, null, 500
    
    updateCountNumber = ->
      size = stackDemo.size()
      $countNumber.text size
    
    iterate = ->
      list = stackDemo.iterate()
      $all.text list

  do ->
    queueDemo = new App.QueueDemo "queue-demo"
    queueDemo.error (error)->
      $error.text "#{error}"
      setTimeout (->
        $error.text ""
      ), 2000

    $capacityNumber = $ '#queue .capacity .number'
    $countNumber = $ '#queue .count .number'
    $all = $ '#queue .all'
    $error = $ '#queue .error'

    $capacityNumber.text queueDemo.CAPACITY

    $addButton = $ '#queue .add'
    $addButton.click (e) ->
      e.preventDefault()
      queueDemo.enqueue()
      updateCountNumber()
      App.Util.throttle iterate, null, 500

    $removeButton = $ '#queue .remove'
    $removeButton.click (e) ->
      e.preventDefault()
      queueDemo.dequeue()
      updateCountNumber()
      App.Util.throttle iterate, null, 500
    
    updateCountNumber = ->
      size = queueDemo.size()
      $countNumber.text size
    
    iterate = ->
      list = queueDemo.iterate()
      $all.text list
