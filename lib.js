(function(global) {
  
  function errorMessage(actual, expected, testName) {
    return "FAIL [" + testName + "] Expected [" + expected + "], instead got [" + actual + "]";
  }

  function rangeErrorMessage(start, end, actual, testName) {
    return "FAIL [" + testName + "] [" + actual + "] is not within range [" + start + "] to [" + end + "]";
  }

  function passMessage(testName) {
    return "Passed [" + testName + "]";
  }

  function assertEqual(actual, expected, testName) {
    var fail = errorMessage(actual, expected, testName);
    var pass = passMessage(testName);
    console.log(actual === expected ? pass : fail);
  }

  function assertArraysEqual(actual, expected, testName) {
    var fail = errorMessage(actual, expected, testName);
    var pass = passMessage(testName);

    var areEqual = actual.length === expected.length ? 
      actual.every(function(item, i) {
        return item === expected[i];
      }) : false;

    console.log(areEqual ? pass : fail);
  }

  function assertObjectsEqual(actual, expected, testName) {
    var fail = errorMessage(
        JSON.stringify(actual), 
        JSON.stringify(expected), 
        testName
    );
    var pass = passMessage(testName);
    var areEqual;
    var error;

    try {
      areEqual = deepEqual(actual, expected);
    } catch (e) {
      error = e;
    }

    console.log(areEqual ? pass : fail);
    if(error) console.log("\t" + error);
  }

  function areObjects(obj1, obj2) {
    return (obj1 && obj2) && (typeof obj1 === "object" && typeof obj2 === "object");
  }
  
  function deepEqual(obj1, obj2) {
    var objOneKeys = Object.keys(obj1);
    var objTwoKeys = Object.keys(obj2);

    return areObjects(obj1, obj2) ?

      (objOneKeys.length === objTwoKeys.length) &&

      objOneKeys.reduce(function(isEqual, key) {
        return isEqual && deepEqual(obj1[key], obj2[key]);
      }, true) : (obj1 === obj2);
  }

  function assertWithinRange(start, end, actual, testName) {
    var fail = rangeErrorMessage(start, end, actual, testName);
    var pass = passMessage(testName);
    console.log(actual >= start && actual <= end ? pass : fail);
  }

  function describe(testSuite, cb) {
    console.log(testSuite + " >----------");
    cb();
    console.log("----------<");
  }

  global.describe = describe;
  global.assertEqual = assertEqual;
  global.assertArraysEqual = assertArraysEqual;
  global.assertWithinRange = assertWithinRange;
  global.assertObjectsEqual = assertObjectsEqual;

})(window);