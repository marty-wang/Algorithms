(function() {
  if (typeof App === "undefined" || App === null) {
    App = {};
  }
  (function(App) {
    var StackDemo;
    StackDemo = (function() {
      var _init;
      function StackDemo(container, width, height) {
        if (width == null) {
          width = 640;
        }
        if (height == null) {
          height = 480;
        }
        this._paper = Raphael(container, width, height);
        this._width = width;
        this._height = height;
        _init.call(this);
      }
      _init = function() {
        return this._paper.rect(0, 0, this._width, this._height, 10).attr({
          fill: "gray",
          stroke: "none"
        });
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
    var queueDemo, stackDemo;
    stackDemo = new App.StackDemo("stack");
    return queueDemo = new App.QueueDemo("queue");
  });
}).call(this);
