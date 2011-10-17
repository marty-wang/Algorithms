(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  if (typeof App === "undefined" || App === null) {
    App = {};
  }
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
        this.push = __bind(this.push, this);
        this._width = width;
        this._height = height;
        this._data = new Alg.Stack();
        this._paper = Raphael(container, width, height);
        this._countText = null;
        this._lastY = initPosition;
        this._counter = 0;
        this.LIMIT = 11;
        this._duration = 400;
        this._itemInitX = 100;
        this._itemInitY = -32;
        this._stepDistance = 34;
        this._errorHandlers = [];
        _setup.call(this);
      }
      StackDemo.prototype.push = function(item) {
        var c;
        if (this._data.size() > this.LIMIT - 1) {
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
        var fn, _i, _len, _ref, _results;
        _ref = this._errorHandlers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
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
      var _init;
      function QueueDemo(container) {
        _init.call(this);
      }
      _init = function() {
        return console.log(this);
      };
      return QueueDemo;
    })();
    return App.QueueDemo = QueueDemo;
  })(App);
  $(function() {
    var queueDemo;
    (function() {
      var $addButton, $all, $countNumber, $error, $iterateButton, $limitNumber, $removeButton, stackDemo, updateCountNumber;
      stackDemo = new App.StackDemo("stack");
      stackDemo.error(function(error) {
        $error.text("" + error);
        return setTimeout((function() {
          return $error.text("");
        }), 2000);
      });
      $limitNumber = $('#stack .limit .number');
      $countNumber = $('#stack .count .number');
      $all = $('#stack .all');
      $error = $('#stack .error');
      $limitNumber.text(stackDemo.LIMIT);
      $addButton = $('#stack .add');
      $addButton.click(function(e) {
        e.preventDefault();
        stackDemo.push();
        return updateCountNumber();
      });
      $removeButton = $('#stack .remove');
      $removeButton.click(function(e) {
        e.preventDefault();
        stackDemo.pop();
        return updateCountNumber();
      });
      $iterateButton = $('#stack .iterate');
      $iterateButton.click(function(e) {
        var list;
        e.preventDefault();
        list = stackDemo.iterate();
        return $all.text(list);
      });
      return updateCountNumber = function() {
        var size;
        size = stackDemo.size();
        return $countNumber.text(size);
      };
    })();
    return queueDemo = new App.QueueDemo("queue");
  });
}).call(this);
