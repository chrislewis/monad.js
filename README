node-monad provdes a simple monad data type for NodeJS (or any CommonJS implementation).

    var monad = require('./monad');
    
    var maybe = monad.maybe(1); // Results in a Just(1) instance.
    var value = maybe.map(function(v) {
      return v + 3;
    }).get(0); // Get the contained value, or 0 if this were a Nothing.
    
The maybe constructor yields a Just instance if the argument is non-null.

    var maybe = monad.maybe(null);
    
Here, maybe will be Nothing, and so mapping/binding will result in Nothing.

    var value = maybe.map(function(v) {
      return v + 3;
    }).get(20);
    
Because maybe is Nothing, value will contain the default value 20.
