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

HeaderNodeTest = TestCase("HeaderNodeTest");

HeaderNodeTest.prototype.testHeaderNode = function()
{
    var headerNode = new HeaderNode();
    assertEquals("header", headerNode.name);
}

HeaderNodeTest.prototype.testLoad = function()
{
    var xml_string =
    "<header>\
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
      </header>";

    var headerNode = new HeaderNode();
    headerNode.load(Utils.getRootElement(xml_string));

    assertEquals("", headerNode.applicationBuildName);
    assertEquals("0", headerNode.applicationBuildNumber);
    assertEquals("Catroid", headerNode.applicationName);
    assertEquals("0.7.0beta-1501-debug", headerNode.applicationVersion);
    assertEquals("0.6", headerNode.catrobatLanguageVersion);
    assertEquals("", headerNode.dateTimeUpload);
    assertEquals("", headerNode.description);
    assertEquals("GT-I9300", headerNode.deviceName);
    assertEquals("", headerNode.mediaLicense);
    assertEquals("Android", headerNode.platform);
    assertEquals("17", headerNode.platformVersion);
    assertEquals("", headerNode.programLicense);
    assertEquals("Mein erstes Projekt", headerNode.programName);
    assertEquals("false", headerNode.programScreenshotManuallyTaken);
    assertEquals("", headerNode.remixOf);
    assertEquals("1280", headerNode.screenHeight);
    assertEquals("720", headerNode.screenWidth);
    assertEquals("", headerNode.tags);
    assertEquals("", headerNode.url);
    assertEquals("", headerNode.userHandle);
}
