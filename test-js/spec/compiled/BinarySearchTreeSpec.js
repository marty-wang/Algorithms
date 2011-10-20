(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  describe("BST", function() {
    beforeEach(function() {
      this.bst = new Alg.BST();
      this.node1 = {
        key: 1,
        value: "node 1"
      };
      this.node2 = {
        key: 2,
        value: "node 2"
      };
      this.node3 = {
        key: 3,
        value: "node 3"
      };
      this.node4 = {
        key: 4,
        value: "node 4"
      };
      return this.node5 = {
        key: 5,
        value: "node 5"
      };
    });
    describe("#get", function() {
      it("should return null if nothing found", function() {
        expect(this.bst.get("somekey")).toBeNull();
        this.bst._root = this.node4;
        expect(this.bst.get()).toBeNull();
        this.node4.left = this.node2;
        this.node4.right = this.node5;
        this.node2.left = this.node1;
        this.node2.right = this.node3;
        return expect(this.bst.get(6)).toBeNull();
      });
      return it("should return the node value if found", function() {
        this.bst._root = this.node4;
        expect(this.bst.get(4)).toEqual("node 4");
        this.node4.left = this.node2;
        this.node4.right = this.node5;
        this.node2.left = this.node1;
        this.node2.right = this.node3;
        expect(this.bst.get(1)).toEqual("node 1");
        expect(this.bst.get(2)).toEqual("node 2");
        expect(this.bst.get(3)).toEqual("node 3");
        return expect(this.bst.get(5)).toEqual("node 5");
      });
    });
    describe("#put", function() {
      it("should throw exception if key or value is null or undefined", function() {
        expect(__bind(function() {
          return this.bst.put();
        }, this)).toThrow("Key and value cannot be null or undefined");
        expect(__bind(function() {
          return this.bst.put("somekey");
        }, this)).toThrow("Key and value cannot be null or undefined");
        return expect(__bind(function() {
          return this.bst.put(null, "some value");
        }, this)).toThrow("Key and value cannot be null or undefined");
      });
      return it("should put the item onto the tree or update the one which already exists", function() {
        this.bst.put(4, "node 4");
        this.bst.put(2, "node 2");
        this.bst.put(5, "node 5");
        this.bst.put(1, "node 1");
        this.bst.put(3, "node 3");
        expect(this.bst.get(1)).toEqual("node 1");
        expect(this.bst.get(2)).toEqual("node 2");
        expect(this.bst.get(3)).toEqual("node 3");
        expect(this.bst.get(4)).toEqual("node 4");
        expect(this.bst.get(5)).toEqual("node 5");
        this.bst.put(3, "node 3 updated");
        return expect(this.bst.get(3)).toEqual("node 3 updated");
      });
    });
    describe("#size", function() {
      return it("should return the size of the binary search tree", function() {
        expect(this.bst.size()).toEqual(0);
        this.bst.put(4, "node 4");
        this.bst.put(2, "node 2");
        this.bst.put(5, "node 5");
        this.bst.put(1, "node 1");
        this.bst.put(3, "node 3");
        return expect(this.bst.size()).toEqual(5);
      });
    });
    return describe("#iterate", function() {
      it("should iterate in-order", function() {
        var str;
        str = "";
        this.bst.iterate(0, function(key, value) {
          return str += key;
        });
        expect(str).toEqual("");
        this.bst.put(4, "node 4");
        this.bst.put(2, "node 2");
        this.bst.put(5, "node 5");
        this.bst.put(1, "node 1");
        this.bst.put(3, "node 3");
        this.bst.iterate(0, function(key, value) {
          return str += key;
        });
        return expect(str).toEqual("12345");
      });
      it("should iterate pre-order", function() {
        var str;
        str = "";
        this.bst.iterate(-1, function(key, value) {
          return str += key;
        });
        expect(str).toEqual("");
        this.bst.put(4, "node 4");
        this.bst.put(2, "node 2");
        this.bst.put(5, "node 5");
        this.bst.put(1, "node 1");
        this.bst.put(3, "node 3");
        this.bst.iterate(-1, function(key, value) {
          return str += key;
        });
        return expect(str).toEqual("42135");
      });
      return it("should iterate post-order", function() {
        var str;
        str = "";
        this.bst.iterate(1, function(key, value) {
          return str += key;
        });
        expect(str).toEqual("");
        this.bst.put(4, "node 4");
        this.bst.put(2, "node 2");
        this.bst.put(5, "node 5");
        this.bst.put(1, "node 1");
        this.bst.put(3, "node 3");
        this.bst.iterate(1, function(key, value) {
          return str += key;
        });
        return expect(str).toEqual("13254");
      });
    });
  });
}).call(this);
