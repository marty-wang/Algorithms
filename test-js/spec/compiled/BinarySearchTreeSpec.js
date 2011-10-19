(function() {
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
    return describe("#get", function() {
      it("should return null if nothing found", function() {
        expect(this.bst.get("somekey")).toBeNull();
        this.bst.root = this.node4;
        expect(this.bst.get()).toBeNull();
        this.node4.left = this.node2;
        this.node4.right = this.node5;
        this.node2.left = this.node1;
        this.node2.right = this.node3;
        return expect(this.bst.get(6)).toBeNull();
      });
      return it("should return the node value if found", function() {
        this.bst.root = this.node4;
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
  });
}).call(this);
