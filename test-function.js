var assert = require('assert'),
  f = require('./lib/function');

function add1(i) {
  return i + 1;
}

function times2(i) {
  return i * 2;
}

var FoG = f.compose(add1, times2);
var GoF = f.compose(times2, add1);

assert.equal(FoG(2), 6);
assert.equal(GoF(2), 5);
