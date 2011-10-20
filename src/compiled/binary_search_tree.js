(function() {
  var $, BST, Node, _ref;
  $ = (_ref = window.Alg) != null ? _ref : window.Alg = {};
  Node = (function() {
    function Node(key, value) {
      this.key = key;
      this.value = value;
      this.left = null;
      this.right = null;
      this.n = 1;
    }
    return Node;
  })();
  BST = (function() {
    var _get, _inOrderIterate, _postOrderIterate, _preOrderIterate, _put, _size;
    function BST() {
      this._root = null;
    }
    BST.prototype.put = function(key, value, fn) {
      if (!(key != null) || !(value != null)) {
        throw "Key and value cannot be null or undefined";
      }
      return this._root = _put.call(this, this._root, key, value, fn);
    };
    BST.prototype.get = function(key) {
      if (key == null) {
        return null;
      }
      return _get(this._root, key);
    };
    BST.prototype.size = function() {
      return _size(this._root);
    };
    BST.prototype.iterate = function(order, fn) {
      switch (order) {
        case -1:
          return _preOrderIterate.call(this, this._root, fn);
        case 1:
          return _postOrderIterate.call(this, this._root, fn);
        default:
          return _inOrderIterate.call(this, this._root, fn);
      }
    };
    _get = function(node, key) {
      if (node == null) {
        return null;
      }
      if (node.key > key) {
        return _get(node.left, key);
      } else if (node.key < key) {
        return _get(node.right, key);
      } else {
        return node.value;
      }
    };
    _put = function(node, key, value, fn) {
      var branch, newNode, oldVal;
      branch = 0;
      oldVal;
      if (node == null) {
        if (node == null) {
          newNode = new Node(key, value);
        }
        if (fn != null) {
          fn.call(this, {
            branch: branch,
            key: key,
            value: value,
            oldValue: oldVal
          });
        }
        return newNode;
      }
      if (node.key > key) {
        branch = -1;
        node.left = _put.call(this, node.left, key, value, fn);
      } else if (node.key < key) {
        branch = 1;
        node.right = _put.call(this, node.right, key, value, fn);
      } else {
        oldVal = node.value;
        node.value = value;
      }
      node.n = _size(node.left) + _size(node.right) + 1;
      if (fn != null) {
        fn.call(this, {
          branch: branch,
          key: node.key,
          value: node.value,
          oldValue: oldVal
        });
      }
      return node;
    };
    _size = function(node) {
      if (node == null) {
        return 0;
      }
      return node.n;
    };
    _preOrderIterate = function(node, fn) {
      if (node == null) {
        return null;
      }
      fn.call(this, node.key, node.value);
      _preOrderIterate.call(this, node.left, fn);
      return _preOrderIterate.call(this, node.right, fn);
    };
    _inOrderIterate = function(node, fn) {
      if (node == null) {
        return null;
      }
      _inOrderIterate.call(this, node.left, fn);
      fn.call(this, node.key, node.value);
      return _inOrderIterate.call(this, node.right, fn);
    };
    _postOrderIterate = function(node, fn) {
      if (node == null) {
        return null;
      }
      _postOrderIterate.call(this, node.left, fn);
      _postOrderIterate.call(this, node.right, fn);
      return fn.call(this, node.key, node.value);
    };
    return BST;
  })();
  $.BST = BST;
}).call(this);
