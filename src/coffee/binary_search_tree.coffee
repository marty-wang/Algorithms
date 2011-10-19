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
        
    put: (key, value, fn) ->
        throw "Key and value cannot be null or undefined" if (not key? or not value?)
        @root = _put.call this, @root, key, value, fn

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
    
    _put = (node, key, value, fn) ->
        branch = 0
        
        unless node?
            newNode = new Node key, value unless node?
            fn.call this, {
                branch: branch
                key: key
                value: value
                isNew: true
            } if fn?
            return newNode

        if node.key > key
            branch = -1
            node.left = _put.call this, node.left, key, value, fn
        else if node.key < key
            branch = 1
            node.right = _put.call this, node.right, key, value, fn
        else
            node.value = value
        
        node.n = _size(node.left) + _size(node.right) + 1
        fn.call this, {
            branch: branch
            key: node.key
            value: node.value
            isNew: false
        } if fn?
        node
    
    _size = (node) ->
        return 0 unless node?
        node.n            

###############################################################################

# exports
$.BST = BST  

  