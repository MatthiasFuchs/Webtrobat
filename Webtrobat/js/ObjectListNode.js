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

function ObjectListNode()
{
    this.list = [];
}

ObjectListNode.prototype = new BaseNode("objectList");

ObjectListNode.prototype.load = function(dom_element)
{
    this.list = Utils.loadChildrenList(ObjectNode, dom_element);
}

ObjectListNode.prototype.getLength = function()
{
    return this.list.length;
}

ObjectListNode.prototype.getObjects = function()
{
    return this.list;
}
