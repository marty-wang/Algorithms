describe "BST", ->

    #             4
    #       2         5
    #    1     3

    beforeEach ->
        @bst = new Alg.BST()
        @node1 = {
            key: 1
            value: "node 1"
        }
        @node2 = {
            key: 2
            value: "node 2"
        }
        @node3 = {
            key: 3
            value: "node 3"
        }
        @node4 = {
            key: 4
            value: "node 4"
        }
        @node5 = {
            key: 5
            value: "node 5"
        }


    describe "#get", ->
        it "should return null if nothing found", ->
            expect(@bst.get "somekey").toBeNull()

            @bst.root = @node4
            expect(@bst.get()).toBeNull()

            @node4.left = @node2
            @node4.right = @node5
            @node2.left = @node1
            @node2.right = @node3

            expect(@bst.get(6)).toBeNull()
        
        it "should return the node value if found", ->
            @bst.root = @node4
            expect(@bst.get(4)).toEqual("node 4")

            @node4.left = @node2
            @node4.right = @node5
            @node2.left = @node1
            @node2.right = @node3

            expect(@bst.get(1)).toEqual("node 1")
            expect(@bst.get(2)).toEqual("node 2")
            expect(@bst.get(3)).toEqual("node 3")
            expect(@bst.get(5)).toEqual("node 5")

            