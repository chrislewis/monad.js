
exports.Nothing = {
  get: function(dflt) { return dflt; },
  map: function(f) { return this; },
  bind: function(f) { return this; }
};

exports.Just = function Just(value) {
  this.get = function(dflt) {
    return value;
  };
  
  this.map = function(f) {
    return new exports.Just(f(value));
  };
  
  this.bind = function(f) {
    return f(value);
  };
};

exports.maybe = function(value) {
  return value == null ? exports.Nothing : new exports.Just(value); 
};

exports.ex = function(f) {
  return function(value) {
    try {
      return new exports.Just(f(value));
    } catch(e) {
      return exports.Nothing;
    }
  }
}
