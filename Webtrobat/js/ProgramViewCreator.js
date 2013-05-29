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

function ProgramViewCreator(programObject)
{
    this.program = programObject;
    this.objectList = this.program.getObjectList();
}

ProgramViewCreator.prototype.createView = function()
{
    var html = this.createBackgroundView();
    html += this.createObjectsView();
    
    return html;
}

ProgramViewCreator.prototype.createBackgroundView = function()
{
    var result = this.createBackgroundHeader();
    result += this.createObjectButton(this.getBackground());
    
    return result;
}

ProgramViewCreator.prototype.getBackground = function()
{
    return this.objectList.getObjects()[0];
}

ProgramViewCreator.prototype.createBackgroundHeader = function()
{
    return "<h1>Hintergrund</h1>\n";
}

ProgramViewCreator.prototype.createObjectButton = function(object)
{
    return "<p>" +
           object.getDisplayName() +
           " Looks: " + object.getNumberOfLooks() +
           " Scripts: " + object.getNumberOfScripts() +
           " Sounds: " + object.getNumberOfSounds() +
           "</p>\n";
}

ProgramViewCreator.prototype.createObjectsView = function()
{
    var html = this.createObjectsHeader();
    var objects = this.objectList.getObjects();
    for (var i = 1; i < objects.length; i++)
    {
        html += this.createObjectButton(objects[i]);
    }
    
    return html;
}

ProgramViewCreator.prototype.createObjectsHeader = function()
{
    return "<h1>Objekete</h1>\n";
}
