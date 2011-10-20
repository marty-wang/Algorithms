(function() {
  (function(App) {
    var Leaf;
    Raphael.fn.algLeaf = function(x, y, text, r) {
      if (text == null) {
        text = "";
      }
      if (r == null) {
        r = 20;
      }
      return new Leaf(this, x, y, text, r);
    };
    return Leaf = (function() {
      var _render;
      function Leaf(paper, x, y, text, r) {
        this._paper = paper;
        this._x = x;
        this._y = y;
        this._text = text;
        this._radius = r;
        this._set = null;
        this._leaf = null;
        this._label = null;
        _render.call(this);
      }
      _render = function() {
        var label, leaf, set;
        if (this._set == null) {
          set = this._paper.set();
          leaf = this._paper.circle(this._x, this._y, this._radius);
          label = this._paper.text(this._x, this._y, this._text);
          set.push(leaf, label);
          this._leaf = leaf;
          this._label = label;
          this._set = set;
        }
        this._leaf.attr({
          stroke: "white",
          fill: "black",
          x: this._x,
          y: this._y
        });
        return this._label.attr({
          fill: "white",
          "font-size": 20,
          "font-weight": 800,
          x: this._x,
          y: this._y,
          text: this._text
        });
      };
      return Leaf;
    })();
  })(App);
  (function(App) {
    var BSTDemo, _setLevels, _setup, _updateTree;
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
        this._levels = 0;
        _setup.call(this);
      }
      BSTDemo.prototype.put = function(key, value) {
        var branch, curLevels, item, iterator, leaf, status, trace, traceStr;
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
          status = "";
          if (!iterator.hasNext()) {
            if (item.isNew) {
              status = "create ";
              curLevels = trace.size();
              _setLevels.call(this, curLevels);
            } else {
              "update ";
            }
          }
          traceStr += status + ("node: '" + item.key + "' " + branch);
        }
        console.log(traceStr);
        return leaf = this._paper.algLeaf(100, 100, "40");
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
    _setLevels = function(newLevels) {
      if (newLevels <= this._levels) {
        return;
      }
      this._levels = newLevels;
      return _updateTree.call(this);
    };
    _updateTree = function() {
      var maxLeavesOfLastLevel;
      console.log("update tree");
      maxLeavesOfLastLevel = Math.pow(2, this._levels - 1);
      return console.log(maxLeavesOfLastLevel);
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
    return bstDemo.put(2, "node 22");
  });
}).call(this);
