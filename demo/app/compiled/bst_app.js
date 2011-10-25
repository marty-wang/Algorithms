(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
        this._centerLine = this._paper.path("M" + x + " " + y + "L" + x + " " + y);
        this._leaf = this._paper.circle(this._x, this._y, this._radius);
        this._label = this._paper.text(this._x, this._y, this._text);
        this._set.push(this._leaf, this._label);
        this._branchEnd = [this._x, this._y];
        this._payload = null;
        this._highlightBranchTimer = null;
        this._highlightTimer = null;
        this.level = 0;
        this._animDuration = 250;
        this._branchHighlightColor = "blue";
        _render.call(this);
        _registerEventHandler.call(this);
      }
      Leaf.prototype.getKey = function() {
        return this._key;
      };
      Leaf.prototype.getCenter = function() {
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
        var animDuration, centerLinePath, props;
        if (animate == null) {
          animate = false;
        }
        props = {
          transform: "s1",
          opacity: 1
        };
        animDuration = this._animDuration;
        centerLinePath = {
          path: "M" + this._x + " " + this._y + "L" + this._x + " " + (this._y + 400),
          opacity: 1
        };
        if (animate) {
          this._set.animate(props, animDuration, "<>");
          this._branch.animate(props, animDuration, "<>");
          this._centerLine.animate(centerLinePath, animDuration, "<>");
        } else {
          this._set.attr(props);
          this._branch.attr(props);
          this._centerLine.attr(props);
        }
        return this.highlightBranch(false);
      };
      Leaf.prototype.highlight = function(stopOldAnim) {
        var highlightAnim, highlightColor;
        if (stopOldAnim == null) {
          stopOldAnim = true;
        }
        clearTimeout(this._highlightTimer);
        if (stopOldAnim) {
          this._leaf.stop();
        }
        highlightColor = this._branchHighlightColor;
        this._leaf.attr({
          fill: highlightColor
        });
        highlightAnim = Raphael.animation({
          fill: "black"
        }, 1000, "<>");
        return this._highlightTimer = setTimeout((__bind(function() {
          return this._leaf.animate(highlightAnim);
        }, this)), 1000);
      };
      Leaf.prototype.highlightBranch = function(stopOldAnim) {
        var highlightAnim, highlightColor;
        if (stopOldAnim == null) {
          stopOldAnim = true;
        }
        clearTimeout(this._highlightBranchTimer);
        if (stopOldAnim) {
          this._branch.stop();
        }
        highlightColor = this._branchHighlightColor;
        this._branch.attr({
          stroke: highlightColor
        });
        highlightAnim = Raphael.animation({
          stroke: "white"
        }, 1000, "<>");
        return this._highlightBranchTimer = setTimeout((__bind(function() {
          return this._branch.animate(highlightAnim);
        }, this)), 1000);
      };
      Leaf.prototype.move = function(x, y, animate, fn) {
        var animDuraiton, branchPath, centerLinePath, cx1, cy1, props, self;
        if (animate == null) {
          animate = false;
        }
        self = this;
        this._x = x;
        this._y = y;
        cx1 = this._branchEnd[0];
        cy1 = this._branchEnd[1];
        branchPath = {
          path: "M" + x + " " + y + "L" + cx1 + " " + cy1
        };
        centerLinePath = {
          path: "M" + this._x + " " + this._y + "L" + this._x + " " + (this._y + 400)
        };
        props = {
          cx: x,
          cy: y,
          x: x,
          y: y
        };
        this._branch.toBack();
        if (animate) {
          animDuraiton = this._animDuration;
          this._set.animate(props, animDuraiton);
          this._branch.animate(branchPath, animDuraiton);
          return this._centerLine.animate(centerLinePath, animDuraiton, function() {
            if (fn != null) {
              return fn.call(self);
            }
          });
        } else {
          this._set.attr(props);
          this._branch.attr(branchPath);
          this._centerLine.attr(centerLinePath);
          if (fn != null) {
            return fn.call(self);
          }
        }
      };
      Leaf.prototype.connect = function(leaf) {
        var cx, cx1, cy, cy1, pos;
        cx = this._x;
        cy = this._y;
        pos = leaf.getCenter();
        cx1 = pos[0];
        cy1 = pos[1];
        return this._branchEnd = [cx1, cy1];
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
          }, this._animDuration, '<>', function() {
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
          fill: "black"
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
          "stroke-opacity": 0.5,
          opacity: 0
        });
        this._branch.attr({
          stroke: "white",
          "stroke-width": 2,
          opacity: 0
        });
        return this._set.attr({
          transform: "s0",
          opacity: 0
        });
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
    var BSTDemo, _calcHOffsetToFatherLeaf, _createTraceLine, _triggerLog, _updateTree;
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
        this._centerX = width / 2;
        this._centerY = 100;
        this._leafRadius = 20;
        this._minLeafDistance = 60;
        this._verticalLevelDistance = 80;
        this._paper = Raphael(container, width, height);
        this._data = new Alg.BST();
        this._levels = 0;
        this._logHandlers = [];
      }
      BSTDemo.prototype.put = function(key, value) {
        var branch, curLeaf, item, iterator, leaf, level, newLeaf, oldLeaf, oldLevel, oldPayload, oldPos, previousItem, status, trace, traceStr;
        leaf = this._paper.algLeaf(this._centerX, this._centerY, key, key, this._leafRadius);
        leaf.setPayload(value);
        trace = new Alg.Stack();
        this._data.put(key, leaf, function(item) {
          return trace.push(item);
        });
        iterator = trace.iterator();
        traceStr = "";
        previousItem = null;
        status = "";
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
          if (!iterator.hasNext()) {
            if (item.oldValue == null) {
              status = "create";
              level = trace.size();
              leaf.level = level - 1;
              if (level > this._levels) {
                this._levels = level;
              }
              _updateTree.call(this, function() {
                return leaf.show(true);
              });
              _triggerLog.call(this, {
                type: "log",
                subtype: status,
                message: "create new leaf, key: " + (leaf.getKey()) + ", value: " + (leaf.getPayload())
              });
            } else {
              status = "update";
              oldLeaf = item.oldValue;
              oldPayload = oldLeaf.getPayload();
              oldPos = oldLeaf.getCenter();
              oldLevel = oldLeaf.level;
              oldLeaf.remove();
              newLeaf = item.value;
              newLeaf.level = oldLevel;
              if (previousItem != null) {
                newLeaf.connect(previousItem.value);
              }
              newLeaf.move(oldPos[0], oldPos[1]);
              newLeaf.show(true);
              _triggerLog.call(this, {
                type: "log",
                subtype: status,
                message: "update leaf, key: " + (newLeaf.getKey()) + ", new value: " + (newLeaf.getPayload()) + ", old value: " + oldPayload
              });
            }
          } else {
            curLeaf = item.value;
            curLeaf.highlightBranch();
          }
          previousItem = item;
          traceStr += status + (" leaf: '" + item.key + "' " + branch);
        }
        return _triggerLog.call(this, {
          type: "trace",
          subtype: status,
          message: traceStr
        });
      };
      BSTDemo.prototype.get = function(key) {
        var found, traceStr, value;
        traceStr = "from";
        value = this._data.get(key, function(item) {
          var branch;
          branch = "found";
          switch (item.branch) {
            case -1:
              branch = "left=>";
              break;
            case 1:
              branch = "right=>";
          }
          traceStr += " Leaf " + item.key + " " + branch;
          return item.value.highlightBranch();
        });
        if (value == null) {
          traceStr += " dead end";
        }
        found = value != null;
        _triggerLog.call(this, {
          type: "get",
          message: traceStr,
          found: found,
          key: key
        });
        return value;
      };
      BSTDemo.prototype.clear = function() {};
      BSTDemo.prototype.log = function(fn) {
        return this._logHandlers.push(fn);
      };
      return BSTDemo;
    })();
    _createTraceLine = function(trace) {
      var curLeaf, iterator, _results;
      iterator = trace.iterator();
      _results = [];
      while (iterator.hasNext()) {
        _results.push(curLeaf = iterator.next().value);
      }
      return _results;
    };
    _updateTree = function(fn) {
      var hOffsets, stack, v;
      hOffsets = _calcHOffsetToFatherLeaf.call(this, this._levels);
      v = this._verticalLevelDistance;
      stack = new Alg.Stack();
      this._data.iterate(-1, function(key, leaf) {
        var h, item1, item2, level, pos;
        try {
          level = leaf.level;
          h = hOffsets[level];
          item1 = stack.pop();
          while (item1.level > level) {
            item1 = stack.pop();
          }
          if (item1.level < leaf.level) {
            pos = item1.getCenter();
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
            pos = item2.getCenter();
            leaf.connect(item2);
            leaf.move(pos[0] + h, pos[1] + v, true);
            stack.push(item2);
            return stack.push(leaf);
          }
        } catch (e) {
          return stack.push(leaf);
        }
      });
      return setTimeout((__bind(function() {
        return fn.call(this);
      }, this)), 250);
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
    var $add_button, $get_button, $key_select, $log, $trace, $value_input, bstDemo;
    bstDemo = new App.BSTDemo("bst-demo");
    bstDemo.log(function(e) {
      var found, logMessage;
      switch (e.type) {
        case "log":
          $log.text(e.message);
          if (e.subtype === "create") {
            $log.removeClass("negative");
            return $log.addClass("positive");
          } else if (e.subtype === "update") {
            return $log.removeClass("negative positive");
          }
          break;
        case "trace":
          $trace.text(e.message);
          if (e.subtype === "create") {
            $trace.removeClass("negative");
            return $trace.addClass("positive");
          } else if (e.subtype === "update") {
            return $trace.removeClass("negative positive");
          }
          break;
        case "get":
          $trace.text(e.message);
          found = e.found;
          logMessage = "found Leaf " + e.key;
          if (!found) {
            logMessage = "cannot " + logMessage;
          }
          $log.text(logMessage);
          if (found) {
            $trace.removeClass("negative positive");
            return $log.removeClass("negative positive");
          } else {
            $trace.removeClass("positive");
            $log.removeClass("positive");
            $trace.addClass("negative");
            return $log.addClass("negative");
          }
      }
    });
    $key_select = $('#key_select');
    $value_input = $('#value_input');
    $add_button = $('#add_button');
    $get_button = $('#get_button');
    $log = $('#bst-demo .log');
    $trace = $('#bst-demo .trace');
    $add_button.click(function(e) {
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
    $get_button.click(function(e) {
      var key, leaf;
      e.preventDefault();
      key = $key_select.val();
      leaf = bstDemo.get(key);
      if (leaf != null) {
        return leaf.highlight();
      }
    });
    return $(document).bind("keypress", function(e) {
      var key, value, _ref;
      if ((48 <= (_ref = e.keyCode) && _ref <= 57)) {
        key = e.keyCode - 48;
        value = "Leaf " + key;
        return bstDemo.put(key, value);
      }
    });
  });
}).call(this);
