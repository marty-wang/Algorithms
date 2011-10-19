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
        this._data = new Alg.BST();
        _setup.call(this);
      }
      BSTDemo.prototype.put = function(key, value) {
        var item, iterator, trace, traceStr;
        trace = new Alg.Stack();
        this._data.put(key, value, function(obj) {
          return trace.push(obj);
        });
        iterator = trace.iterator();
        traceStr = "";
        while (iterator.hasNext()) {
          item = iterator.next();
          if (traceStr !== "") {
            traceStr += "; ";
          }
          traceStr += "branch " + item.branch + " value: " + item.value + " isNew: " + item.isNew;
        }
        return console.log(traceStr);
      };
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
    console.log("BST Demo");
    bstDemo = new App.BSTDemo("bst-demo");
    bstDemo.put(4, "node 4");
    bstDemo.put(2, "node 2");
    bstDemo.put(5, "node 5");
    bstDemo.put(3, "node 3");
    bstDemo.put(1, "node 1");
    return bstDemo.put(1, "node 1 updated");
  });
}).call(this);
