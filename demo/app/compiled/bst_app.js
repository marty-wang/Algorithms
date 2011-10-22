(function() {
  (function(App) {
    var Leaf;
    Raphael.fn.algLeaf = function(x, y, key, text, r) {
      if (text == null) {
        text = "";
      }
      if (r == null) {
        r = 20;
      }
      return new Leaf(this, x, y, key, text, r);
    };
    return Leaf = (function() {
      var _registerEventHandler, _remove, _render;
      function Leaf(paper, x, y, key, text, r) {
        this._paper = paper;
        this._x = x;
        this._y = y;
        this._key = key;
        this._text = text;
        this._radius = r;
        this._set = this._paper.set();
        this._branch = this._paper.path();
        this._centerLine = this._paper.path();
        this._leaf = this._paper.circle(this._x, this._y, this._radius);
        this._label = this._paper.text(this._x, this._y, this._text);
        this._set.push(this._leaf, this._label, this._branch);
        this._branchEnd = [this._x, this._y];
        this._payload = null;
        this.level = 0;
        _render.call(this);
        _registerEventHandler.call(this);
      }
      Leaf.prototype.getKey = function() {
        return this._key;
      };
      Leaf.prototype.getPosition = function() {
        return [this._x, this._y];
      };
      Leaf.prototype.setPayload = function(payload) {
        this._payload = payload;
        return this._set.attr({
          title: payload
        });
      };
      Leaf.prototype.getPayload = function() {
        return this._payload;
      };
      Leaf.prototype.show = function(animate) {
        var props;
        if (animate == null) {
          animate = false;
        }
        props = {
          transform: "s1",
          opacity: 1
        };
        if (animate) {
          return this._set.animate(props, 250, "<>");
        } else {
          return this._set.attr(props);
        }
      };
      Leaf.prototype.move = function(x, y, animate) {
        var animDuraiton, branchPath, cx1, cy1, props;
        if (animate == null) {
          animate = false;
        }
        this._x = x;
        this._y = y;
        cx1 = this._branchEnd[0];
        cy1 = this._branchEnd[1];
        branchPath = "M" + x + " " + y + "L" + cx1 + " " + cy1;
        props = {
          cx: x,
          cy: y,
          x: x,
          y: y,
          path: branchPath
        };
        if (animate) {
          animDuraiton = 500;
          this._set.animate(props, animDuraiton);
          this._centerLine.animate({
            path: "M" + this._x + " " + this._y + "L" + this._x + " " + (this._y + 400)
          }, animDuraiton);
        } else {
          this._set.attr(props);
          this._centerLine.attr({
            path: "M" + this._x + " " + this._y + "L" + this._x + " " + (this._y + 400)
          });
        }
        return this._branch.toBack();
      };
      Leaf.prototype.connect = function(leaf) {
        var cx1, cy1, myCx, myCy, pos;
        myCx = this._x;
        myCy = this._y;
        pos = leaf.getPosition();
        cx1 = pos[0];
        cy1 = pos[1];
        this._branchEnd = [cx1, cy1];
        this._branch.attr({
          path: "M" + myCx + " " + myCy + "L" + cx1 + " " + cy1
        });
        return this._branch.toBack();
      };
      Leaf.prototype.remove = function(animate, fn) {
        var self;
        if (animate == null) {
          animate = false;
        }
        self = this;
        if (animate) {
          this._centerLine.remove();
          this._branch.remove();
          return this._set.animate({
            transform: 's0',
            opacity: 0
          }, 250, '<>', function() {
            self._set.remove();
            if (fn != null) {
              return fn.call(self);
            }
          });
        } else {
          return _remove.call(this);
        }
      };
      _remove = function() {
        this._set.remove();
        this._centerLine.remove();
        return this._branch.remove();
      };
      _render = function() {
        this._leaf.attr({
          stroke: "white",
          fill: "black",
          opacity: 0.4
        });
        this._label.attr({
          fill: "white",
          "font-size": 20,
          "font-weight": 800,
          text: this._text
        });
        this._centerLine.attr({
          stroke: "white",
          "stroke-width": 2,
          "stroke-dasharray": "-",
          "stroke-opacity": 0.5
        });
        this._branch.attr({
          stroke: "white",
          "stroke-width": 2
        });
        this._set.attr({
          transform: "s0",
          opacity: 0
        });
        return this.move(this._x, this._y);
      };
      _registerEventHandler = function() {
        var self;
        self = this;
        return this._set.click(function() {
          return alert(self._payload);
        });
      };
      return Leaf;
    })();
  })(App);
  (function(App) {
    var BSTDemo, _calcHOffsetToFatherLeaf, _setLevels, _triggerLog, _updateTree;
    BSTDemo = (function() {
      function BSTDemo(container, width, height) {
        if (width == null) {
          width = 1024;
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
        this._minLeafDistance = 60;
        this._verticalLevelDistance = 80;
        this._logHandlers = [];
      }
      BSTDemo.prototype.put = function(key, value) {
        var branch, item, iterator, leaf, level, newLeaf, oldLeaf, oldLevel, oldPayload, oldPos, previousItem, status, trace, traceStr, _results;
        leaf = this._paper.algLeaf(this._centerX, this._centerY, key, key, this._leafRadius);
        leaf.setPayload(value);
        trace = new Alg.Stack();
        this._data.put(key, leaf, function(obj) {
          return trace.push(obj);
        });
        iterator = trace.iterator();
        traceStr = "";
        previousItem = null;
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
              level = Math.max(level, this._levels);
              _setLevels.call(this, level);
              leaf.show(true);
              _triggerLog.call(this, "created new leaf, key: " + (leaf.getKey()) + ", value: " + (leaf.getPayload()));
            } else {
              status = "update ";
              oldLeaf = item.oldValue;
              oldPayload = oldLeaf.getPayload();
              oldPos = oldLeaf.getPosition();
              oldLevel = oldLeaf.level;
              oldLeaf.remove();
              newLeaf = item.value;
              newLeaf.level = oldLevel;
              newLeaf.move(oldPos[0], oldPos[1]);
              if (previousItem != null) {
                newLeaf.connect(previousItem.value);
              }
              newLeaf.show(true);
              _triggerLog.call(this, "updated leaf, key: " + (newLeaf.getKey()) + ", new value: " + (newLeaf.getPayload()) + ", old value: " + oldPayload);
            }
          }
          previousItem = item;
          _results.push(traceStr += status + ("node: '" + item.key + "' " + branch));
        }
        return _results;
      };
      BSTDemo.prototype.get = function(key) {};
      BSTDemo.prototype.log = function(fn) {
        return this._logHandlers.push(fn);
      };
      return BSTDemo;
    })();
    _setLevels = function(newLevels) {
      this._levels = newLevels;
      return _updateTree.call(this);
    };
    _updateTree = function() {
      var hOffsets, maxLeavesOfLastLevel, maxWidthOfLastLevel, stack, v;
      maxLeavesOfLastLevel = Math.pow(2, this._levels - 1);
      maxWidthOfLastLevel = (maxWidthOfLastLevel - 1) * 2 * this._leafRadius;
      hOffsets = _calcHOffsetToFatherLeaf.call(this, this._levels);
      v = this._verticalLevelDistance;
      stack = new Alg.Stack();
      return this._data.iterate(-1, function(key, leaf) {
        var h, item1, item2, level, pos;
        try {
          level = leaf.level;
          h = hOffsets[level];
          item1 = stack.pop();
          while (item1.level > level) {
            item1 = stack.pop();
          }
          if (item1.level < leaf.level) {
            pos = item1.getPosition();
            leaf.connect(item1);
            if (item1.getKey() > leaf.getKey()) {
              leaf.move(pos[0] - h, pos[1] + v, true);
              stack.push(item1);
              return stack.push(leaf);
            } else if (item1.getKey() < leaf.getKey()) {
              leaf.move(pos[0] + h, pos[1] + v, true);
              stack.push(item1);
              return stack.push(leaf);
            }
          } else if (item1.level === leaf.level) {
            item2 = stack.pop();
            pos = item2.getPosition();
            leaf.connect(item2);
            leaf.move(pos[0] + h, pos[1] + v, true);
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
        previousLeafDistance = this._minLeafDistance;
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
    _triggerLog = function(info) {
      var fn, _i, _len, _ref, _results;
      _ref = this._logHandlers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        _results.push(fn.call(this, info));
      }
      return _results;
    };
    return App.BSTDemo = BSTDemo;
  })(App);
  $(function() {
    var $add_button, $key_select, $log, $value_input, bstDemo;
    console.log("BST Demo");
    bstDemo = new App.BSTDemo("bst-demo");
    bstDemo.log(function(e) {
      return $log.text(e);
    });
    $key_select = $('#key_select');
    $value_input = $('#value_input');
    $add_button = $('#add_button');
    $log = $('#bst-demo .log');
    return $add_button.click(function(e) {
      var key, value;
      e.preventDefault();
      key = $key_select.val();
      value = $value_input.val();
      $value_input.val("");
      if (value === "") {
        value = "Leaf " + key;
      }
      return bstDemo.put(key, value);
    });
  });
}).call(this);
