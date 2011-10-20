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
        this.key = null;
        _render.call(this);
        _registerEventHandler.call(this);
      }
      Leaf.prototype.getPosition = function() {
        return [this._x, this._y];
      };
      Leaf.prototype.move = function(x, y, animate) {
        var props;
        if (animate == null) {
          animate = false;
        }
        this._x = x;
        this._y = y;
        props = {
          cx: x,
          cy: y,
          x: x,
          y: y
        };
        if (animate) {
          return this._set.animate(props, 500);
        } else {
          return this._set.attr(props);
        }
      };
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
          fill: "black"
        });
        this._label.attr({
          fill: "white",
          "font-size": 20,
          "font-weight": 800,
          text: this._text
        });
        return this.move(this._x, this._y);
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
    var BSTDemo, _calcHOffsetToFatherLeaf, _setLevels, _setup, _updateTree;
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
        var branch, item, iterator, leaf, level, status, trace, traceStr, _results;
        leaf = this._paper.algLeaf(this._centerX, this._centerY, key, this._leafRadius);
        leaf.payload = value;
        leaf.key = key;
        trace = new Alg.Stack();
        this._data.put(key, leaf, function(obj) {
          return trace.push(obj);
        });
        iterator = trace.iterator();
        traceStr = "";
        _results = [];
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
              leaf.level = level - 1;
              _setLevels.call(this, level);
            } else {
              status = "update ";
            }
          }
          _results.push(traceStr += status + ("node: '" + item.key + "' " + branch));
        }
        return _results;
      };
      BSTDemo.prototype.get = function(key) {};
      return BSTDemo;
    })();
    _setup = function() {
      this._paper.rect(0, 0, this._width, this._height, 10).attr({
        fill: "gray",
        stroke: "none"
      });
      return this._paper.path("M" + this._centerX + " " + this._centerY + "L" + this._centerX + " " + (this._centerY + 400)).attr({
        stroke: "white",
        "stroke-width": 2,
        "stroke-dasharray": "-",
        "stroke-opacity": 0.5
      });
    };
    _setLevels = function(newLevels) {
      this._levels = newLevels;
      return _updateTree.call(this);
    };
    _updateTree = function() {
      var hOffsets, maxLeavesOfLastLevel, maxWidthOfLastLevel, stack;
      console.log("===levels: " + this._levels);
      maxLeavesOfLastLevel = Math.pow(2, this._levels - 1);
      maxWidthOfLastLevel = (maxWidthOfLastLevel - 1) * 2 * this._leafRadius;
      hOffsets = _calcHOffsetToFatherLeaf.call(this, this._levels);
      stack = new Alg.Stack();
      return this._data.iterate(-1, function(key, leaf) {
        var h, item1, item2, level, pos, v;
        try {
          v = 60;
          level = leaf.level;
          h = hOffsets[level];
          item1 = stack.pop();
          while (item1.level > level) {
            item1 = stack.pop();
          }
          if (item1.level < leaf.level) {
            pos = item1.getPosition();
            if (item1.key > leaf.key) {
              leaf.move(pos[0] - h, pos[1] + v);
              stack.push(item1);
              return stack.push(leaf);
            } else if (item1.key < leaf.key) {
              leaf.move(pos[0] + h, pos[1] + v);
              stack.push(item1);
              return stack.push(leaf);
            }
          } else if (item1.level === leaf.level) {
            item2 = stack.pop();
            pos = item2.getPosition();
            leaf.move(pos[0] + h, pos[1] + v);
            stack.push(item2);
            return stack.push(leaf);
          }
        } catch (e) {
          return stack.push(leaf);
        }
      });
    };
    _calcHOffsetToFatherLeaf = function(numOfLevels) {
      var level, maxLeavesOfLastLevel, numOfLeaves, offsets, previousLeafDistance, widthOfPreviousLevel;
      offsets = [];
      if (numOfLevels <= 1) {
        offsets.unshift(0);
      } else {
        maxLeavesOfLastLevel = Math.pow(2, numOfLevels - 1);
        previousLeafDistance = 60;
        widthOfPreviousLevel = (maxLeavesOfLastLevel - 1) * previousLeafDistance;
        for (level = numOfLevels; numOfLevels <= 1 ? level <= 1 : level >= 1; numOfLevels <= 1 ? level++ : level--) {
          if (level === numOfLevels) {
            offsets.unshift(previousLeafDistance / 2);
          } else if (level <= 1) {
            offsets.unshift(0);
          } else {
            widthOfPreviousLevel -= previousLeafDistance;
            numOfLeaves = Math.pow(2, level - 1);
            previousLeafDistance = widthOfPreviousLevel / (numOfLeaves - 1);
            offsets.unshift(previousLeafDistance / 2);
          }
        }
      }
      return offsets;
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
    bstDemo.put(6, "node 6");
    bstDemo.put(3, "node 3");
    bstDemo.put(1, "node 1");
    bstDemo.put(0.5, "node 0.5");
    return bstDemo.put(1.5, "node 1.5");
  });
}).call(this);
