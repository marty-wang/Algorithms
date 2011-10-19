App ?= {}
App.Util ?= {}

App.Util.throttle = (method, context, timeout = 200) ->
    clearTimeout method.tId
    method.tId = setTimeout (->
        method.call context
    ), timeout

###############################################################################