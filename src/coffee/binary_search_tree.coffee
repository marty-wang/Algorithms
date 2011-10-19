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
        
    put: (key, value) ->
        throw "Key and value cannot be null or undefined" if (not key? or not value?)
        @root = _put @root, key, value

    # return value, or return null if nothing found    
    get: (key) ->
        return null unless key?
        _get @root, key

    # return the size of the bst
    size: ->
        _size @root

    # private

    _get = (node, key) ->
        return null unless node?

        if node.key > key
            return _get node.left, key
        else if node.key < key
            return _get node.right, key
        else
            return node.value
    
    _put = (node, key, value) ->
        return new Node key, value unless node?
        
        if node.key > key
            node.left = _put node.left, key, value
        else if node.key < key
            node.right = _put node.right, key, value
        else
            node.value = value
        
        node.n = _size(node.left) + _size(node.right) + 1
        node
    
    _size = (node) ->
        return 0 unless node?
        node.n            

###############################################################################

# exports
$.BST = BST  

  