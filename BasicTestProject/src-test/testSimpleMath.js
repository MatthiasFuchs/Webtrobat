SimpleMathTest = TestCase("SimpleMathTest::add");

SimpleMathTest.prototype.testAdd = function() {
  assertEquals(3, add(2,1));
};
