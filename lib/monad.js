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
  getOr: function(dflt) { return dflt; },
  map: function(f) { return this; },
  bind: function(f) { return this; },
  isNothing: function() { return true; },
  isJust: function() { return false; },
};

var Just = function Just(value) {
  this.getOr = function(dflt) {
    return value;
  };
  
  this.map = function(f) {
    return new Just(f(value));
  };
  
  this.bind = function(f) {
    return f(value);
  };
  
  this.isNothing = function() { return false; };
  this.isJust = function() { return true; };
};

exports.maybe = function(value) {
  return value == null ? exports.Nothing : new Just(value); 
};

exports.just = function(value) {
  return new Just(value);
}

/*
 * Wrap a function that may throw an exception. The wrapper will
 * pass its argument to the wrappee, catching any exceptions and
 * returning a Maybe (Nothing on exception, Just otherwise). 
 */
exports.ex = function(f) {
  return function(value) {
    try {
      return new Just(f(value));
    } catch(e) {
      return exports.Nothing;
    }
  }
};

var soak = function(obj, path) {
  if(path.length == 0)
    return exports.maybe(obj);
  else if(typeof obj == 'undefined' || obj[path[0]] == 'undefined')
    return exports.Nothing;
  else
    return soak(obj[path[0]], path.slice(1));
}

exports.soak = function(obj, path) {
  return soak(obj, path.split('.'));
};

/* Either. */
var Either = function(value, isLeft) {
  this.value = value;
  this.isLeft = function() { return isLeft; };
  this.isRight = function() { return !isLeft; };
  this.fold = function(fLeft, fRight) {
    return (this.isLeft() ? fLeft : fRight)(value);
  };
  this.left = function() { return new LeftProjection(this); };
  this.right = function() { return new RightProjection(this); };
};

exports.left = function(value) {
  return new Either(value, true);
};

exports.right = function(value) {
  return new Either(value, false);
};

var LeftProjection = function(either) {
  this.map = function(f) {
    return either.fold(
      function(value) { return exports.left(f(value)); },
      exports.right
    );
  };
};

var RightProjection = function(either) {
  this.map = function(f) {
    return either.fold(
      exports.left,
      function(value) { return exports.right(f(value)); }
    );
  };
};

exports.either = function(value) {
  return (value == null ? exports.left : exports.right)(value);
};

/*
 * Like ex, but results in an Either. When Left, the either will
 * contain the thrown exception.
 */
exports.eitherEx = function(f) {
  return function(value) {
    try {
      return exports.right(f(value));
    } catch(e) {
      return exports.left(e);
    }
  }
};
