(function() {
  var _ref;
  if (typeof App === "undefined" || App === null) {
    App = {};
  }
  if ((_ref = App.Util) == null) {
    App.Util = {};
  }
  App.Util.throttle = function(method, context, timeout) {
    if (timeout == null) {
      timeout = 200;
    }
    clearTimeout(method.tId);
    return method.tId = setTimeout((function() {
      return method.call(context);
    }), timeout);
  };
}).call(this);
