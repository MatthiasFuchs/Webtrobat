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

TextNodeTest = TestCase("TextNode");

TextNodeTest.prototype.testTextNode = function()
{
	var attr = new TextNode("my_xml_name");
	assertEquals("my_xml_name", attr.name);
	assertEquals(null, attr.value);
	
	attr.value = "Hello";
	assertEquals("Hello", attr.value)
}

TextNodeTest.prototype.testLoad = function()
{
	var xml_name = "xml_name";
	var xml_value = "Hello";
	var xml_string = "<" + xml_name + ">" + xml_value + "</" + xml_name + ">";
	
	var parser = new marknote.Parser();
	var doc = parser.parse(xml_string);
	
	var attr = new TextNode("my_xml_name");
	attr.load(doc.getRootElement());
	
	assertEquals(xml_value, attr.value);
}