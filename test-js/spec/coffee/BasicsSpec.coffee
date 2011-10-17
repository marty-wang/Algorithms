describe "Stack", ->

  beforeEach ->
    @stack = new Alg.Stack()

  describe "#push", ->

    it "should increase the size by 1", ->
      oldSize = @stack.size()
      @stack.push("foo")
      newSize = @stack.size()
      expect(newSize-oldSize).toEqual(1)

      oldSize = @stack.size()
      @stack.push()
      newSize = @stack.size()
      expect(newSize-oldSize).toEqual(1)

  describe "#pop", ->

    it "should throw exception when try to pop empty stack", ->
      expect( =>
        @stack.pop()
      ).toThrow("Stack is empty")

      @stack.push "foo"
      @stack.pop()

      expect( =>
        @stack.pop()
      ).toThrow("Stack is empty")
      
    it "should return the item that is added later", ->
      @stack.push "foo"
      @stack.push "bar"

      item = @stack.pop()
      expect(item).toEqual("bar")

      item = @stack.pop()
      expect(item).toEqual("foo")

  describe "#isEmpty", ->

    it "should return true if no item in stack and return false otherwiese", ->
      expect(@stack.isEmpty()).toBeTruthy()

      @stack.push "foo"
      expect(@stack.isEmpty()).toBeFalsy()

      @stack.pop()
      expect(@stack.isEmpty()).toBeTruthy()

  describe "#size", ->
    
    it "should update size when push and pop", ->
      expect(@stack.size()).toEqual(0)

      @stack.push "foo"
      expect(@stack.size()).toEqual(1)
      
      @stack.push "bar"
      expect(@stack.size()).toEqual(2)
      
      @stack.pop()
      expect(@stack.size()).toEqual(1)


  describe "#iterator", ->

    it "should iterate from new item to old item", ->
      iterator = @stack.iterator()
      expect(iterator.hasNext()).toBeFalsy()

      @stack.push "foo"
      @stack.push()
      @stack.push "bar"
      @stack.push null

      iterator = @stack.iterator()
      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toBeNull()

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toEqual("bar")

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toBeUndefined()

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toEqual("foo")

      expect(iterator.hasNext()).toBeFalsy()
      expect(=>
        iterator.next()
      ).toThrow("There is no next item in stack")


###############################################################################

describe "Queue", ->

  beforeEach ->
    @queue = new Alg.Queue()

  describe "#enqueue", ->

    it "should append the item and increase the size by 1", ->
      oldSize = @queue.size()
      @queue.enqueue "foo"
      newSize = @queue.size()
      expect(newSize-oldSize).toEqual(1)

      oldSize = newSize
      @queue.enqueue()
      newSize = @queue.size()
      expect(newSize-oldSize).toEqual(1)

  describe "#dequeue", ->
        
    it "should return the first item and decrease the size by 1", ->
      @queue.enqueue "foo"
      @queue.enqueue "bar"

      oldSize = @queue.size()
      item = @queue.dequeue()
      newSize = @queue.size()
      expect(oldSize - newSize).toEqual(1)
      expect(item).toEqual("foo")

      oldSize = @queue.size()
      item = @queue.dequeue()
      newSize = @queue.size()
      expect(oldSize - newSize).toEqual(1)
      expect(item).toEqual("bar")
    
    it "should throw exception when dequeue from empty queue", ->
      expect(=>
        @queue.dequeue()
      ).toThrow("Queue is empty")

      @queue.enqueue "foo"
      @queue.enqueue "bar"

      @queue.dequeue()
      @queue.dequeue()

      expect(=>
        @queue.dequeue()
      ).toThrow("Queue is empty")      

  describe "#isEmpty", ->

    it "should return true when queue is empty, return false when it is not", ->
      expect(@queue.isEmpty()).toBeTruthy()
      @queue.enqueue "foo"
      expect(@queue.isEmpty()).toBeFalsy()
      @queue.dequeue()
      expect(@queue.isEmpty()).toBeTruthy()      
  
  describe "#size", ->
    
    it "should have the same number of items as it gets enqueued", ->
      expect(@queue.size()).toEqual(0)

      @queue.enqueue "foo" 
      expect(@queue.size()).toEqual(1)      

      @queue.enqueue "bar"
      expect(@queue.size()).toEqual(2)      

    
  describe "#iterator", ->

    it "should iterate from old item to new item", ->
      iterator = @queue.iterator()
      expect(iterator.hasNext()).toBeFalsy()
      
      @queue.enqueue "foo"
      @queue.enqueue "bar"
      @queue.enqueue null
      @queue.enqueue()

      iterator = @queue.iterator()
      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toEqual("foo")

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toEqual("bar")

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toBeNull()

      expect(iterator.hasNext()).toBeTruthy()
      expect(iterator.next()).toBeUndefined()
      
      expect(iterator.hasNext()).toBeFalsy()
      expect( =>
        iterator.next()
      ).toThrow("There is no next item in queue")


