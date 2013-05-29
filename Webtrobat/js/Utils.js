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

function Utils()
{
}

Utils.getRootElement = function(xml_string)
{
    var parser = new marknote.Parser();
    var doc = parser.parse(xml_string);

    return doc.getRootElement();
}

Utils.loadChild = function(node, dom_element)
{
    var child = dom_element.getChildElement(node.name);
    if (child)
    {
        node.load(child);
    }
}

Utils.loadChildrenList = function(Type, dom_element)
{
    var list = [];

    var children = dom_element.getChildElements((new Type()).name);
    if (children)
    {
        for (var i = 0; i < children.length; i++)
        {
            var lookNode = new Type();
            lookNode.load(children[i]);
            list.push(lookNode);
        }
    }

    return list;
}