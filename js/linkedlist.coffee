$ = window.Alg ?= {}

class Node

  constructor: (@item = null) ->
    @next = null

class Stack

  constructor: ->
    @_first = null
    @_count = 0

  push: (item) ->
    throw "item cannot be undefined nor null" unless item?

    newFirst = new Node(item)
    newFirst.next = @_first
    @_first = newFirst
    ++@_count

  pop: ->
    throw "stack is empty" if this.isEmpty()

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
    oldCurrent = @_current
    @_current = @_current.next
    oldCurrent.item

# Export
$.Stack = Stack
  

  