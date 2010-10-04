var assert = require('assert'),
  m = require('./lib/monad');

var post = { title: 'javascript', author: { firstName: 'chris' } };

assert.equal(m.soak(post, 'title').getOr('fail'), 'javascript');
assert.equal(m.soak(post, 'author.firstName').getOr('fail'), 'chris');
assert.equal(m.soak(post, 'author.firstName.foo').getOr('fail'), 'fail');
assert.equal(m.soak(post, 'foo.bar').getOr('fail'), 'fail');
