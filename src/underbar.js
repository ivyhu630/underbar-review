(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element. [1 , 2, 3, 4] , 4 ==> [1, 2, 3, 4]
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    return n === undefined ? array[array.length - 1] : array.slice(-n); // array.slice(0) --> copy entire
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for ( var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) { // test = function
    // creat a return array[]
    // check null input for collection at the beginning, return result(which is []) if true
    // for loop
    // if test: push element
    // return result

    // (test) ? output true: output false;
    var result = [];


    for (var i = 0; i < collection.length; i++) {
      if (test(collection[i])) {

        // console.log(collection[i]);
        // console.log(test(collection[i]));
        // console.log('test', test);
        result.push(collection[i]);//
      }
    }

    return result;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
    // create a non-result list using filter
    var nonresult = _.filter(collection, test);
    // loop through each collection element
    for (var i = 0; i < collection.length; i++) {
      if (!nonresult.includes(collection[i])) {
        result.push(collection[i]);
      }
    }
    // for each collection element if it's in the non-result array then skip the element otherwise add it to result array
    // check element in array: testArray.includes(element)
    // subtract result of filter from collection


    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // initiate result array
    var result = [];
    // create an object: seen keeping track of element count
    var countobject = {};
    for (var i = 0; i < array.length; i++) {
      var count = 1;
      if (countobject[array[i]] === undefined) {
        countobject[array[i]] = count;
      } else {
        countobject[array[i]]++;
      }
    }

    // result is all key: Object.keys(nameForObject) -- this output to an array

    for (var key in countobject) {
      // IF （iterator(element)) {push}

      // if iterator is undefined - push all key
      // else test iterator is true then push
      if (iterator === undefined) {
        result.push(Number(key));
      } else {
        if (iterator(Number(key))) { // number should be right before key
          result.push(Number(key)); // need to convert to num
        }
      }
    }

    // loop through the result array and convert each element to be a number instead of strin
    return result;


  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    //  initiate result array
    var result = [];
    // for loop apply iterator for each element
    for (var i = 0; i < collection.length; i++) {
      result.push(iterator(collection[i]));
    }
    // return array
    return result;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {


    var result;
    if (accumulator === undefined) {
      // check to see accumulator is given
      // if given then accumulator is the given accumulator
      // otherwise accumulator is first element of the collection
      accumulator = collection[0];
      // do a for loop but start from second element
      for (var i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }

    }

    // loop through the collection pass each element to iterator then add to result(no need to specify a type, the "+=" works for both number and string)
    // put below into else
    else {
      for (var i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]); //  replate accumulator with the result of the iterator}
      }
    }


    return accumulator;

  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!


    if (!Array.isArray(collection) ) {
        var convert = Object.values(collection);

      } else {
        convert = collection;
      }

      return _.reduce(convert, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
      return item === target;
    }, false);



      // approach 2:
    // var res = false;
    // if (Array.isArray(collection) ) {
    //   return _.reduce(collection, function(wasFound, item) {
    //     if (wasFound) {
    //       return true;
    //     }
    //   return item === target;
    // }, false);
    // } else {
    //   _.each(collection, function(value, key, collection) {
    //     if (value === target) {
    //       res = true;
    //     }
    //   })
    // }
    // return res;

  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(trueSoFar, item) {  // Alternatively instead of using Boolean() can add !! to convert truthy value as strickly true
      // if find one false foundFalse becomes false
      if (iterator === undefined) {  // checking iterator can use iterator = iterator || _.identity to see iterator as _.identity
        return trueSoFar && Boolean(item);
      } else {
        return trueSoFar && Boolean(iterator(item));
      }
    }, true);
  }




  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(element) {
      return !iterator(element);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;

    // w/o using hof
    // var res = arguments[0];
    // var n = arguments.length;
    // function add(original,addOn) {
    //   for (var key in addOn) {
    //     original[key] = addOn[key];
    //   }
    //   return original;
    // }

    // for (var i = 0; i < n; i++) {
    //   if( i == 0) {
    //     continue;
    //   }
    //   add(res,arguments[i]);
    // }
    // return res;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var seen = {};
    return function() {
      var key = JSON.stringify(arguments);
      if (!seen.hasOwnProperty(key)) {

        seen[key] = func.apply(this, arguments);

      }
      return seen[key];

    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var res = array.slice();
    var size = res.length;
    for (let i = size - 1; i > 0; i--) {
      var newIndex = Math.floor(Math.random() * (i + 1));
      var temp = res[i];
      res[i] = res[newIndex];
      res[newIndex] = temp;
    }
    return res;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
