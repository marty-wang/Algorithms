(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  describe("Queue", function() {
    beforeEach(function() {
      return this.queue = new Alg.Queue();
    });
    describe("#enqueue", function() {
      it("should append the item and increase the size by 1", function() {
        var newSize, oldSize;
        oldSize = this.queue.size();
        this.queue.enqueue("foo");
        newSize = this.queue.size();
        expect(newSize - oldSize).toEqual(1);
        oldSize = newSize;
        this.queue.enqueue("bar");
        newSize = this.queue.size();
        return expect(newSize - oldSize).toEqual(1);
      });
      return it("should throw exception when enqueue null or undefined item", function() {
        expect(__bind(function() {
          return this.queue.enqueue();
        }, this)).toThrow("item cannot be undefined nor null");
        return expect(__bind(function() {
          return this.queue.enqueue(null);
        }, this)).toThrow("item cannot be undefined nor null");
      });
    });
    describe("#dequeue", function() {
      it("should return the first item and decrease the size by 1", function() {
        var item, newSize, oldSize;
        this.queue.enqueue("foo");
        this.queue.enqueue("bar");
        oldSize = this.queue.size();
        item = this.queue.dequeue();
        newSize = this.queue.size();
        expect(oldSize - newSize).toEqual(1);
        expect(item).toEqual("foo");
        oldSize = this.queue.size();
        item = this.queue.dequeue();
        newSize = this.queue.size();
        expect(oldSize - newSize).toEqual(1);
        return expect(item).toEqual("bar");
      });
      return it("should throw exception when dequeue from empty queue", function() {
        expect(__bind(function() {
          return this.queue.dequeue();
        }, this)).toThrow("queue is empty");
        this.queue.enqueue("foo");
        this.queue.enqueue("bar");
        this.queue.dequeue();
        this.queue.dequeue();
        return expect(__bind(function() {
          return this.queue.dequeue();
        }, this)).toThrow("queue is empty");
      });
    });
    describe("#isEmpty", function() {
      return it("should return true when queue is empty, return false when it is not", function() {
        expect(this.queue.isEmpty()).toBeTruthy();
        this.queue.enqueue("foo");
        expect(this.queue.isEmpty()).toBeFalsy();
        this.queue.dequeue();
        return expect(this.queue.isEmpty()).toBeTruthy();
      });
    });
    describe("#size", function() {
      return it("should have the same number of items as it gets enqueued", function() {
        expect(this.queue.size()).toEqual(0);
        this.queue.enqueue("foo");
        expect(this.queue.size()).toEqual(1);
        this.queue.enqueue("bar");
        return expect(this.queue.size()).toEqual(2);
      });
    });
    return describe("#iterator", function() {
      return it("should return false for empty queue or last item of the queue, and return true otherwise", function() {
        var item, iterator;
        iterator = this.queue.iterator();
        expect(iterator.hasNext()).toBeFalsy();
        this.queue.enqueue("foo");
        this.queue.enqueue("bar");
        iterator = this.queue.iterator();
        expect(iterator.hasNext()).toBeTruthy();
        item = iterator.next();
        expect(item).toEqual("foo");
        expect(iterator.hasNext()).toBeTruthy();
        item = iterator.next();
        expect(item).toEqual("bar");
        expect(iterator.hasNext()).toBeFalsy();
        return expect(iterator.next()).toEqual(null);
      });
    });
  });
}).call(this);
