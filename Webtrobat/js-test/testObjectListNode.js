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

ObjectListNodeTest = TestCase("ObjectListNodeTest");

ObjectListNodeTest.prototype.testObjectListNode = function()
{
    var attr = new ObjectListNode();
    assertEquals("objectList", attr.name);
}

ObjectListNodeTest.prototype.testLoad = function()
{
    var xml_string =
"      <objectList>\
        <object/>\
        <object/>\
        <object/>\
      </objectList>";
    
    var objectList = new ObjectListNode();

    objectList.load(Utils.getRootElement(xml_string));
    
    assertEquals(3, objectList.getLength());
    assertEquals(3, objectList.getObjects().length);
}