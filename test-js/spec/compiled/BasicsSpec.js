(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  describe("Stack", function() {
    beforeEach(function() {
      return this.stack = new Alg.Stack();
    });
    describe("#push", function() {
      return it("should increase the size by 1", function() {
        var newSize, oldSize;
        oldSize = this.stack.size();
        this.stack.push("foo");
        newSize = this.stack.size();
        expect(newSize - oldSize).toEqual(1);
        oldSize = this.stack.size();
        this.stack.push();
        newSize = this.stack.size();
        return expect(newSize - oldSize).toEqual(1);
      });
    });
    describe("#pop", function() {
      it("should throw exception when try to pop empty stack", function() {
        expect(__bind(function() {
          return this.stack.pop();
        }, this)).toThrow("stack is empty");
        this.stack.push("foo");
        this.stack.pop();
        return expect(__bind(function() {
          return this.stack.pop();
        }, this)).toThrow("stack is empty");
      });
      return it("should return the item that is added later", function() {
        var item;
        this.stack.push("foo");
        this.stack.push("bar");
        item = this.stack.pop();
        expect(item).toEqual("bar");
        item = this.stack.pop();
        return expect(item).toEqual("foo");
      });
    });
    describe("#isEmpty", function() {
      return it("should return true if no item in stack and return false otherwiese", function() {
        expect(this.stack.isEmpty()).toBeTruthy();
        this.stack.push("foo");
        expect(this.stack.isEmpty()).toBeFalsy();
        this.stack.pop();
        return expect(this.stack.isEmpty()).toBeTruthy();
      });
    });
    describe("#size", function() {
      return it("should update size when push and pop", function() {
        expect(this.stack.size()).toEqual(0);
        this.stack.push("foo");
        expect(this.stack.size()).toEqual(1);
        this.stack.push("bar");
        expect(this.stack.size()).toEqual(2);
        this.stack.pop();
        return expect(this.stack.size()).toEqual(1);
      });
    });
    return describe("#iterator", function() {
      return it("should iterate from new item to old item", function() {
        var iterator;
        iterator = this.stack.iterator();
        expect(iterator.hasNext()).toBeFalsy();
        this.stack.push("foo");
        this.stack.push();
        this.stack.push("bar");
        this.stack.push(null);
        iterator = this.stack.iterator();
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBeNull();
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toEqual("bar");
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBeUndefined();
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toEqual("foo");
        expect(iterator.hasNext()).toBeFalsy();
        return expect(__bind(function() {
          return iterator.next();
        }, this)).toThrow("There is no next item in stack");
      });
    });
  });
  describe("Queue", function() {
    beforeEach(function() {
      return this.queue = new Alg.Queue();
    });
    describe("#enqueue", function() {
      return it("should append the item and increase the size by 1", function() {
        var newSize, oldSize;
        oldSize = this.queue.size();
        this.queue.enqueue("foo");
        newSize = this.queue.size();
        expect(newSize - oldSize).toEqual(1);
        oldSize = newSize;
        this.queue.enqueue();
        newSize = this.queue.size();
        return expect(newSize - oldSize).toEqual(1);
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
      return it("should iterate from old item to new item", function() {
        var iterator;
        iterator = this.queue.iterator();
        expect(iterator.hasNext()).toBeFalsy();
        this.queue.enqueue("foo");
        this.queue.enqueue("bar");
        this.queue.enqueue(null);
        this.queue.enqueue();
        iterator = this.queue.iterator();
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toEqual("foo");
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toEqual("bar");
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBeNull();
        expect(iterator.hasNext()).toBeTruthy();
        expect(iterator.next()).toBeUndefined();
        expect(iterator.hasNext()).toBeFalsy();
        return expect(__bind(function() {
          return iterator.next();
        }, this)).toThrow("There is no next item in queue");
      });
    });
  });
}).call(this);
