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

function ProgramNode()
{
    this.header = new HeaderNode();
    this.objectList = new ObjectListNode();
}

ProgramNode.prototype = new BaseNode("program");


ProgramNode.prototype.retrieveNumberOfElement = function(dom_element,
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

ProgramNode.prototype.load = function(dom_element)
{
    Utils.loadChild(this.header, dom_element);
    Utils.loadChild(this.objectList, dom_element);
}

ProgramNode.prototype.getObjectList = function()
{
    return this.objectList;
}

ProgramNode.prototype.getHeader = function()
{
    return this.header;
}