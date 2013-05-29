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

function HeaderNode()
{
    this.applicationBuildName = "";
    this.applicationBuildNumber = "";
    this.applicationName = "";
    this.applicationVersion = "";
    this.catrobatLanguageVersion = "";
    this.dateTimeUpload = "";
    this.description = "";
    this.deviceName = "";
    this.mediaLicense = "";
    this.platform = "";
    this.platformVersion = "";
    this.programLicense = "";
    this.programName = "";
    this.programScreenshotManuallyTaken = "";
    this.remixOf = "";
    this.screenHeight = "";
    this.screenWidth = "";
    this.tags = "";
    this.url = "";
    this.userHandle = "";
}

HeaderNode.prototype = new BaseNode("header");

function getChildText(dom_element, name)
{
    var child = null;
    child = dom_element.getChildElement(name);
    if (child)
        return child.getText();
    else
        return "";
}

HeaderNode.prototype.load = function(dom_element)
{
    this.applicationBuildName = getChildText(dom_element, "applicationBuildName");
    this.applicationBuildNumber = getChildText(dom_element, "applicationBuildNumber");
    this.applicationName = getChildText(dom_element, "applicationName");
    this.applicationVersion = getChildText(dom_element, "applicationVersion");
    this.catrobatLanguageVersion = getChildText(dom_element, "catrobatLanguageVersion");
    this.dateTimeUpload = getChildText(dom_element, "dateTimeUpload");
    this.description = getChildText(dom_element, "description");
    this.deviceName = getChildText(dom_element, "deviceName");
    this.mediaLicense = getChildText(dom_element, "mediaLicense");
    this.platform = getChildText(dom_element, "platform");
    this.platformVersion = getChildText(dom_element, "platformVersion");
    this.programLicense = getChildText(dom_element, "programLicense");
    this.programName = getChildText(dom_element, "programName");
    this.programScreenshotManuallyTaken = getChildText(dom_element, "programScreenshotManuallyTaken");
    this.remixOf = getChildText(dom_element, "remixOf");
    this.screenHeight = getChildText(dom_element, "screenHeight");
    this.screenWidth = getChildText(dom_element, "screenWidth");
    this.tags = getChildText(dom_element, "tags");
    this.url = getChildText(dom_element, "url");
    this.userHandle = getChildText(dom_element, "userHandle");
}
