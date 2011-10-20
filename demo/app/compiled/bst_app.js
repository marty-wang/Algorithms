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
      var _registerEventHandler, _render;
      function Leaf(paper, x, y, text, r) {
        this._paper = paper;
        this._x = x;
        this._y = y;
        this._text = text;
        this._radius = r;
        this._set = null;
        this._leaf = null;
        this._label = null;
        this.level = 0;
        this.payload = null;
        _render.call(this);
        _registerEventHandler.call(this);
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
      _registerEventHandler = function() {
        var self;
        self = this;
        return this._set.click(function() {
          return console.log(self);
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
        this._centerX = width / 2;
        this._centerY = 100;
        this._leafRadius = 20;
        _setup.call(this);
      }
      BSTDemo.prototype.put = function(key, value) {
        var branch, item, iterator, leaf, level, status, trace, traceStr;
        leaf = this._paper.algLeaf(this._centerX, this._centerY, key, this._leafRadius);
        leaf.payload = value;
        trace = new Alg.Stack();
        this._data.put(key, leaf, function(obj) {
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
            if (item.oldValue == null) {
              status = "create ";
              level = trace.size();
              leaf.level = level;
              _setLevels.call(this, level);
            } else {
              status = "update ";
            }
          }
          traceStr += status + ("node: '" + item.key + "' " + branch);
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
    _setLevels = function(newLevels) {
      if (newLevels <= this._levels) {
        return false;
      }
      this._levels = newLevels;
      _updateTree.call(this);
      return true;
    };
    _updateTree = function() {
      var maxLeavesOfLastLevel, maxWidthOfLastLevel;
      console.log("update tree");
      console.log("levels: " + this._levels);
      maxLeavesOfLastLevel = Math.pow(2, this._levels - 1);
      maxWidthOfLastLevel = (maxWidthOfLastLevel - 1) * 2 * this._leafRadius;
      return this._data.iterate(1, function(key, leaf) {
        return console.log(key);
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
    return bstDemo.put(3, "node 3");
  });
}).call(this);
