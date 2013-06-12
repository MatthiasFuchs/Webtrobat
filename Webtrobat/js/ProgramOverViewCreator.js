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

function ProgramOverViewCreator(programObject, url)
{
    this.program = programObject;
    this.programName = programObject.getHeader().programName;
    this.description = programObject.getHeader().description;
    this.program.url = url;
}

ProgramOverViewCreator.prototype.createView = function()
{
    var html = 
    "<div data-role=\"collapsible-set\">" +
      "<div data-role=\"collapsible\" data-collapsed=\"false\">" +
        "<h3>"+ this.programName +"</h3>" +
        "<div class=\"object_details\">" +
          "<ul>" +
            "<li>" +
              "Gr&ouml;&szlig;e: <span>50,00kb</span>" +
            "</li>" +
            "<li>" +
            "Beschreibung: <span>"+ this.description +"</span>" +
            "</li>" +
          "</ul>" +
        "</div>" +
        "<div class=\"ui-grid-a\">" +
          "<div class=\"ui-block-a\">" +
            "<a id=\""+ this.program.url +"\" onclick=\"saveurl('"+ this.program.url +"')\" data-role=\"button\" href=\"continue.html\" data-icon=\"arrow-d\"> &Ouml;ffnen </a>" +
          "</div>" +
          "<div class=\"ui-block-b\">" +
            "<a id=\"programs_button_project1_delete\" data-role=\"button\" href=\"error.html\" data-icon=\"delete\"> L&ouml;schen </a>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
    
    return html;
}

