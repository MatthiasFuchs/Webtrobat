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

function LookListNode()
{
	this.list = [];
}

LookListNode.prototype = new BaseNode("lookList");

LookListNode.prototype.load = function(dom_element)
{
	this.list = [];

	var children = dom_element.getChildElements((new LookNode()).name);
	for (var i = 0; i < children.length; i++)
	{
		var lookNode = new LookNode();
		lookNode.load(children[i]);
		this.list.push(lookNode);
	}
}
