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

ProgramNodeTest = TestCase("ProgramNodeTest");

ProgramNodeTest.prototype.testProgramNode = function()
{
    var programNode = new ProgramNode();
    assertEquals("", programNode.header.programName);
}

ProgramNodeTest.prototype.testLoad = function()
{
    var xml_string =
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>\
    <program>\
      <header>\
        <applicationBuildName></applicationBuildName>\
        <applicationBuildNumber>0</applicationBuildNumber>\
        <applicationName>Catroid</applicationName>\
        <applicationVersion>0.7.0beta-1501-debug</applicationVersion>\
        <catrobatLanguageVersion>0.6</catrobatLanguageVersion>\
        <dateTimeUpload></dateTimeUpload>\
        <description></description>\
        <deviceName>GT-I9300</deviceName>\
        <mediaLicense></mediaLicense>\
        <platform>Android</platform>\
        <platformVersion>17</platformVersion>\
        <programLicense></programLicense>\
        <programName>Mein erstes Projekt</programName>\
        <programScreenshotManuallyTaken>false</programScreenshotManuallyTaken>\
        <remixOf></remixOf>\
        <screenHeight>1280</screenHeight>\
        <screenWidth>720</screenWidth>\
        <tags></tags>\
        <url></url>\
        <userHandle></userHandle>\
      </header>\
      <objectList>\
        <object>\
          <lookList>\
            <look>\
              <fileName>22BB0986F3B0349F08136AFB037C7F4A_Hintergrund</fileName>\
              <name>Hintergrund</name>\
            </look>\
            <look>\
              <fileName>8F48181C163AECCD3464CFA5D9AA1F6F_IMG_20130417_111103.jpg</fileName>\
              <name>IMG_20130417_111103</name>\
            </look>\
          </lookList>\
          <name>Hintergrund</name>\
          <scriptList>\
            <startScript>\
              <brickList>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look[2]\"/>\
                </setLookBrick>\
              </brickList>\
              <object reference=\"../../..\"/>\
            </startScript>\
            <whenScript>\
              <brickList>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look\"/>\
                </setLookBrick>\
              </brickList>\
              <object reference=\"../../..\"/>\
              <action>Tapped</action>\
            </whenScript>\
          </scriptList>\
          <soundList/>\
        </object>\
        <object>\
          <lookList>\
            <look>\
              <fileName>CFD7234CABB050900E7098F070077A1A_Katze normal</fileName>\
              <name>Katze normal</name>\
            </look>\
            <look>\
              <fileName>8380419464693D8BF38323918FD9AE23_Banzai-Katze</fileName>\
              <name>Banzai-Katze</name>\
            </look>\
            <look>\
              <fileName>A680E9D62D48B0EC6A092D7A1E35769E_Grinsekatze</fileName>\
              <name>Grinsekatze</name>\
            </look>\
          </lookList>\
          <name>Catroid</name>\
          <scriptList>\
            <startScript>\
              <brickList>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look\"/>\
                </setLookBrick>\
              </brickList>\
              <object reference=\"../../..\"/>\
            </startScript>\
            <whenScript>\
              <brickList>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look[2]\"/>\
                </setLookBrick>\
                <waitBrick>\
                  <object reference=\"../../../../..\"/>\
                  <timeToWaitInSeconds>\
                    <formulaTree>\
                      <type>NUMBER</type>\
                      <value>0.5</value>\
                    </formulaTree>\
                  </timeToWaitInSeconds>\
                </waitBrick>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look[3]\"/>\
                </setLookBrick>\
                <waitBrick>\
                  <object reference=\"../../../../..\"/>\
                  <timeToWaitInSeconds>\
                    <formulaTree>\
                      <type>NUMBER</type>\
                      <value>0.5</value>\
                    </formulaTree>\
                  </timeToWaitInSeconds>\
                </waitBrick>\
                <setLookBrick>\
                  <object reference=\"../../../../..\"/>\
                  <look reference=\"../../../../../lookList/look\"/>\
                </setLookBrick>\
              </brickList>\
              <object reference=\"../../..\"/>\
              <action>Tapped</action>\
            </whenScript>\
          </scriptList>\
          <soundList/>\
        </object>\
        <object>\
          <lookList/>\
          <name>ko</name>\
          <scriptList/>\
          <soundList/>\
        </object>\
      </objectList>\
      <variables>\
        <objectVariableList>\
          <entry>\
            <object reference=\"../../../../objectList/object[3]\"/>\
            <list/>\
          </entry>\
        </objectVariableList>\
        <programVariableList/>\
      </variables>\
    </program>";

    var programNode = new ProgramNode();
    programNode.load(Utils.getRootElement(xml_string));

    assertEquals("Mein erstes Projekt", programNode.header.programName);
    assertEquals("3", programNode.objectList.getLength());
}
