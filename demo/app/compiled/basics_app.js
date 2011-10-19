(function() {
  var _ref;
  if (typeof App === "undefined" || App === null) {
    App = {};
  }
  if ((_ref = App.Util) == null) {
    App.Util = {};
  }
  App.Util.throttle = function(method, context, timeout) {
    if (timeout == null) {
      timeout = 200;
    }
    clearTimeout(method.tId);
    return method.tId = setTimeout((function() {
      return method.call(context);
    }), timeout);
  };
  (function(App) {
    var Label;
    Raphael.fn.algLabel = function(x, y, width, height, text, r) {
      if (r == null) {
        r = 0;
      }
      return new Label(this, x, y, width, height, text, r);
    };
    return Label = (function() {
      var _render;
      function Label(paper, x, y, width, height, text, r) {
        this._paper = paper;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._text = text;
        this._r = r;
        this._attr = {
          background: 'black',
          stroke: 'white',
          textColor: 'white',
          fontFamily: "Arial",
          fontSize: 18,
          fontWeight: 40
        };
        this._rectElm = null;
        this._textElm = null;
        this._set = null;
        _render.call(this);
      }
      Label.prototype.getSet = function() {
        return this._set;
      };
      Label.prototype.getText = function() {
        return this._text;
      };
      _render = function() {
        if (this._set == null) {
          this._set = this._paper.set();
          this._rectElm = this._paper.rect(this._x, this._y, this._width, this._height, this._r);
          this._textElm = this._paper.text(0, 0, this._text);
          this._set.push(this._rectElm, this._textElm);
        }
        this._rectElm.attr({
          fill: this._attr.background,
          stroke: this._attr.stroke
        });
        return this._textElm.attr({
          fill: this._attr.textColor,
          "font-family": this._attr.fontFamily,
          "font-size": this._attr.fontSize,
          "font-weight": this._attr.fontWeight,
          x: this._x + this._width / 2,
          y: this._y + this._height / 2
        });
      };
      return Label;
    })();
  })(App);
  (function(App) {
    var StackDemo;
    StackDemo = (function() {
      var _setup, _triggerError;
      function StackDemo(container, width, height, initPosition) {
        if (width == null) {
          width = 640;
        }
        if (height == null) {
          height = 480;
        }
        if (initPosition == null) {
          initPosition = 420;
        }
        this._width = width;
        this._height = height;
        this._data = new Alg.Stack();
        this._paper = Raphael(container, width, height);
        this._countText = null;
        this._lastY = initPosition;
        this._counter = 0;
        this.CAPACITY = 11;
        this._duration = 400;
        this._itemInitX = 100;
        this._itemInitY = -32;
        this._stepDistance = 34;
        this._errorHandlers = [];
        _setup.call(this);
      }
      StackDemo.prototype.push = function(item) {
        var c;
        if (this._data.size() > this.CAPACITY - 1) {
          _triggerError.call(this, "Stack is full");
          return;
        }
        if (item == null) {
          item = this._counter;
        }
        this._counter++;
        c = this._paper.algLabel(this._itemInitX, this._itemInitY, 120, 30, item);
        this._data.push(c);
        c.getSet().animate({
          transform: "t0," + this._lastY
        }, this._duration, '<>');
        return this._lastY -= this._stepDistance;
      };
      StackDemo.prototype.pop = function() {
        var c;
        try {
          c = this._data.pop();
          c.getSet().animate({
            transform: "t0," + this._itemInitY
          }, this._duration, '>');
          return this._lastY += this._stepDistance;
        } catch (error) {
          return _triggerError.call(this, error);
        }
      };
      StackDemo.prototype.size = function() {
        return this._data.size();
      };
      StackDemo.prototype.iterate = function() {
        var iterator, list;
        iterator = this._data.iterator();
        list = "";
        while (iterator.hasNext()) {
          if (list !== "") {
            list += ", ";
          }
          list += iterator.next().getText();
        }
        return list;
      };
      StackDemo.prototype.error = function(fn) {
        return this._errorHandlers.push(fn);
      };
      _setup = function() {
        return this._paper.rect(0, 0, this._width, this._height, 10).attr({
          fill: "gray",
          stroke: "none"
        });
      };
      _triggerError = function(error) {
        var fn, _i, _len, _ref2, _results;
        _ref2 = this._errorHandlers;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          fn = _ref2[_i];
          _results.push(fn.call(this, error));
        }
        return _results;
      };
      return StackDemo;
    })();
    return App.StackDemo = StackDemo;
  })(App);
  (function(App) {
    var QueueDemo;
    QueueDemo = (function() {
      var _setup, _triggerError;
      function QueueDemo(container, width, height, initPosition) {
        if (width == null) {
          width = 640;
        }
        if (height == null) {
          height = 480;
        }
        if (initPosition == null) {
          initPosition = 465;
        }
        this._width = width;
        this._height = height;
        this._data = new Alg.Queue();
        this._paper = Raphael(container, width, height);
        this._countText = null;
        this._lastX = initPosition;
        this._counter = 0;
        this.CAPACITY = 11;
        this._duration = 400;
        this._itemInitX = 600;
        this._itemInitY = 300;
        this._stepDistance = 34;
        this._errorHandlers = [];
        _setup.call(this);
      }
      QueueDemo.prototype.enqueue = function(item) {
        var c;
        if (this._data.size() > this.CAPACITY - 1) {
          _triggerError.call(this, "Queue is full");
          return;
        }
        if (item == null) {
          item = this._counter;
        }
        this._counter++;
        c = this._paper.algLabel(this._itemInitX, this._itemInitY, 30, 120, item);
        this._data.enqueue(c);
        c._lastX = this._lastX;
        c.getSet().animate({
          transform: "t-" + this._lastX + ",0"
        }, this._duration, '<>');
        return this._lastX -= this._stepDistance;
      };
      QueueDemo.prototype.dequeue = function() {
        var c, iterator, n;
        try {
          c = this._data.dequeue();
          c.getSet().animate({
            transform: "t-640,0"
          }, this._duration, '>');
          iterator = this._data.iterator();
          while (iterator.hasNext()) {
            n = iterator.next();
            n._lastX += this._stepDistance;
            n.getSet().animate({
              transform: "t-" + n._lastX + ",0"
            }, this._duration, '<>');
          }
          return this._lastX += this._stepDistance;
        } catch (error) {
          return _triggerError.call(this, error);
        }
      };
      QueueDemo.prototype.size = function() {
        return this._data.size();
      };
      QueueDemo.prototype.iterate = function() {
        var iterator, list;
        iterator = this._data.iterator();
        list = "";
        while (iterator.hasNext()) {
          if (list !== "") {
            list += ", ";
          }
          list += iterator.next().getText();
        }
        return list;
      };
      QueueDemo.prototype.error = function(fn) {
        return this._errorHandlers.push(fn);
      };
      _setup = function() {
        return this._paper.rect(0, 0, this._width, this._height, 10).attr({
          fill: "gray",
          stroke: "none"
        });
      };
      _triggerError = function(error) {
        var fn, _i, _len, _ref2, _results;
        _ref2 = this._errorHandlers;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          fn = _ref2[_i];
          _results.push(fn.call(this, error));
        }
        return _results;
      };
      return QueueDemo;
    })();
    return App.QueueDemo = QueueDemo;
  })(App);
  $(function() {
    (function() {
      var $addButton, $all, $capacityNumber, $countNumber, $error, $removeButton, iterate, stackDemo, updateCountNumber;
      stackDemo = new App.StackDemo("stack-demo");
      stackDemo.error(function(error) {
        $error.text("" + error);
        return setTimeout((function() {
          return $error.text("");
        }), 2000);
      });
      $capacityNumber = $('#stack .capacity .number');
      $countNumber = $('#stack .count .number');
      $all = $('#stack .all');
      $error = $('#stack .error');
      $capacityNumber.text(stackDemo.CAPACITY);
      $addButton = $('#stack .add');
      $addButton.click(function(e) {
        e.preventDefault();
        stackDemo.push();
        updateCountNumber();
        return App.Util.throttle(iterate, null, 500);
      });
      $removeButton = $('#stack .remove');
      $removeButton.click(function(e) {
        e.preventDefault();
        stackDemo.pop();
        updateCountNumber();
        return App.Util.throttle(iterate, null, 500);
      });
      updateCountNumber = function() {
        var size;
        size = stackDemo.size();
        return $countNumber.text(size);
      };
      return iterate = function() {
        var list;
        list = stackDemo.iterate();
        return $all.text(list);
      };
    })();
    return (function() {
      var $addButton, $all, $capacityNumber, $countNumber, $error, $removeButton, iterate, queueDemo, updateCountNumber;
      queueDemo = new App.QueueDemo("queue-demo");
      queueDemo.error(function(error) {
        $error.text("" + error);
        return setTimeout((function() {
          return $error.text("");
        }), 2000);
      });
      $capacityNumber = $('#queue .capacity .number');
      $countNumber = $('#queue .count .number');
      $all = $('#queue .all');
      $error = $('#queue .error');
      $capacityNumber.text(queueDemo.CAPACITY);
      $addButton = $('#queue .add');
      $addButton.click(function(e) {
        e.preventDefault();
        queueDemo.enqueue();
        updateCountNumber();
        return App.Util.throttle(iterate, null, 500);
      });
      $removeButton = $('#queue .remove');
      $removeButton.click(function(e) {
        e.preventDefault();
        queueDemo.dequeue();
        updateCountNumber();
        return App.Util.throttle(iterate, null, 500);
      });
      updateCountNumber = function() {
        var size;
        size = queueDemo.size();
        return $countNumber.text(size);
      };
      return iterate = function() {
        var list;
        list = queueDemo.iterate();
        return $all.text(list);
      };
    })();
  });
}).call(this);
