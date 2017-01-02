describe("Objects", function() {
  assertObjectsEqual({a: 1}, {a: 1}, "it should pass since two objects are equal");
  assertObjectsEqual({a: 1}, {b: [1, 2]}, "it should fail since two objects are not equal");
});

describe("Arrays", function() {
  assertArraysEqual([1, 2], [1, 2], "it should pass since two arrays are equal");
  assertArraysEqual([1, 2], [2, 1], "it should fail since two arrays are not equal");
});

describe("Assertions", function() {
  assertEqual(1, 1, "it should pass since arguments are equal");
  assertEqual(1, 2, "it should fail since arguments are not equal");
});

describe("Range", function() {
  assertWithinRange(10, 20, 15, "it should pass since 15 is between 10 and 20");
  assertWithinRange(10, 20, 21, "it should fail since 21 is not between 10 and 20");
});
