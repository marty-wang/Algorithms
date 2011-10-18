(function() {
  var $, Node, Queue, QueueIterator, Stack, StackIterator, _ref;
  $ = (_ref = window.Alg) != null ? _ref : window.Alg = {};
  Node = (function() {
    function Node(item) {
      this.item = item;
      this.next = null;
    }
    return Node;
  })();
  Stack = (function() {
    function Stack() {
      this._first = null;
      this._count = 0;
    }
    Stack.prototype.push = function(item) {
      var newFirst;
      newFirst = new Node(item);
      newFirst.next = this._first;
      this._first = newFirst;
      return ++this._count;
    };
    Stack.prototype.pop = function() {
      var item;
      if (this.isEmpty()) {
        throw "Stack is empty";
      }
      item = this._first.item;
      this._first = this._first.next;
      this._count--;
      return item;
    };
    Stack.prototype.isEmpty = function() {
      return this._count <= 0;
    };
    Stack.prototype.size = function() {
      return this._count;
    };
    Stack.prototype.iterator = function() {
      return new StackIterator(this);
    };
    return Stack;
  })();
  StackIterator = (function() {
    function StackIterator(stack) {
      this._stack = stack;
      this._current = stack._first;
    }
    StackIterator.prototype.hasNext = function() {
      return this._current != null;
    };
    StackIterator.prototype.next = function() {
      var oldCurrent;
      if (this._current == null) {
        throw "There is no next item in stack";
      }
      oldCurrent = this._current;
      this._current = this._current.next;
      return oldCurrent.item;
    };
    return StackIterator;
  })();
  Queue = (function() {
    function Queue() {
      this._count = 0;
      this._first = null;
      this._last = null;
    }
    Queue.prototype.enqueue = function(item) {
      var oldLast;
      oldLast = this._last;
      this._last = new Node(item);
      if (oldLast != null) {
        oldLast.next = this._last;
      }
      if (this._first == null) {
        this._first = this._last;
      }
      return ++this._count;
    };
    Queue.prototype.dequeue = function() {
      var item;
      if (this._count <= 0) {
        throw "Queue is empty";
      }
      item = this._first.item;
      this._first = this._first.next;
      this._count--;
      if (this._count <= 0) {
        this._last = this._first;
      }
      return item;
    };
    Queue.prototype.isEmpty = function() {
      return this._count <= 0;
    };
    Queue.prototype.size = function() {
      return this._count;
    };
    Queue.prototype.iterator = function() {
      return new QueueIterator(this);
    };
    return Queue;
  })();
  QueueIterator = (function() {
    function QueueIterator(queue) {
      this._queue = queue;
      this._current = queue._first;
    }
    QueueIterator.prototype.hasNext = function() {
      return this._current != null;
    };
    QueueIterator.prototype.next = function() {
      var item;
      if (this._current == null) {
        throw "There is no next item in queue";
      }
      item = this._current.item;
      this._current = this._current.next;
      return item;
    };
    return QueueIterator;
  })();
  $.Stack = Stack;
  $.Queue = Queue;
}).call(this);
