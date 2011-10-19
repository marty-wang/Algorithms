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
    BST.prototype.put = function(key, value) {
      if (!(key != null) || !(value != null)) {
        throw "Key and value cannot be null or undefined";
      }
      return this.root = _put(this.root, key, value);
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
    _put = function(node, key, value) {
      if (node == null) {
        return new Node(key, value);
      }
      if (node.key > key) {
        node.left = _put(node.left, key, value);
      } else if (node.key < key) {
        node.right = _put(node.right, key, value);
      } else {
        node.value = value;
      }
      node.n = _size(node.left) + _size(node.right) + 1;
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
