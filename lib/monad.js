/*
 * Monads for NodeJS/CommonJS.
 *
 * A maybe monad modeled after the Scala/Option and Haskell/Maybe types.
 *
 * An either monad, modeled after Scala's Either type.
 *
 * Chris Lewis - chris@thegodcode.net
 */

exports.Nothing = {
  get: function(dflt) { return dflt; },
  map: function(f) { return this; },
  bind: function(f) { return this; },
  isEmpty: function() { return true; }
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
  
  this.isEmpty = function() { return false; };
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
};

/* Either. */
var Either = function(value, isLeft) {
  this.isLeft = function() { return isLeft; };
  this.isRight = function() { return !isLeft; };
  this.fold = function(fLeft, fRight) {
    return (this.isLeft() ? fLeft : fRight)(value);
  };
};

exports.left = function(value) {
  return new Either(value, true);
};

exports.right = function(value) {
  return new Either(value, false);
};

exports.either = function(value) {
  return (value == null ? exports.left : exports.right)(value);
};

exports.eitherEx = function(f) {
  return function(value) {
    try {
      return new exports.right(f(value));
    } catch(e) {
      return exports.left(e);
    }
  }
};
