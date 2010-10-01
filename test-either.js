var assert = require('assert'),
  m = require('./lib/monad');

var left = m.left('error');
var right = m.right('ok');

var identity = function(v) { return v; };

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
