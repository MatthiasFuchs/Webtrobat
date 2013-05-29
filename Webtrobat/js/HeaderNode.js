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
    var applicationBuildName = "";
    var applicationBuildNumber = "";
    var applicationName = "";
    var applicationVersion = "";
    var catrobatLanguageVersion = "";
    var dateTimeUpload = "";
    var description = "";
    var deviceName = "";
    var mediaLicense = "";
    var platform = "";
    var platformVersion = "";
    var programLicense = "";
    var programName = "";
    var programScreenshotManuallyTaken = "";
    var remixOf = "";
    var screenHeight = "";
    var screenWidth = "";
    var tags = "";
    var url = "";
    var userHandle = "";
}

HeaderNode.prototype = new BaseNode("header");

HeaderNode.prototype.load = function(dom_element)
{
    var child = null;
    
    child = dom_element.getChildElement("applicationBuildName");
    if (child)
        this.applicationBuildName = child.getText();
    
    child = dom_element.getChildElement("applicationBuildNumber");
    if (child)
        this.applicationBuildNumber = child.getText();
    
    child = dom_element.getChildElement("applicationName");
    if (child)
        this.applicationName = child.getText();
    
    child = dom_element.getChildElement("applicationVersion");
    if (child)
        this.applicationVersion = child.getText();
    
    child = dom_element.getChildElement("catrobatLanguageVersion");
    if (child)
        this.catrobatLanguageVersion = child.getText();
    
    child = dom_element.getChildElement("dateTimeUpload");
    if (child)
        this.dateTimeUpload = child.getText();
    
    child = dom_element.getChildElement("description");
    if (child)
        this.description = child.getText();
    
    child = dom_element.getChildElement("deviceName");
    if (child)
        this.deviceName = child.getText();
    
    child = dom_element.getChildElement("mediaLicense");
    if (child)
        this.mediaLicense = child.getText();
    
    child = dom_element.getChildElement("platform");
    if (child)
        this.platform = child.getText();
    
    child = dom_element.getChildElement("platformVersion");
    if (child)
        this.platformVersion = child.getText();
    
    child = dom_element.getChildElement("programLicense");
    if (child)
        this.programLicense = child.getText();
    
    child = dom_element.getChildElement("programName");
    if (child)
        this.programName = child.getText();
    
    child = dom_element.getChildElement("programScreenshotManuallyTaken");
    if (child)
        this.programScreenshotManuallyTaken = child.getText();
    
    child = dom_element.getChildElement("remixOf");
    if (child)
        this.remixOf = child.getText();
    
    child = dom_element.getChildElement("screenHeight");
    if (child)
        this.screenHeight = child.getText();
    
    child = dom_element.getChildElement("screenWidth");
    if (child)
        this.screenWidth = child.getText();
    
    child = dom_element.getChildElement("tags");
    if (child)
        this.tags = child.getText();
    
    child = dom_element.getChildElement("url");
    if (child)
        this.url = child.getText();
    
    child = dom_element.getChildElement("userHandle");
    if (child)
        this.userHandle = child.getText();
}
