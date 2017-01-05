Assert.describe("Objects", function() {
  Assert.objectsEqual({a: 1}, {a: 1}, "it should pass since two objects are equal");
  Assert.objectsEqual({a: 1}, {b: [1, 2]}, "it should fail since two objects are not equal");
});

Assert.describe("Arrays", function() {
  Assert.arraysEqual([1, 2], [1, 2], "it should pass since two arrays are equal");
  Assert.arraysEqual([1, 2], [2, 1], "it should fail since two arrays are not equal");
});

Assert.describe("Assertions", function() {
  Assert.equal(1, 1, "it should pass since arguments are equal");
  Assert.equal(1, 2, "it should fail since arguments are not equal");
  Assert.isTrue("hello", "it should pass because 'hello' is truthy value");
  Assert.isFalse("", "it should pass because empty string is falsy value");
});

Assert.describe("Range", function() {
  Assert.withinRange(10, 20, 15, "it should pass since 15 is between 10 and 20");
  Assert.withinRange(10, 20, 21, "it should fail since 21 is not between 10 and 20");
});

Assert.describe("Nodes", function() {
  var h1 = document.createElement("h1");
  var h1Too = document.createElement("h1");
  Assert.nodesEqual(h1, h1Too, "it should pass since both nodes are empty H1's");
});

Assert.run("#container");
