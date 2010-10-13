

exports.compose = function() {
  if(arguments.length == 1) {
    return arguments[0];
  } else {
    var f0 = arguments[0];
    var f1 = arguments[1];
    /* The composition: f(g(x)) */
    var f = [function() {
      return f1.apply(null,
        [f0.apply(null, arguments)]);
    }];
    return exports.compose.apply(null,
      arguments.length == 2
        ? f
        : f.concat(Array.prototype.slice.apply(arguments, [2])));
  }
}
