var assert = require('assert'),
  m = require('./lib/monad');

var nothing = m.maybe(null);
var justOne = m.maybe(1);

/* Nothing */
assert.equal(nothing.bind(function(v) {
  return m.maybe(1);
}), m.Nothing);

assert.equal(nothing.map(function(v) {
  return 1;
}), m.Nothing);

assert.equal(nothing.get(5), 5);

/* Just */
assert.equal(justOne.bind(function(v) {
  return m.maybe(v * 5);
}).get(20), 5);

assert.equal(justOne.map(function(v) {
  return v * 5;
}).get(20), 5);

assert.equal(justOne.get(5), 1);

/* ex monad constructor */
var epicFail = function() { throw 'java'; }
assert.throws(epicFail);
assert.equal(m.ex(epicFail)(), m.Nothing);

var identity = function(v) { return v; };
assert.equal(m.ex(identity)(5).map(identity).get(1), 5);
