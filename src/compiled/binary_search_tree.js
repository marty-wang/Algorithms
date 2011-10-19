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
    var _get;
    function BST() {
      this.root = null;
    }
    BST.prototype.put = function(key, value) {};
    BST.prototype.get = function(key) {
      if (key == null) {
        return null;
      }
      return _get(this.root, key);
    };
    BST.prototype.size = function() {
      return 0;
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
    return BST;
  })();
  $.BST = BST;
}).call(this);
