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
            var object = new Type();
            object.load(children[i]);
            list.push(object);
        }
    }

    return list;
}

Utils.getRemoteContent = function(url, callback) {
    
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    
    function onError(e) {
        console.log('Error', e);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    
    /*
    xhr.onload = function() {
        //alert(xhr.response);
        callback(xhr.response);
    };
    */
    
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
          {
            callback(xhr.response);
          }
    }
    
    xhr.send();
}

Utils.getProjects = function(url, callback) {
    var tmp = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 3.2 Final//EN\">" +
"<html>"+
 "<head>"+
  "<title>Index of /projects</title>"+
 "</head>"+
 "<body>"+
"<h1>Index of /projects</h1>"+
"<ul><li><a href="/"> Parent Directory</a></li>"+
"<li><a href=\"project1.xml\"> project1.xml</a></li>"+
"<li><a href=\"project2.xml\"> project2.xml</a></li>"+
"</ul>"+
"</body></html>";
    
    var tmp1 = "Auf der Mauer, auf der Lauer sitzt 'ne kleine Wanze.";
    Utils.getRemoteContent(url, function(result) {
        alert("1");
        var regex = new RegExp("<a href=\"[^\"]+\"> (\w*\.xml)<");
        alert("2");
        //var regex = /> (.*.xml)/;
        var matches = regex.exec(tmp);
        //while(matches = regex.exec(tmp)) {
        //    alert(matches);
        //}
        alert(matches.length);
        alert(matches);
        callback("");
    });
}