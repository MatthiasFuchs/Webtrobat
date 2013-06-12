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

var xml_string = "loading ..."; 
var url_string = "http://webtrobat.site90.com/projects/project1.xml";

function saveurl(url)
{
    url_string = url;
}

$(document).on('pageinit', '#continue', function(){
  xml_string = "loading ..."; 
  Utils.getRemoteContent(url_string, function(result, url) {
 
  xml_string = result;

  var programNode = new ProgramNode();
  var rootElem = Utils.getRootElement(xml_string);
  programNode.load(rootElem);
  
  var headerNode = programNode.getHeader();
  var projectName = headerNode.programName;
  var viewCreator = new ProgramViewCreator(programNode);
  var html_result = viewCreator.createView();
  
  $("#continue_current_project").html(projectName);
  $("#continue div:jqmData(role=content)").html(html_result);
  $('div[data-role=collapsible]').collapsible({refresh:true});
  });
});

$(document).on('pagebeforeshow', '#continue', function(){
  if (xml_string == "loading ...")
  {
    $("#continue_current_project").html(xml_string);
    $("#continue div:jqmData(role=content)").html("<h1>loading ...</h1>");
  }
});

$(document).on('pageinit', '#programs', function(){
    Utils.getProjectURIs("http://webtrobat.site90.com/projects/", function(list){
        for (var i = 0; i < list.length; i++)
        { 
          Utils.getRemoteContent(list[i], function(xml_string, url){
             var programNode = new ProgramNode();
             var rootElem = Utils.getRootElement(xml_string);
             programNode.load(rootElem);
             var viewCreator = new ProgramOverViewCreator(programNode, url);
             var result = viewCreator.createView();
             
             $(document).ready(function()
             {   
                $("#programs div:jqmData(role=content)").append(result).trigger("create");
                $('div[data-role=collapsible]').collapsible(
                {
                  refresh : true
                });
             });
        });
        }   
    });      
  });