(function() {
  (function(App) {
    var BSTDemo, _setup;
    BSTDemo = (function() {
      function BSTDemo(container, width, height) {
        if (width == null) {
          width = 640;
        }
        if (height == null) {
          height = 480;
        }
        this._width = width;
        this._height = height;
        this._paper = Raphael(container, width, height);
        _setup.call(this);
      }
      BSTDemo.prototype.put = function(key, value) {};
      BSTDemo.prototype.get = function(key) {};
      return BSTDemo;
    })();
    _setup = function() {
      return this._paper.rect(0, 0, this._width, this._height, 10).attr({
        fill: "gray",
        stroke: "none"
      });
    };
    return App.BSTDemo = BSTDemo;
  })(App);
  $(function() {
    var bstDemo;
    bstDemo = new App.BSTDemo("bst-demo");
    return console.log(bstDemo);
  });
}).call(this);
