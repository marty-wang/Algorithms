$ = window.Alg ?= {}

class Node

  constructor: (item) ->
    @item = item
    @next = null

###############################################################################

class Stack

  constructor: ->
    @_first = null
    @_count = 0

  push: (item) ->
    newFirst = new Node(item)
    newFirst.next = @_first
    @_first = newFirst
    ++@_count

  pop: ->
    throw "Stack is empty" if this.isEmpty()

    item = @_first.item
    @_first = @_first.next
    @_count--
    item
  
  isEmpty: ->
    @_count <= 0
  
  size: ->
    @_count

  iterator: ->
    new StackIterator this

# iterator
class StackIterator

  constructor: (stack) ->
    @_stack = stack
    @_current = stack._first

  hasNext: ->
    @_current?
  
  next: ->
    throw "There is no next item in stack" unless @_current?

    oldCurrent = @_current
    @_current = @_current.next
    oldCurrent.item

###############################################################################

class Queue

  constructor: ->
    @_count = 0
    @_first = null
    @_last = null
  
  enqueue: (item) ->
    oldLast = @_last
    @_last = new Node(item)
    oldLast.next = @_last if oldLast?
    @_first = @_last unless @_first?

    ++@_count
  
  dequeue: ->
    throw "Queue is empty" if @_count <= 0

    item = @_first.item
    @_first = @_first.next
    @_count--
    @_last = @_first if @_count <= 0

    item
  
  isEmpty: ->
    @_count <= 0

  size: ->
    @_count

  iterator: ->
    new QueueIterator(this)
  
  # queue iterator
  class QueueIterator
  
    constructor: (queue) ->
      @_queue = queue
      @_current = queue._first

    hasNext: ->
      @_current?

    next: ->
      throw "There is no next item in queue" unless @_current?

      item = @_current.item      
      @_current = @_current.next
      item

###############################################################################

# Export
$.Stack = Stack
$.Queue = Queue  

  