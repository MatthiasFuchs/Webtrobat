SimpleObjectsTest = TestCase("SimpleObjectsTest");

SimpleObjectsTest.prototype.testPrototype = function() {
	var name = "Hello World!";
	assertEquals(name, (new Project(name)).getName());
};