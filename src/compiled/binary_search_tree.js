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
    var _get, _put, _size;
    function BST() {
      this.root = null;
    }
    BST.prototype.put = function(key, value, fn) {
      if (!(key != null) || !(value != null)) {
        throw "Key and value cannot be null or undefined";
      }
      return this.root = _put.call(this, this.root, key, value, fn);
    };
    BST.prototype.get = function(key) {
      if (key == null) {
        return null;
      }
      return _get(this.root, key);
    };
    BST.prototype.size = function() {
      return _size(this.root);
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
      var branch, newNode;
      branch = 0;
      if (node == null) {
        if (node == null) {
          newNode = new Node(key, value);
        }
        if (fn != null) {
          fn.call(this, {
            branch: branch,
            key: key,
            value: value,
            isNew: true
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
        node.value = value;
      }
      node.n = _size(node.left) + _size(node.right) + 1;
      if (fn != null) {
        fn.call(this, {
          branch: branch,
          key: node.key,
          value: node.value,
          isNew: false
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
    return BST;
  })();
  $.BST = BST;
}).call(this);
