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

function ObjectNode()
{
    this.nameNode = new NameNode();
    this.lookList = new LookListNode();
    this.numberOfScripts = 0;
    this.numberOfSounds = 0;
}

ObjectNode.prototype = new BaseNode("object");

ObjectNode.prototype.getDisplayName = function()
{
    return this.nameNode.getText();
}

ObjectNode.prototype.retrieveNumberOfElement = function(dom_element,
        elementName)
{
    var elementList = dom_element.getChildElement(elementName);
    if (elementList)
    {
        var elements = elementList.getChildElements();
        return elements.length;
    }

    return 0;
}

ObjectNode.prototype.load = function(dom_element)
{
    Utils.loadChild(this.nameNode, dom_element);
    Utils.loadChild(this.lookList, dom_element);

    this.numberOfScripts = this.retrieveNumberOfElement(dom_element,
            "scriptList");
    this.numberOfSounds = this
            .retrieveNumberOfElement(dom_element, "soundList");
}

ObjectNode.prototype.getNumberOfLooks = function()
{
    return this.lookList.getLength();
}

ObjectNode.prototype.getNumberOfScripts = function()
{
    return this.numberOfScripts;
}

ObjectNode.prototype.getNumberOfSounds = function()
{
    return this.numberOfSounds;
}
