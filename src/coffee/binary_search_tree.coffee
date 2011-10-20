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
        @_root = null
        
    put: (key, value, fn) ->
        throw "Key and value cannot be null or undefined" if (not key? or not value?)
        @_root = _put.call this, @_root, key, value, fn

    # return value, or return null if nothing found    
    get: (key) ->
        return null unless key?
        _get @_root, key

    # return the size of the bst
    size: ->
        _size @_root
    
    iterate: (order, fn) ->
        switch order
            # pre-order
            when -1 then _preOrderIterate.call this, @_root, fn
            # in-order
            when 0 then _inOrderIterate.call this, @_root, fn
            # post-order
            when 1 then _postOrderIterate.call this, @_root, fn

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
        oldVal;

        unless node?
            newNode = new Node key, value unless node?
            fn.call this, {
                branch: branch
                key: key
                value: value
                oldValue: oldVal
            } if fn?
            return newNode
        
        if node.key > key
            branch = -1
            node.left = _put.call this, node.left, key, value, fn
        else if node.key < key
            branch = 1
            node.right = _put.call this, node.right, key, value, fn
        else
            oldVal = node.value
            node.value = value
        
        node.n = _size(node.left) + _size(node.right) + 1
        fn.call this, {
            branch: branch
            key: node.key
            value: node.value
            oldValue: oldVal
        } if fn?
        node
    
    _size = (node) ->
        return 0 unless node?
        node.n            
    
    _preOrderIterate = (node, fn) ->
        return null unless node?

        fn.call this, node.key, node.value        
        _preOrderIterate.call this, node.left, fn
        _preOrderIterate.call this, node.right, fn

    _inOrderIterate = (node, fn) ->
        return null unless node?
        
        _inOrderIterate.call this, node.left, fn
        fn.call this, node.key, node.value
        _inOrderIterate.call this, node.right, fn

    _postOrderIterate = (node, fn) ->
        return null unless node?
        
        _postOrderIterate.call this, node.left, fn
        _postOrderIterate.call this, node.right, fn
        fn.call this, node.key, node.value

###############################################################################

# exports
$.BST = BST  

  