(function(global) {

  var testStack = [];

  function errorMessage(actual, expected, testName) {
    return `${testName} ] Expected [ ${expected} ], instead got [ ${actual} ]`;
  }

  function rangeErrorMessage(start, end, actual, testName) {
    return `${testName} [ ${actual} ] is not within range [ ${start} ] to [ ${end} ]`;
  }

  function passMessage(testName) {
    return `${testName}`;
  }

  function areArrays(arr1, arr2) {
    return Array.isArray(arr1) && Array.isArray(arr2);
  }
  
  function areArraysSameLength(arr1, arr2) {
    return arr1.length === arr2.length;
  }

  function areObjects(obj1, obj2) {
    return (obj1 && obj2) && (typeof obj1 === "object" && typeof obj2 === "object");
  }

  function addTest(testVal, passMessage, failMessage) {
    testStack.push({
      className: testVal ? "true" : "false",
      testName: testVal ? passMessage : failMessage
    });
  }
  
  function logToConsole(result, pass, fail) {
    var message = result ? "Passed: " + pass : "Failed: " + fail;
    console[result ? "info" : "error"](message);
  }

  function is(val, actual, testName) {
    var pass = passMessage(testName);
    var fail = testName;
    var result = !!actual === val;
    
    addTest(result, pass, fail);
    logToConsole(result, pass, fail);
  }

  function isTrue(actual, testName) {
    is(true, actual, testName);
  }

  function isFalse(actual, testName) {
    is(false, actual, testName);
  }

  function it(testName, cb) {
    console.log(testName);
    cb();
  }
 
  function assertEqual(actual, expected, testName) {
    var fail = errorMessage(actual, expected, testName);
    var pass = passMessage(testName);
    var result = actual === expected;

    addTest(result, pass, fail);

    logToConsole(result, pass, fail);
  }

  function assertArraysEqual(actual, expected, testName) {
    var fail = errorMessage(actual, expected, testName);
    var pass = passMessage(testName);

    var areEqual = areArrays(actual, expected) && 
      areArraysSameLength(actual, expected) ? 
      actual.every(function(item, i) {
        return item === expected[i];
      }) : false;
    
    addTest(areEqual, pass, fail);
    logToConsole(areEqual, pass, fail);
  }

  
  function deepEqual(obj1, obj2) {
    var objOneKeys = Object.keys(obj1);
    var objTwoKeys = Object.keys(obj2);

    return areObjects(obj1, obj2) ?
      areArraysSameLength(objOneKeys, objTwoKeys) &&
      objOneKeys.reduce(function(isEqual, key) {
        return isEqual && deepEqual(obj1[key], obj2[key]);
      }, true) : (obj1 === obj2);
  }  
  
  function assertObjectsEqual(actual, expected, testName) {
    var fail = errorMessage(JSON.stringify(actual), JSON.stringify(expected), testName);
    var pass = passMessage(testName);
    var areEqual, error;

    try {
      areEqual = deepEqual(actual, expected);
    } catch (e) {
      error = e;
    }
     
    addTest(areEqual, pass, fail);
    logToConsole(areEqual, pass, fail);
    if(error) console.log("\t" + error);
  }

  function assertWithinRange(start, end, actual, testName) {
    var fail = rangeErrorMessage(start, end, actual, testName);
    var pass = passMessage(testName);
    var result = actual >= start && actual <= end;
    addTest(result, pass, fail);
    logToConsole(result, pass, fail);
  }

  function describe(testSuite, cb) {
    console.log(testSuite + " >----------");
    cb();
    console.log("----------<");
  }

  function run(selector) {
    var result = "";
    var el = document.querySelector(selector);

    testStack.forEach(item => {
      result += "<li class=\"" + item.className + "\">" + item.testName + "</li>";
    });
    
    if(el) {
      el.innerHTML = result;
    } else {
      document.body.innerHTML = "There is no DOM with provided selector";
    }
  }

  global.Assert = {
    run: run,
    describe: describe,
    equal: assertEqual,
    isTrue: isTrue,
    isFalse: isFalse,
    arraysEqual: assertArraysEqual,
    withinRange: assertWithinRange,
    objectsEqual: assertObjectsEqual
  }

})(window);
