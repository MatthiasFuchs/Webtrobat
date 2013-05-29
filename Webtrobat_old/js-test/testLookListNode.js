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

LookListNodeTest = TestCase("LookListNodeTest");

LookListNodeTest.prototype.testLookListNode = function()
{
    var attr = new LookListNode();
    assertEquals("lookList", attr.name);
}

LookListNodeTest.prototype.testLoad = function()
{
    var xml_string =
"      <lookList>\
        <look>\
          <fileName>file1</fileName>\
          <name>name1</name>\
        </look>\
        <look>\
          <fileName>file2</fileName>\
          <name>name2</name>\
        </look>\
      </lookList>";

    var lookList = new LookListNode();
    assertEquals(0, lookList.getLength());

    lookList.load(Utils.getRootElement(xml_string));

    assertEquals(2, lookList.getLength());

    assertEquals("file2", lookList.list[1].getFileName());
}