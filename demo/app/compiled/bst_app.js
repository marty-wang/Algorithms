(function() {
  (function(App) {
    var BSTDemo, _drawLeaf, _setup;
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
        var branch, item, iterator, trace, traceStr;
        trace = new Alg.Stack();
        this._data.put(key, value, function(obj) {
          return trace.push(obj);
        });
        iterator = trace.iterator();
        traceStr = "";
        while (iterator.hasNext()) {
          item = iterator.next();
          if (traceStr !== "") {
            traceStr += " => ";
          }
          branch = "";
          switch (item.branch) {
            case -1:
              branch = "left";
              break;
            case 1:
              branch = "right";
          }
          traceStr += (item.isNew ? "new " : "") + ("node: '" + item.key + "' " + branch);
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
    _drawLeaf = function(x, y, text) {
      var label, leaf, set;
      set = this._paper.set();
      leaf = this._paper.circle(x, y, 20);
      leaf.attr({
        stroke: "white",
        fill: "black"
      });
      label = this._paper.text(x, y, text);
      label.attr({
        fill: "white",
        "font-size": 20,
        "font-weight": 800
      });
      set.push(leaf, label);
      return set;
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
    return bstDemo.put(1, "node 1");
  });
}).call(this);
