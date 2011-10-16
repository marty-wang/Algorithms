(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  if (typeof App === "undefined" || App === null) {
    App = {};
  }
  (function(App) {
    var StackDemo;
    StackDemo = (function() {
      var _setup;
      function StackDemo(container, width, height, initPosition) {
        if (width == null) {
          width = 640;
        }
        if (height == null) {
          height = 480;
        }
        if (initPosition == null) {
          initPosition = 400;
        }
        this.push = __bind(this.push, this);
        this._width = width;
        this._height = height;
        this._data = new Alg.Stack();
        this._paper = Raphael(container, width, height);
        this._countText = null;
        this._lastY = initPosition;
        this._duration = 400;
        this._itemInitX = 100;
        this._itemInitY = -32;
        this._stepDistance = 34;
        _setup.call(this);
      }
      StackDemo.prototype.push = function(item) {
        var c;
        c = this._paper.rect(this._itemInitX, this._itemInitY, 120, 30);
        this._data.push(c);
        c.attr({
          fill: 'black',
          stroke: 'white'
        }).animate({
          y: this._lastY
        }, this._duration, '<>');
        this._lastY -= this._stepDistance;
        return this._countText.attr("text", this._data.size());
      };
      StackDemo.prototype.pop = function() {
        var c;
        try {
          c = this._data.pop();
          c.animate({
            y: this._itemInitY
          }, this._duration, '>');
          this._lastY += this._stepDistance;
          return this._countText.attr("text", this._data.size());
        } catch (error) {
          return alert("" + error);
        }
      };
      _setup = function() {
        var ct;
        this._paper.rect(0, 0, this._width, this._height, 10).attr({
          fill: "gray",
          stroke: "none"
        });
        ct = this._paper.text(420, 250, "0");
        ct.attr({
          fill: "white",
          "font-family": "Arial",
          "font-weight": 800,
          "font-size": 200
        });
        return this._countText = ct;
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
    var $stackAddButton, $stackRemoveButton, queueDemo, stackDemo;
    stackDemo = new App.StackDemo("stack");
    $stackAddButton = $('#stack .add');
    $stackAddButton.click(function(e) {
      e.preventDefault();
      return stackDemo.push("foo");
    });
    $stackRemoveButton = $('#stack .remove');
    $stackRemoveButton.click(function(e) {
      e.preventDefault();
      return stackDemo.pop();
    });
    return queueDemo = new App.QueueDemo("queue");
  });
}).call(this);
