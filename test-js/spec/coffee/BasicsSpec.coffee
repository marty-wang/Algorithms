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
      @queue.enqueue "bar"
      newSize = @queue.size()
      expect(newSize-oldSize).toEqual(1)

    it "should throw exception when enqueue null or undefined item", ->
      expect(=>
        @queue.enqueue()        
      ).toThrow("item cannot be undefined nor null")

      expect(=>
        @queue.enqueue(null)        
      ).toThrow("item cannot be undefined nor null")

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
      ).toThrow("queue is empty")

      @queue.enqueue "foo"
      @queue.enqueue "bar"

      @queue.dequeue()
      @queue.dequeue()

      expect(=>
        @queue.dequeue()
      ).toThrow("queue is empty")      

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

      @queue.enqueue("foo")
      expect(@queue.size()).toEqual(1)      

      @queue.enqueue("bar")
      expect(@queue.size()).toEqual(2)      

    
  describe "#iterator", ->

    it "should return false for empty queue or last item of the queue, and return true otherwise", ->
      iterator = @queue.iterator()
      expect(iterator.hasNext()).toBeFalsy()
      
      @queue.enqueue("foo")
      @queue.enqueue("bar")

      iterator = @queue.iterator()
      expect(iterator.hasNext()).toBeTruthy()

      item = iterator.next()
      expect(item).toEqual("foo")
      expect(iterator.hasNext()).toBeTruthy()
      
      item = iterator.next()
      expect(item).toEqual("bar")
      
      expect(iterator.hasNext()).toBeFalsy()
      expect(iterator.next()).toEqual(null)


