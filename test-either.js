var assert = require('assert'),
  m = require('./lib/monad');

var left = m.left('error');
var right = m.right('ok');

var identity = function(v) { return v; };
var append = function(suffix) {
  return function(v) {
    return v + ' ' + suffix;
  }
};

assert.equal(left.fold(identity, identity), 'error');
assert.equal(right.fold(identity, identity), 'ok');

/* Always throws exception. */
var fail = function(v) { throw 'BOOM'; };
/* Wrap in a function that will yield an appropriate Either. */
var wrappedFail = m.eitherEx(fail);
/* Wrap the identity function, which will always succeed. */
var wrappedSuccess = m.eitherEx(identity);

assert.equal(wrappedFail('hello').fold(identity, identity), 'BOOM');
assert.equal(wrappedSuccess('hello').fold(identity, identity), 'hello');

/* Projections. */
assert.equal(right.left().map(append('go!')).fold(identity, identity), 'ok');
assert.equal(right.right().map(append('go!')).fold(identity, identity), 'ok go!');
assert.equal(left.right().map(append('go!')).fold(identity, identity), 'error');
assert.equal(left.left().map(append('go!')).fold(identity, identity), 'error go!');

/* Either predicates: isLeft, isRight */
function product(x) {
  return function(y) {
    return x * y;
  }
}

function zero() {
  return 0;
}

var eithers = [
  m.left(1),
  m.left(2),
  m.left(3),
  m.right(4),
  m.right(5)
];

assert.equal(eithers.filter(m.isLeft).length, 3);
assert.equal(eithers.filter(m.isLeft).reduce(function(p, c) {
  return c.fold(
    product(p), zero
  );
}, 1), 6);

assert.equal(eithers.filter(m.isRight).length, 2);
assert.equal(eithers.filter(m.isRight).reduce(function(p, c) {
  return c.fold(
    zero, product(p)
  );
}, 1), 20);
