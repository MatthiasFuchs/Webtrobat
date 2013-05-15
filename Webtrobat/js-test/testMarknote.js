////////////////////////////////////////////////////////////////////////////
//    Copyright Webtrobat Team 2013
//    This file is part of Webtrobat.
//
//    Webtrobat is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    Webtrobat is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with Webtrobat.  If not, see <http://www.gnu.org/licenses/>.
//////////////////////////////////////////////////////////////////////////

 MarknoteTest = TestCase("MarknoteTest");
 
function checkChild(child, name_value)
 {
	 assertEquals("child", child.getName());
	 
	 var name_element = child.getChildElements()[0];
	 assertEquals("name", name_element.getName());
	 
	 assertEquals(name_value, name_element.getText());
 }
 
 MarknoteTest.prototype.testRead = function()
 {
	var xml_string =
"<parent><child><name>one</name></child>\
		 <child><name>two</name></child>\
</parent>";
	
	var parser = new marknote.Parser();
	var doc = parser.parse(xml_string);
	
	var parent_element = doc.getRootElement();
	assertEquals("parent", parent_element.getName());
	
	var children = parent_element.getChildElements();
	assertEquals(2, children.length);
	
	checkChild(children[0], "one");
	checkChild(children[1], "two");
 }