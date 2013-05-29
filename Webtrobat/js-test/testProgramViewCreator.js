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

ProgramViewCreatorTest = TestCase("ProgramViewCreatorTest");

ProgramViewCreatorTest.prototype.testProgramViewCreator = function()
{
    var objectNode = new ProgramViewCreator();
    assertNotEquals(null, objectNode);
}

ProgramViewCreatorTest.prototype.testCreateBackgroundView = function()
{
    var xml_string =
"  <objectList>\
    <object>\
      <lookList>\
        <look>\
          <fileName>file1</fileName>\
          <name>look1</name>\
        </look>\
      </lookList>\
      <name>Object1</name>\
      <scriptList>\
        <startScript/>\
        <whenScript/>\
      </scriptList>\
      <soundList>\
        <sound/>\
        <sound/>\
        <sound/>\
      </soundList>\
     </object>\
   </objectList>";
    
    var objectList = new ObjectListNode();
    objectList.load(Utils.getRootElement(xml_string));
    
    var viewCreator = new ProgramViewCreator();
    var result = viewCreator.createBackgroundView(objectList);
    assertEquals("<h1>Hintergrund</h1>\n<p>Object1 Looks: 1 Scripts: 2 Sounds: 3</p>\n", result);
}