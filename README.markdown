
monad.js provdes simple monadic data types for NodeJS (or any CommonJS implementation).

## Maybe

Maybe reprents a value that may or may not be present. This is natural when
a value, or the result of a function, may or may not result in something meaningful.
Traditionally, null or undefined is used for such cases, but these are
ticking time bombs.

Example usage:

    var monad = require('./monad');
    
    var maybe = monad.maybe(1); // Results in a Just(1) instance.
    var value = maybe.map(function(v) {
      return v + 3;
    }).getOr(0); // Get the contained value, or 0 if this were a Nothing.
    
The maybe constructor yields a Just instance if the argument is non-null.

    var maybe = monad.maybe(null);
    
Here, maybe will be Nothing, and so mapping/binding will result in Nothing.

    var value = maybe.map(function(v) {
      return v + 3;
    }).getOr(20);
    
Because maybe is Nothing, value will contain the default value 20.

## Either

Either is similar to Maybe, but represents one of two possible outcomes.
A natural use for this is a function that may return a real value, or
otherwise throw an exception. Unlike Maybe, Either can contain the reason
for failure. Consider a function that may throw an exception:

    function dangerous(s) {
      return s.length;
    }
    var len = dangerous(null);

If you call this function with a null argument, an exception will be thrown.
The eitherEx constructor conveniently turns a function into one that
results in an Either:

    var safe = monad.eitherEx(dangerous);
    var len = safe(null);
    
No exception is thrown here. Instead, len is an instance of the Either monad
Right, which generally represents a successful result. To decompose
an Either, use fold, providing the behavior for a success scenario and
a failure scenario:
    
    var length = len.fold(
      function(error) {
        console.log('Failed: ' + error);
        return 0; // return a default
      },
      function(length) {
        return length;
      }
    );

You'll probably find that the functions you pass to fold are generic and
reusable. In such cases, avoid ad-hoc functions because they are noisy.
