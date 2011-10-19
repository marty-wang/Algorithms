$ = window.Alg ?= {}

###############################################################################

# Node's key and value cannot be either null or undefined
class Node

    constructor: (@key, @value) ->
        @left = null
        @right = null
        @n = 1

###############################################################################

class BST

    constructor: ->
        @root = null

    # return ture/false for sucess/failure        
    put: (key, value) ->

    # return value, or return null if nothing found    
    get: (key) ->
        return null unless key?

        _get @root, key

    # return the size of the bst
    size: ->
        0

    # private

    _get = (node, key) ->
        return null unless node?

        if node.key > key
            return _get node.left, key
        else if node.key < key
            return _get node.right, key
        else
            return node.value
                 

###############################################################################

# exports
$.BST = BST  

  