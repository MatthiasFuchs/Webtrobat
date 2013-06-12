
/*
   marknote.js
   
   Minified copy of Marknote - for production use.
   For debugging in a tool such as Firebug, use the unminified copy, marknote-debug.js, instead.
   
   marknote version 0.5.1
   XML DOM/Parser API
   
   Usage:
   <script type="text/javascript" src="path/to/my/javascript/marknote.js"></script>
 
   ------------------------------------------------------------------------------------
 
   Copyright(c) 2011 jbulb.org. 
   http://jbulb.org

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. 
*/
marknote=function(){};marknote.constants={DOCTYPE_START:"<!DOCTYPE",CDATA_START:"<![CDATA[",CDATA_END:"]]>",COMMENT_START:"<!--",COMMENT_END:"-->",TAG_OPEN:"<",TAG_CLOSE:">",TAG_CLOSE_SELF_TERMINATING:"/>",ENDTAG_OPEN:"</",EQUALS:"=",SQUOTE:"'",DQUOTE:'"',PI_START:"<?",PI_END:"?>",BRACKET_OPEN:"[",BRACKET_CLOSE:"]",TOKENTYPE_BRACKET_OPEN:"bracketOpen",TOKENTYPE_TAG_OPEN:"tagOpen",TOKENTYPE_TAG_CLOSE:"tagClose",TOKENTYPE_ENDTAG_OPEN:"endTagOpen",TOKENTYPE_ENDTAG_CLOSE:"endTagClose",TOKENTYPE_SELF_TERMINATING:"closeTagSelfTerminating",TOKENTYPE_WHITESPACE:"whitespace",TOKENTYPE_ATTRIBUTE:"attribute",TOKENTYPE_QUOTE:"quote",TOKENTYPE_QUOTED:"quotedLiteral",TOKENTYPE_NORMAL:"normal",TOKENTYPE_COMMENT_START:"commentStart",TOKENTYPE_COMMENT_END:"commentEnd",TOKENTYPE_CDATA_START:"cdataStart",TOKENTYPE_CDATA_END:"cdataEnd",TOKENTYPE_PI_START:"piStart",TOKENTYPE_PI_END:"piEnd",TOKENTYPE_DOCTYPE_START:"docTypeStart",DATATYPE_ATTRIBUTE:"marknote.Attribute",DATATYPE_CDATA:"marknote.CDATA",DATATYPE_CLONER:"marknote.Cloner",DATATYPE_COMMENT:"marknote.Comment",DATATYPE_DOCTYPE:"marknote.DOCTYPE",DATATYPE_DOCUMENT:"marknote.Document",DATATYPE_ELEMENT:"marknote.Element",DATATYPE_ENTITYREF:"marknote.EntityRef",DATATYPE_XMLENTITYREFS:"marknote.XMLEntityRefs",DATATYPE_ENTITYREFS:"marknote.EntityRefs",DATATYPE_PARSER:"marknote.Parser",DATATYPE_PROCESSINGINSTRUCTION:"marknote.ProcessingInstruction",DATATYPE_QNAME:"marknote.QName",DATATYPE_TEXT:"marknote.Text",DATATYPE_TOKEN:"marknote.Token",DATATYPE_TOKENIZER:"marknote.Tokenizer",DATATYPE_WRITER:"marknote.Writer"};marknote.ajaxDoc=null;marknote.AJAX=function(){this.req=null;this.status=null;this.statusText=null;this.responseText=null};marknote.AJAX.prototype.genRequest=function(){var d=false;try{d=new XMLHttpRequest()}catch(c){try{d=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{d=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){d=false}}}this.req=d;return d};marknote.AJAX.prototype.getRequest=function(){return this.req};marknote.AJAX.prototype.getStatus=function(){return this.status};marknote.AJAX.prototype.getStatusText=function(){return this.statusText};marknote.AJAX.prototype.getResponseText=function(){return this.responseText};marknote.AJAX.prototype.constructQueryString=function(d){var c="";if(d&&typeof d=="object"){var a="";for(var b in d){c+=a+encodeURIComponent(b)+"="+encodeURIComponent(d[b]);a="&"}}else{if(d&&typeof d=="string"){c=d}}return c};marknote.AJAX.prototype.read=function(b,c,h,e,a){var f=this.genRequest();var i=this;var d=this.constructQueryString(c);var g;marknote.AJAXDoc=null;a=a&&a.toUpperCase()==="POST"?"POST":"GET";if(!f){return false}if(!h){h=marknote.AJAX.defaultCallback}if(!e){e=new Object()}f.open(a,b,true);f.setRequestHeader("Content-Type","application/x-www-form-urlencoded");f.onreadystatechange=function(){if(f.readyState==4){i.status=f.status;i.statusText=f.statusText;i.responseText=f.responseText;var j=new marknote.Parser();g=j.parse(f.responseText);h.call(i,g,e)}};f.send(d)};marknote.AJAX.prototype.defaultCallback=function(a,b){marknote.AJAXDoc=a};marknote.SJAX=function(){this.req=null;this.status=null;this.statusText=null;this.responseText=null};marknote.SJAX.prototype.getRequest=function(){return this.req};marknote.SJAX.prototype.getStatus=function(){return this.status};marknote.SJAX.prototype.getStatusText=function(){return this.statusText};marknote.SJAX.prototype.getResponseText=function(){return this.responseText};marknote.SJAX.prototype.read=function(a,e,g){var d=new marknote.AJAX();var b=d.genRequest();var c=d.constructQueryString(e);var f=new marknote.Parser();g=g&&g.toUpperCase()==="POST"?"POST":"GET";if(!b){return new marknote.Document()}b.open(g,a,false);b.setRequestHeader("Content-Type","application/x-www-form-urlencoded");b.send(c);this.req=b;this.status=b.status;this.statusText=b.statusText;this.responseText=b.responseText;return f.parse(b.responseText)};marknote.Attribute=function(a,b){this.dataType=marknote.constants.DATATYPE_ATTRIBUTE;this.isSw8tXmlContent=false;this.name=a;this.value=marknote.Util.erefEncode(marknote.Util.nothingToBlank(b))};marknote.Attribute.prototype.getName=function(){return this.name};marknote.Attribute.prototype.setName=function(a){this.name=a};marknote.Attribute.prototype.getValue=function(){return marknote.Util.erefDecode(marknote.Util.nothingToBlank(this.value))};marknote.Attribute.prototype.setValue=function(a){this.value=marknote.Util.erefEncode(marknote.Util.nothingToBlank(a))};marknote.Attribute.prototype.toString=function(){return this.getName()+'="'+this.getValue()+'"'};marknote.Attribute.prototype.clone=function(){return new marknote.Attribute(this.getName(),this.getValue())};marknote.CDATA=function(a){this.dataType=marknote.constants.DATATYPE_CDATA;this.isSw8tXmlContent=true;this.text=marknote.Util.nothingToBlank(a)};marknote.CDATA.prototype.getText=function(){return marknote.Util.nothingToBlank(this.text)};marknote.CDATA.prototype.setText=function(a){this.text=marknote.Util.nothingToBlank(a)};marknote.CDATA.prototype.toString=function(){return this.getText()};marknote.CDATA.prototype.clone=function(){var a=new marknote.Cloner();return a.clone(this)};marknote.Cloner=function(){this.dataType=marknote.constants.DATATYPE_CLONER;this.isSw8tXmlContent=false};marknote.Cloner.prototype.cloneDocument=function(f){var d=new marknote.Document();var g=f.getProcessingInstructions();var a=f.getRootElement();var c;for(var e=0;e<g.length;e++){c=this.cloneProcessingInstruction(g[e]);d.addProcessingInstruction(c)}var b=this.cloneElement(a);d.setRootElement(b);return d};marknote.Cloner.prototype.cloneProcessingInstruction=function(d){var b=d.getData();var a=d.getTarget().slice(0);var c=this.cloneArray(b);return new marknote.ProcessingInstruction(a,c)};marknote.Cloner.prototype.cloneElement=function(c){var d=new marknote.Element();var a=c.getName().slice(0);var b=this.cloneArray(c.getAttributes());d.setName(a);d.setAttributes(b);if(c.isSelfTerminated){d.isSelfTerminated=true;return d}var e=this.cloneContents(c);d.setContents(e);return d};marknote.Cloner.prototype.cloneContents=function(e){var f=new Array();var b,a;for(var g=0;g<e.getContents().length;g++){var d=e.getContentAt(g);a=marknote.Util.dataType(d);switch(a){case marknote.constants.DATATYPE_ELEMENT:b=this.cloneElement(d);f.push(b);break;default:b=this.clone(d);f.push(b);break}}return f};marknote.Cloner.prototype.clone=function(d){var a=(d.dataType&&d.dataType.indexOf("marknote.")>0)||typeof d=="object";if(!a){return d}var c=new Object();for(var b in d){c[b]=this.clone(d[b])}return c};marknote.Cloner.prototype.cloneArray=function(c){var b=new Array();var d;for(var a=0;a<c.length;a++){d=this.clone(c[a]);b.push(d)}return b};marknote.Comment=function(a){this.dataType=marknote.constants.DATATYPE_COMMENT;this.isSw8tXmlContent=true;this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(a))};marknote.Comment.prototype.getText=function(){return marknote.Util.erefDecode(marknote.Util.nothingToBlank(this.text))};marknote.Comment.prototype.setText=function(a){this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(a))};marknote.Comment.prototype.toString=function(){return this.getText()};marknote.Comment.prototype.clone=function(){var a=new marknote.Cloner();return a.clone(this)};marknote.FPI=function(c,b,e,a,d){this.registration=c;this.organization=b;this.publicTextClass=e;this.publicTextDescription=a;this.publicTextLanguage=d};marknote.FPI.prototype.toString=function(){return'"'+this.getRegistration()+"//"+this.getOrganization()+"//"+this.getPublicTextClass()+" "+this.getPublicTextDescription()+"//"+this.getPublicTextLanguage()+'"'};marknote.FPI.prototype.getRegistration=function(){return this.registration};marknote.FPI.prototype.setRegistration=function(a){this.registration=a};marknote.FPI.prototype.getOrganization=function(){return this.organization};marknote.FPI.prototype.setOrganization=function(a){this.organziation=a};marknote.FPI.prototype.getPublicTextClass=function(){return this.publicTextClass};marknote.FPI.prototype.setPublicTextClass=function(a){this.publicTextClass=a};marknote.FPI.prototype.getPublicTextDescription=function(){return this.publicTextDescription};marknote.FPI.prototype.setPublicTextDescription=function(a){this.publicTextDescription=a};marknote.FPI.prototype.getPublicTextLanguage=function(){return this.publicTextLanguage};marknote.FPI.prototype.setPublicTextLanguage=function(a){this.publicTextLanguage=a};marknote.DOCTYPE=function(h,e,c,a,d){this.dataType=marknote.constants.DATATYPE_DOCTYPE;this.isSw8tXmlContent=false;if(h&&!e){var f=new String(h);var g=new marknote.Parser();var b=g.parseDOCTYPE(f);this.topElement=b.getTopElement();this.availability=b.getAvailability();this.FPI=b.getFPI();this.URL=b.getURL();this.internalSubset=b.getInternalSubset()}else{this.setTopElement(h);this.setAvailability(e);this.setFPI(c);this.setURL(a);this.setInternalSubset(d)}};marknote.DOCTYPE.prototype.toString=function(){var c=this.getAvailability()=="PUBLIC"&&this.getFPI()?" "+this.getFPI():"";var a=this.getURL()?" "+this.getURL():"";var b=this.getInternalSubset()?" "+this.getInternalSubset():"";return"<!DOCTYPE "+this.getTopElement()+" "+this.getAvailability()+c+a+b+">"};marknote.DOCTYPE.prototype.getTopElement=function(){return this.topElement};marknote.DOCTYPE.prototype.setTopElement=function(a){this.topElement=a};marknote.DOCTYPE.prototype.getAvailability=function(){return this.availability};marknote.DOCTYPE.prototype.setAvailability=function(a){this.availability=a};marknote.DOCTYPE.prototype.getFPI=function(){return this.FPI};marknote.DOCTYPE.prototype.setFPI=function(a){this.FPI=a};marknote.DOCTYPE.prototype.getURL=function(){return this.URL};marknote.DOCTYPE.prototype.setURL=function(a){var b=marknote.Util.trim(a);if(b===""){this.URL="";return}if(b.charAt(0)!='"'){b='"'+b}if(b.charAt(b.length-1)!='"'){b+='"'}this.URL=b};marknote.DOCTYPE.prototype.getInternalSubset=function(){return this.internalSubset};marknote.DOCTYPE.prototype.setInternalSubset=function(a){this.dataType=marknote.constants.DATATYPE_DOCTYPE;this.internalSubset=a};marknote.Document=function(){this.dataType=marknote.constants.DATATYPE_DOCUMENT;this.isSw8tXmlContent=false;this.processingInstructions=new Array();this.rootElement=new marknote.Element();this.contents=new Array()};marknote.Document.prototype.getProcessingInstructions=function(){return this.processingInstructions};marknote.Document.prototype.setProcessingInstructions=function(a){this.processingInstructions=a};marknote.Document.prototype.addProcessingInstruction=function(a){this.processingInstructions.push(a)};marknote.Document.prototype.removeProcessingInstruction=function(c){for(var b=0;b<this.processingInstructions.length;b++){var a=this.processingInstructions[b].getTarget();if(a==c){marknote.Util.removeArrayItem(this.processingInstructions,b)}}};marknote.Document.prototype.getRootElement=function(){return this.rootElement};marknote.Document.prototype.setRootElement=function(a){if(!(a instanceof marknote.Element)){return}this.rootElement=a};marknote.Document.prototype.getDOCTYPE=function(){return this.DOCTYPE};marknote.Document.prototype.setDOCTYPE=function(a){this.DOCTYPE=a};marknote.Document.prototype.getBaseURI=function(){return this.baseURI};marknote.Document.prototype.setBaseURI=function(a){this.baseURI=a};marknote.Document.prototype.toString=function(a,b,e,d){var c=new marknote.Writer();return c.outputDocument(this,a)};marknote.Document.prototype.clone=function(){var a=new marknote.Cloner();return a.cloneDocument(this)};marknote.Element=function(a){this.dataType=marknote.constants.DATATYPE_ELEMENT;this.isSw8tXmlContent=true;this.contents=new Array();this.attributes=new Array();this.qname=new marknote.QName();this.isSelfTerminated=false;if(a){if(a instanceof marknote.QName){this.setQName(a)}else{this.setName(a)}}};marknote.Element.prototype.getName=function(){return this.qname.getName()};marknote.Element.prototype.setName=function(a){this.qname.setName(a)};marknote.Element.prototype.getQName=function(){return this.qname};marknote.Element.prototype.setQName=function(a){this.qname=a};marknote.Element.prototype.hasContents=function(){return this.contents&&this.contents.length>0};marknote.Element.prototype.getContents=function(){return this.contents};marknote.Element.prototype.getContentAt=function(a){return this.getContents()[a]};marknote.Element.prototype.addContent=function(a){if(a&&a.isSw8tXmlContent){this.getContents().push(a)}};marknote.Element.prototype.removeContent=function(a){marknote.Util.removeArrayItem(this.contents,a)};marknote.Element.prototype.setContents=function(a){this.contents=a};marknote.Element.prototype.getText=function(d){var e="";if(typeof d=="undefined"){d=true}for(var b=0;b<this.contents.length;b++){var c=this.getContentAt(b);var a=marknote.Util.dataType(c);if(a==marknote.constants.DATATYPE_TEXT){e+=c.getText(d)}else{if(a==marknote.constants.DATATYPE_CDATA){e+=c.getText()}}}return e};marknote.Element.prototype.setText=function(e){var a=new Array();for(var c=0;c<this.contents.length;c++){var d=this.getContentAt(c);var b=marknote.Util.dataType(d);if(b==marknote.constants.DATATYPE_COMMENT){a.push(d)}}this.contents=a;e=e?""+e:"";this.contents.push(new marknote.Text(e))};marknote.Element.prototype.setCDATAText=function(e){var a=new Array();for(var c=0;c<this.contents.length;c++){var d=this.getContentAt(c);var b=marknote.Util.dataType(d);if(b==marknote.constants.DATATYPE_COMMENT){a.push(d)}}this.contents=a;e=e?""+e:"";this.contents.push(new marknote.CDATA(e))};marknote.Element.prototype.removeText=function(){for(var b=this.contents.length-1;b>=0;b--){var c=this.getContentAt(b);var a=marknote.Util.dataType(c);if(a==marknote.constants.DATATYPE_TEXT||a==marknote.constants.DATATYPE_CDATA){marknote.Util.removeArrayItem(this.contents,b)}}};marknote.Element.prototype.getCommentText=function(){var d="";for(var b=0;b<this.contents.length;b++){var c=this.getContentAt(b);var a=marknote.Util.dataType(c);if(a==marknote.constants.DATATYPE_COMMENT){d+=c.getText()}}return d};marknote.Element.prototype.setCommentText=function(a){this.removeComments();a=a?""+a:"";this.addContent(new marknote.Comment(a))};marknote.Element.prototype.removeComments=function(){for(var b=this.contents.length-1;b>=0;b--){var c=this.getContentAt(b);var a=marknote.Util.dataType(c);if(a==marknote.constants.DATATYPE_COMMENT){marknote.Util.removeArrayItem(this.contents,b)}}};marknote.Element.prototype.addChildElement=function(b){var a=marknote.Util.dataType(b);if(!a==marknote.constants.DATATYPE_ELEMENT){return}this.getContents().push(b)};marknote.Element.prototype.removeChildElements=function(f){var e=0;if(!f){e=this.contents.length;this.contents=new Array();return e}var c=f.dataType==marknote.constants.DATATYPE_QNAME?f.getName():f;var d=marknote.Cloner.cloneArray(this.contents);for(var b=d.length-1;b>=0;b--){var a=marknote.Util.dataType(d[b]);if(a!=marknote.constants.DATATYPE_ELEMENT){continue}if(this.clonedContents[b].getName()==c){marknote.Util.removeArrayItem(this.contents,b);e++}}return e};marknote.Element.prototype.getChildElements=function(e){var c=false;var f=new Array();if(e){c=e.dataType==marknote.constants.DATATYPE_QNAME?e.getName():e}for(var b=0;b<this.contents.length;b++){var d=this.contents[b];var a=marknote.Util.dataType(d);if(a!=marknote.constants.DATATYPE_ELEMENT){continue}if(c){if(d.getName()==c){f.push(d)}}else{f.push(d)}}return f};marknote.Element.prototype.getChildElement=function(d){var b=d.dataType==marknote.constants.DATATYPE_QNAME?d.getName():d;if(b){var h=this.getContents();for(var g=0;g<h.length;g++){var f=h[g];var a=marknote.Util.dataType(f);if(a==marknote.constants.DATATYPE_ELEMENT){var e=f.getName();if(e===b){return f}}}}};marknote.Element.prototype.removeChildElement=function(d){var b=d.dataType==marknote.constants.DATATYPE_QNAME?d.getName():d;if(b){var h=this.getContents();for(var g=0;g<h.length;g++){var f=h[g];var a=marknote.Util.dataType(f);if(a==marknote.constants.DATATYPE_ELEMENT){var e=f.getName();if(e===b){marknote.Util.removeArrayItem(this.contents,g);return}}}}};marknote.Element.prototype.getChildElementAt=function(a){try{return this.getChildElements()[a]}catch(b){}};marknote.Element.prototype.removeChildElementAt=function(a){var e=-1;var b;for(var d=0;d<this.contents.length;d++){b=marknote.Util.dataType(this.contents[d])==marknote.constants.DATATYPE_ELEMENT;if(b){e++;if(a==e){marknote.Util.removeArrayItem(this.contents,d);return}}}};marknote.Element.prototype.getAttributes=function(){return this.attributes};marknote.Element.prototype.setAttributes=function(a){this.attributes=a};marknote.Element.prototype.getAttribute=function(a){for(var b=0;b<this.getAttributes().length;b++){var c=this.getAttributes()[b];if(c.getName()==a){return c}}};marknote.Element.prototype.getAttributeValue=function(a){var b=this.getAttribute(a);return b?b.getValue():""};marknote.Element.prototype.getAttributeAt=function(a){return this.getAttributes()[a]};marknote.Element.prototype.setAttribute=function(a,d){if(marknote.Util.dataType(a)==marknote.constants.DATATYPE_ATTRIBUTE){this.putAttribute(a)}else{for(var b=0;b<this.getAttributes().length;b++){var c=this.getAttributes()[b];if(c.getName()==a){c.setValue(d);return}}this.putAttribute(new marknote.Attribute(a,d))}};marknote.Element.prototype.putAttribute=function(a){if(a&&this.getAttribute(a.getName())){this.removeAttribute(a.getName())}this.getAttributes().push(a)};marknote.Element.prototype.removeAttribute=function(a){var d=new Array();for(var b=0;b<this.getAttributes().length;b++){var c=this.getAttributes()[b];if(c.getName()!=a){d.push(c)}}this.setAttributes(d)};marknote.Element.prototype.removeAllAttributes=function(){this.setAttributes(new Array())};marknote.Element.prototype.toString=function(a){var b=new marknote.Writer();return b.outputElement(this,0,a)};marknote.Element.prototype.clone=function(){var a=new marknote.Cloner();return a.cloneElement(this)};marknote.EntityRef=function(a,b){this.dataType=marknote.constants.DATATYPE_ENTITYREF;this.name=a;this.character=b};marknote.EntityRef.prototype.getName=function(){return this.name};marknote.EntityRef.prototype.setName=function(a){this.name=a};marknote.EntityRef.prototype.getName=function(){return this.name};marknote.EntityRef.prototype.setName=function(a){this.dataType=marknote.constants.DATATYPE_ENTITYREF;this.isSw8tXmlContent=false;this.character=a};marknote.EntityRef.prototype.clone=function(){var a=new marknote.Cloner();return a.clone(this)};marknote.XMLEntityRefs=function(){this.dataType=marknote.constants.DATATYPE_XMLENTITYREFS;this.isSw8tXmlContent=false;this.refs=new Array();this.pushRef("quot",34);this.pushRef("amp",38);this.pushRef("apos",39);this.pushRef("lt",60);this.pushRef("gt",62)};marknote.XMLEntityRefs.prototype.getRefs=function(){return this.refs};marknote.XMLEntityRefs.prototype.pushRef=function(b,a){this.refs.push(new marknote.EntityRef(b,String.fromCharCode(a)))};marknote.EntityRefs=function(){this.dataType=marknote.constants.DATATYPE_ENTITYREFS;this.isSw8tXmlContent=false;this.refs=new Array().concat(new marknote.XMLEntityRefs().getRefs());this.pushRef("nbsp",160);this.pushRef("iexcl",161);this.pushRef("cent",162);this.pushRef("pound",163);this.pushRef("curren",164);this.pushRef("yen",165);this.pushRef("brvbar",166);this.pushRef("sect",167);this.pushRef("uml",168);this.pushRef("copy",169);this.pushRef("ordf",170);this.pushRef("laquo",171);this.pushRef("not",172);this.pushRef("shy",173);this.pushRef("reg",174);this.pushRef("macr",175);this.pushRef("deg",176);this.pushRef("plusmn",177);this.pushRef("sup2",178);this.pushRef("sup3",179);this.pushRef("acute",180);this.pushRef("micro",181);this.pushRef("para",182);this.pushRef("middot",183);this.pushRef("cedil",184);this.pushRef("sup1",185);this.pushRef("ordm",186);this.pushRef("raquo",187);this.pushRef("frac14",188);this.pushRef("frac12",189);this.pushRef("frac34",190);this.pushRef("iquest",191);this.pushRef("Agrave",192);this.pushRef("Aacute",193);this.pushRef("Acirc",194);this.pushRef("Atilde",195);this.pushRef("Auml",196);this.pushRef("Aring",197);this.pushRef("AElig",198);this.pushRef("Ccedil",199);this.pushRef("Egrave",200);this.pushRef("Eacute",201);this.pushRef("Ecirc",202);this.pushRef("Euml",203);this.pushRef("Igrave",204);this.pushRef("Iacute",205);this.pushRef("Icirc",206);this.pushRef("Iuml",207);this.pushRef("ETH",208);this.pushRef("Ntilde",209);this.pushRef("Ograve",210);this.pushRef("Oacute",211);this.pushRef("Ocirc",212);this.pushRef("Otilde",213);this.pushRef("Ouml",214);this.pushRef("times",215);this.pushRef("Oslash",216);this.pushRef("Ugrave",217);this.pushRef("Uacute",218);this.pushRef("Ucirc",219);this.pushRef("Uuml",220);this.pushRef("Yacute",221);this.pushRef("THORN",222);this.pushRef("szlig",223);this.pushRef("agrave",224);this.pushRef("aacute",225);this.pushRef("acirc",226);this.pushRef("atilde",227);this.pushRef("auml",228);this.pushRef("aring",229);this.pushRef("aelig",230);this.pushRef("ccedil",231);this.pushRef("egrave",232);this.pushRef("eacute",233);this.pushRef("ecirc",234);this.pushRef("euml",235);this.pushRef("igrave",236);this.pushRef("iacute",237);this.pushRef("icirc",238);this.pushRef("iuml",239);this.pushRef("eth",240);this.pushRef("ntilde",241);this.pushRef("ograve",242);this.pushRef("oacute",243);this.pushRef("ocirc",244);this.pushRef("otilde",245);this.pushRef("ouml",246);this.pushRef("divide",247);this.pushRef("oslash",248);this.pushRef("ugrave",249);this.pushRef("uacute",250);this.pushRef("ucirc",251);this.pushRef("uuml",252);this.pushRef("yacute",253);this.pushRef("thorn",254);this.pushRef("yuml",255);this.pushRef("OElig",338);this.pushRef("oelig",339);this.pushRef("Scaron",352);this.pushRef("scaron",353);this.pushRef("Yuml",376);this.pushRef("fnof",402);this.pushRef("circ",710);this.pushRef("tilde",732);this.pushRef("Alpha",913);this.pushRef("Beta",914);this.pushRef("Gamma",915);this.pushRef("Delta",916);this.pushRef("Epsilon",917);this.pushRef("Zeta",918);this.pushRef("Eta",919);this.pushRef("Theta",920);this.pushRef("Iota",921);this.pushRef("Kappa",922);this.pushRef("Lambda",923);this.pushRef("Mu",924);this.pushRef("Nu",925);this.pushRef("Xi",926);this.pushRef("Omicron",927);this.pushRef("Pi",928);this.pushRef("Rho",929);this.pushRef("Sigma",931);this.pushRef("Tau",932);this.pushRef("Upsilon",933);this.pushRef("Phi",934);this.pushRef("Chi",935);this.pushRef("Psi",936);this.pushRef("Omega",937);this.pushRef("alpha",945);this.pushRef("beta",946);this.pushRef("gamma",947);this.pushRef("delta",948);this.pushRef("epsilon",949);this.pushRef("zeta",950);this.pushRef("eta",951);this.pushRef("theta",952);this.pushRef("iota",953);this.pushRef("kappa",954);this.pushRef("lambda",955);this.pushRef("mu",956);this.pushRef("nu",957);this.pushRef("xi",958);this.pushRef("omicron",959);this.pushRef("pi",960);this.pushRef("rho",961);this.pushRef("sigmaf",962);this.pushRef("sigma",963);this.pushRef("tau",964);this.pushRef("upsilon",965);this.pushRef("phi",966);this.pushRef("chi",967);this.pushRef("psi",968);this.pushRef("omega",969);this.pushRef("thetasym",977);this.pushRef("upish",978);this.pushRef("piv",982);this.pushRef("ensp",8194);this.pushRef("emsp",8195);this.pushRef("thinsp",8201);this.pushRef("zwnj",8204);this.pushRef("zwj",8205);this.pushRef("lrm",8206);this.pushRef("rlm",8207);this.pushRef("ndash",8211);this.pushRef("mdash",8212);this.pushRef("lsquo",8216);this.pushRef("rsquo",8217);this.pushRef("sbquo",8218);this.pushRef("ldquo",8220);this.pushRef("rdquo",8221);this.pushRef("bdquo",8222);this.pushRef("dagger",8224);this.pushRef("Dagger",8225);this.pushRef("bull",8226);this.pushRef("hellip",8230);this.pushRef("permil",8240);this.pushRef("prime",8242);this.pushRef("Prime",8243);this.pushRef("lsaquo",8249);this.pushRef("rsaquo",8250);this.pushRef("oline",8254);this.pushRef("frasl",8260);this.pushRef("euro",8364);this.pushRef("image",8465);this.pushRef("weierp",8472);this.pushRef("real",8476);this.pushRef("trade",8482);this.pushRef("alefsym",8501);this.pushRef("larr",8592);this.pushRef("uarr",8593);this.pushRef("rarr",8594);this.pushRef("darr",8595);this.pushRef("harr",8596);this.pushRef("crarr",8629);this.pushRef("lArr",8656);this.pushRef("uArr",8657);this.pushRef("rArr",8658);this.pushRef("dArr",8659);this.pushRef("hArr",8660);this.pushRef("forall",8704);this.pushRef("part",8706);this.pushRef("exist",8707);this.pushRef("empty",8709);this.pushRef("nabla",8711);this.pushRef("isin",8712);this.pushRef("notin",8713);this.pushRef("ni",8715);this.pushRef("prod",8719);this.pushRef("sum",8721);this.pushRef("minus",8722);this.pushRef("lowast",8727);this.pushRef("radic",8730);this.pushRef("prop",8733);this.pushRef("infin",8734);this.pushRef("ang",8736);this.pushRef("and",8743);this.pushRef("or",8744);this.pushRef("cap",8745);this.pushRef("cup",8746);this.pushRef("int",8747);this.pushRef("there4",8756);this.pushRef("sim",8764);this.pushRef("cong",8773);this.pushRef("asymp",8776);this.pushRef("ne",8800);this.pushRef("equiv",8801);this.pushRef("le",8804);this.pushRef("ge",8805);this.pushRef("sub",8834);this.pushRef("sup",8835);this.pushRef("nsub",8836);this.pushRef("sube",8838);this.pushRef("supe",8839);this.pushRef("oplus",8853);this.pushRef("otimes",8855);this.pushRef("perp",8869);this.pushRef("sdot",8901);this.pushRef("lceil",8968);this.pushRef("rceil",8969);this.pushRef("lfloor",8970);this.pushRef("rfloor",8971);this.pushRef("lang",9001);this.pushRef("rang",9002);this.pushRef("loz",9674);this.pushRef("spades",9824);this.pushRef("clubs",9827);this.pushRef("hearts",9829);this.pushRef("diams",9830)};marknote.EntityRefs.prototype.getRefs=function(){return this.refs};marknote.EntityRefs.prototype.pushRef=function(b,a){this.refs.push(new marknote.EntityRef(b,String.fromCharCode(a)))};marknote.Parser=function(){this.dataType=marknote.constants.DATATYPE_PARSER;this.isSw8tXmlContent=false;this.doc=new marknote.Document();this.status=0;this.statusMessage="success";this.xhr=null;this.xhrStatus=null;this.xhrStatusText=null;this.xhrResponseText=null};marknote.Parser.prototype.getDocument=function(){return this.doc};marknote.Parser.prototype.getXHR=function(){return this.xhr};marknote.Parser.prototype.getXHRStatus=function(){return this.xhrStatus};marknote.Parser.prototype.getXHRStatusText=function(){return this.xhrStatusText};marknote.Parser.prototype.getXHRResponseText=function(){return this.xhrResponseText};marknote.Parser.prototype.getStatus=function(){return this.status};marknote.Parser.prototype.setStatus=function(a){this.status=a};marknote.Parser.prototype.getStatusMessage=function(){return this.statusMessage};marknote.Parser.prototype.setStatusMessage=function(a){this.statusMessage=a};marknote.Parser.prototype.parseProcessingInstructions=function(k,n){var p=new marknote.Tokenizer(k);var l=p.tokenize();var g=0,c=0;var b=false;var h,j,f,i,a,m,o;for(var q=0;q<l.length;q++){o=l[q].getType();switch(o){case marknote.constants.TOKENTYPE_PI_START:g=l[q].getPosition();j="";f=new Array();b=true;j=l[q+1].getContent();q++;break;case marknote.constants.TOKENTYPE_PI_END:if(b){if(marknote.Util.isUndefinedNullOrBlank(j)){j="xml"}}b=false;c=l[q].getPosition()+2;h=new marknote.ProcessingInstruction(j,f);n.addProcessingInstruction(h);break;case marknote.constants.TOKENTYPE_ATTRIBUTE:if(b){a=l[q-1].getContent();m=l[q+1].getContent();m=m.slice(1,m.length-1);i=new marknote.Attribute(a,m);f.push(i)}q++;break;default:break}}if(c>g){var e=g>0?k.slice(0,g):"";var d=k.slice(c+1);return marknote.Util.trim(e+d)}else{return k}};marknote.Parser.prototype.parseProcessingInstructions=function(k,n){var p=new marknote.Tokenizer(k);var l=p.tokenize();var g=0,c=0;var b=false;var h,j,f,i,a,m,o;for(var q=0;q<l.length;q++){o=l[q].getType();switch(o){case marknote.constants.TOKENTYPE_PI_START:g=l[q].getPosition();j="";f=new Array();b=true;j=l[q+1].getContent();q++;break;case marknote.constants.TOKENTYPE_PI_END:if(b){if(marknote.Util.isUndefinedNullOrBlank(j)){j="xml"}}b=false;c=l[q].getPosition()+2;h=new marknote.ProcessingInstruction(j,f);n.addProcessingInstruction(h);break;case marknote.constants.TOKENTYPE_ATTRIBUTE:if(b){a=l[q-1].getContent();m=l[q+1].getContent();m=m.slice(1,m.length-1);i=new marknote.Attribute(a,m);f.push(i)}q++;break;default:break}}if(c>g){var e=g>0?k.slice(0,g):"";var d=k.slice(c+1);return marknote.Util.trim(e+d)}else{return k}};marknote.Parser.prototype.parseDOCTYPE=function(d,f){var h=new marknote.Tokenizer(d);var e=h.tokenize();var c=new marknote.DOCTYPE();var g,b;try{for(var i=0;i<e.length;i++){g=e[i].getType();switch(g){case marknote.constants.TOKENTYPE_DOCTYPE_START:if(f){f.setDOCTYPE(c)}if(e[++i].isTagClose()){return c}c.setTopElement(e[i].getContent());b=e[++i].getContent().toUpperCase();c.setAvailability(b);if("SYSTEM"==b){if(e[++i].isTagClose()){return c}c.setURL(e[i].getContent())}else{if("PUBLIC"==b){if(e[++i].isTagClose()){return c}c.setFPI(e[i].getContent());if(e[++i].isTagClose()){return c}c.setURL(e[i].getContent());if(e[++i].isTagClose()){return c}c.setInternalSubset(e[i].getContent())}}break;case marknote.constants.TOKENTYPE_TAG_CLOSE:return c;default:break}}}catch(a){window.alert(a)}return c};marknote.Parser.prototype.parse=function(a){this.xhr=null;this.xhrStatus=null;this.xhrStatusText=null;this.xhrResponseText=null;this.doc=new marknote.Document();this.setStatus(0);a=this.parseProcessingInstructions(a,this.doc);this.parseDOCTYPE(a,this.doc);this.parseElement(a,this.doc);return this.doc};marknote.Parser.prototype.parseURL=function(a,d,e){var c=new marknote.SJAX();var b=c.read(a,d,e);this.xhr=c.getRequest();this.xhrStatus=c.getStatus();this.xhrStatusText=c.getStatusText();this.xhrResponseText=c.getResponseText();return b};marknote.Parser.prototype.parseComment=function(a,c,b){var d=c[b+1].content==marknote.constants.COMMENT_START?"":c[b+1].content;var e=new marknote.Comment(d);if(a){a.addContent(e)}b=c[b+1].content==marknote.constants.COMMENT_START?b+1:b+2;return b};marknote.Parser.prototype.parseElement=function(u,x,n){var o=new marknote.Tokenizer(u);var l=o.tokenize();var w=0,e=0;var r=false;for(var j=0;j<l.length;j++){if(l[j].isCommentStart()){j=this.parseComment(n,l,j);continue}for(;j<l.length;j++){if(l[j].isTagOpen()){w=j;break}}if(w!=j){return}var v=new marknote.Element(l[w+1].content);if(!n){x.setRootElement(v)}else{n.addContent(v)}for(j=w+1;j<l.length;j++){switch(l[j].getType()){case marknote.constants.TOKENTYPE_SELF_TERMINATING:v.isSelfTerminated=true;w=j;break;case marknote.constants.TOKENTYPE_TAG_CLOSE:v.isSelfTerminated=false;w=j;break;case marknote.constants.TOKENTYPE_ATTRIBUTE:try{var b=l[j-1].content;var g=l[j+1].content;var m=g.slice(1,g.length-1);var i=new marknote.Attribute(b,m);v.putAttribute(i)}catch(f){}break;default:break}if(w==j){break}}if(!w==j){return}switch(l[w].content){case marknote.constants.TAG_CLOSE_SELF_TERMINATING:r=l[w+1]&&l[w+1].content==marknote.constants.COMMENT_START;if(r){e=w+1;while(r){e=this.parseComment(n,l,e);r=l[e+1]&&l[e+1].content==marknote.constants.COMMENT_START;if(r){e++}}}else{e=w}break;case marknote.constants.TAG_CLOSE:if(l[w+1]){if(l[w+1].isCDATAStart()){var k=l[j+2].content;var s=j+3;if(l[j+2].isCDATAEnd()){k="";s=j+2}var a=new marknote.CDATA(k);v.addContent(a);w=s}else{if(l[w+1].isLiteral){v.setText(l[w+1].getContent())}}}else{e=w}for(j=w+1;j<l.length;j++){var p=l[j].getContent()==marknote.constants.ENDTAG_OPEN&&l[j+1].getContent()==v.getName()?true:false;if(p){e=j;r=l[e+3]&&l[e+3].content==marknote.constants.COMMENT_START;if(r){e=this.parseComment(n,l,e+3)}var q=e==w+1||(l[w+1].isLiteral&&e==w+2)?false:true;if(!q){break}var d=l[w+1].getPosition();var c=l[e].getPosition();var h=u.slice(d,c);this.parseElement(h,x,v);break}}if(!p){return}break;default:return}j=e}};marknote.ProcessingInstruction=function(b,a){this.dataType=marknote.constants.DATATYPE_PROCESSINGINSTRUCTION;this.isSw8tXmlContent=false;this.target=b?b:"xml";if(b&&!a){this.data=new Array()}else{if(!a){this.data=[new marknote.Attribute("version","1.0"),new marknote.Attribute("encoding","UTF-8")]}else{this.data=a}}};marknote.ProcessingInstruction.prototype.getData=function(){return this.data};marknote.ProcessingInstruction.prototype.setData=function(a){this.data=a};marknote.ProcessingInstruction.prototype.getTarget=function(){return this.target};marknote.ProcessingInstruction.prototype.setTarget=function(a){this.target=a};marknote.ProcessingInstruction.prototype.setAttribute=function(c){var d=this.getData();if(marknote.Util.dataType(c)==marknote.constants.DATATYPE_ATTRIBUTE){for(var b=0;b<d.length;b++){if(d[b].getName()==c.getName()){d[b].setValue(c.getValue());return}}}};marknote.ProcessingInstruction.prototype.getAttributeValue=function(c){var d=this.getData();for(var b=0;b<d.length;b++){if(d[b].getName()==c){return d[b]}}};marknote.ProcessingInstruction.prototype.setAttributeValue=function(c,e){var d=this.getData();if(c){if(typeof e=="undefined"){e=""}for(var b=0;b<d.length;b++){if(d[b].getName()==c){d[b].setValue(e);return}}d.push(new marknote.Attribute(c,e))}};marknote.ProcessingInstruction.prototype.clone=function(){var a=new marknote.Cloner();return a.cloneProcessingInstruction(this)};marknote.QName=function(b,a){this.dataType=marknote.constants.DATATYPE_QNAME;this.isSw8tXmlContent=false;this.prefix=marknote.Util.nothingToBlank(b);this.localPart=marknote.Util.nothingToBlank(a)};marknote.QName.prototype.getName=function(){var a="";if(marknote.Util.hasValue(this.prefix)){a+=this.prefix+":"}if(marknote.Util.hasValue(this.localPart)){a+=this.localPart}return a};marknote.QName.prototype.setName=function(b){var c=marknote.Util.nothingToBlank(b);var a=c.split(":");if(a.length>1){this.prefix=a[0];this.localPart=a[1]}else{this.prefix="";this.localPart=c}};marknote.QName.prototype.getPrefix=function(){return marknote.Util.nothingToBlank(this.prefix)};marknote.QName.prototype.setPrefix=function(a){this.prefix=marknote.Util.nothingToBlank(a)};marknote.QName.prototype.getLocalPart=function(){return marknote.Util.nothingToBlank(this.localPart)};marknote.QName.prototype.setLocalPart=function(a){this.localPart=marknote.Util.nothingToBlank(a)};marknote.QName.prototype.toString=function(){return this.getName()};marknote.QName.prototype.clone=function(){var a=new marknote.Cloner();return a.clone(this)};marknote.Text=function(a){this.dataType=marknote.constants.DATATYPE_TEXT;this.isSw8tXmlContent=true;this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(a))};marknote.Text.prototype.getText=function(b){if(marknote.Util.isEmpty(b)){b=true}var a=marknote.Util.nothingToBlank(this.text);return b?marknote.Util.erefDecode(a):a};marknote.Text.prototype.setText=function(a){this.text=marknote.Util.erefEncode(marknote.Util.nothingToBlank(a))};marknote.Text.prototype.toString=function(){return this.getText()};marknote.Text.prototype.clone=function(){var a=new marknote.Cloner();return a.clone(this)};marknote.Token=function(b,a){this.dataType=marknote.constants.DATATYPE_TOKEN;this.isSwt8XmlContent=false;this.content=typeof(b)=="undefined"?new String():b;this.isLiteral=false;this.position=a?a:0};marknote.Token.prototype.getContent=function(){return this.content};marknote.Token.prototype.setContent=function(a){this.content=a};marknote.Token.prototype.getPosition=function(){return this.position};marknote.Token.prototype.setPosition=function(a){this.position=a};marknote.Token.prototype.hasValue=function(){try{return marknote.Util.hasValue(this.content)}catch(a){return false}};marknote.Token.prototype.isDOCTYPEStart=function(){return this.content==marknote.constants.DOCTYPE_START};marknote.Token.prototype.isPIStart=function(){return this.content==marknote.constants.PI_START};marknote.Token.prototype.isPIEnd=function(){return this.content==marknote.constants.PI_END};marknote.Token.prototype.isSelfTerminating=function(){return this.content==marknote.constants.TAG_CLOSE_SELF_TERMINATING};marknote.Token.prototype.isEndTag=function(){return this.content==marknote.constants.ENDTAG_OPEN};marknote.Token.prototype.isCommentStart=function(){return this.content==marknote.constants.COMMENT_START};marknote.Token.prototype.isCommentEnd=function(){return this.content==marknote.constants.COMMENT_END};marknote.Token.prototype.isAttribute=function(){return this.content==marknote.constants.EQUALS};marknote.Token.prototype.isCDATAStart=function(){return this.content==marknote.constants.CDATA_START};marknote.Token.prototype.isCDATAEnd=function(){return this.content==marknote.constants.CDATA_END};marknote.Token.prototype.isTagOpen=function(){return this.content==marknote.constants.TAG_OPEN};marknote.Token.prototype.isTagClose=function(){return this.content==marknote.constants.TAG_CLOSE};marknote.Token.prototype.isQuote=function(){return this.content==marknote.constants.SQUOTE||this.content==marknote.constants.DQUOTE};marknote.Token.prototype.isQuoted=function(){return this.content.charAt(0)=='"'&&this.content.charAt(this.content.length-1)=='"'};marknote.Token.prototype.getType=function(){if(this.isDOCTYPEStart()){return marknote.constants.TOKENTYPE_DOCTYPE_START}if(this.isPIStart()){return marknote.constants.TOKENTYPE_PI_START}if(this.isPIEnd()){return marknote.constants.TOKENTYPE_PI_END}if(this.isSelfTerminating()){return marknote.constants.TOKENTYPE_SELF_TERMINATING}if(this.isEndTag()){return marknote.constants.TOKENTYPE_ENDTAG_OPEN}if(this.isCommentStart()){return marknote.constants.TOKENTYPE_COMMENT_START}if(this.isCommentEnd()){return marknote.constants.TOKENTYPE_COMMENT_END}if(this.isAttribute()){return marknote.constants.TOKENTYPE_ATTRIBUTE}if(this.isCDATAStart()){return marknote.constants.TOKENTYPE_CDATA_START}if(this.isCDATAEnd()){return marknote.constants.TOKENTYPE_CDATA_END}if(this.isTagOpen()){return marknote.constants.TOKENTYPE_TAG_OPEN}if(this.isTagClose()){return marknote.constants.TOKENTYPE_TAG_CLOSE}if(this.isQuote()){return marknote.constants.TOKENTYPE_QUOTE}if(this.isQuoted()){return marknote.constants.TOKENTYPE_QUOTED}return marknote.constants.TOKENTYPE_NORMAL};marknote.Tokenizer=function(a){this.dataType=marknote.constants.DATATYPE_TOKENIZER;this.isSw8tXmlContent=false;this.setMarkup(a);this.tokens=new Array()};marknote.Tokenizer.prototype.getMarkup=function(){return this.markup};marknote.Tokenizer.prototype.setMarkup=function(a){this.markup=a?a:""};marknote.Tokenizer.prototype.determineTokenType=function(e,a){var b=this.markup.charAt(e);var d=e>0?this.markup.charAt(e-1):null;if(marknote.Util.hasWhitespace(b)){return marknote.constants.TOKENTYPE_WHITESPACE}if(this.markup.slice(e,e+9)==marknote.constants.DOCTYPE_START){return marknote.constants.TOKENTYPE_DOCTYPE_START}if(this.markup.slice(e,e+9)==marknote.constants.CDATA_START){return marknote.constants.TOKENTYPE_CDATA_START}if(this.markup.slice(e,e+4)==marknote.constants.COMMENT_START){return marknote.constants.TOKENTYPE_COMMENT_START}if(this.markup.slice(e,e+3)==marknote.constants.CDATA_END){return marknote.constants.TOKENTYPE_CDATA_END}if(this.markup.slice(e,e+2)==marknote.constants.PI_START){return marknote.constants.TOKENTYPE_PI_START}if(this.markup.slice(e,e+2)==marknote.constants.PI_END){return marknote.constants.TOKENTYPE_PI_END}if(this.markup.slice(e,e+2)==marknote.constants.TAG_CLOSE_SELF_TERMINATING){return marknote.constants.TOKENTYPE_SELF_TERMINATING}if(this.markup.slice(e,e+2)==marknote.constants.ENDTAG_OPEN){return marknote.constants.TOKENTYPE_ENDTAG_OPEN}if(b==marknote.constants.EQUALS&&a){return marknote.constants.TOKENTYPE_ATTRIBUTE}if(b==marknote.constants.TAG_OPEN){return marknote.constants.TOKENTYPE_TAG_OPEN}if(b==marknote.constants.TAG_CLOSE){return marknote.constants.TOKENTYPE_TAG_CLOSE}if(b==marknote.constants.SQUOTE){return marknote.constants.TOKENTYPE_QUOTE}if(b==marknote.constants.DQUOTE){if(d!==null||d!="\\"){return marknote.constants.TOKENTYPE_QUOTE}}if(b==marknote.constants.BRACKET_OPEN){return marknote.constants.TOKENTYPE_BRACKET_OPEN}return marknote.constants.TOKENTYPE_NORMAL};marknote.Tokenizer.prototype.isQuote=function(a){return a==marknote.constants.SQUOTE||a==marknote.constants.DQUOTE};marknote.Tokenizer.prototype.toString=function(){var b=this.tokens;var c=new String();for(var a=0;a<b.length;a++){if(a>0){c+=","}c+=b[a].content}return c};marknote.Tokenizer.prototype.tokenizeTagContent=function(f,h){var a=false;var e,b;for(var g=h+1;g<this.markup.length;g++){if(this.markup.slice(g,g+9)==marknote.constants.CDATA_START){a=true;break}else{if(this.markup.charAt(g)==marknote.constants.TAG_OPEN){break}}}if(a){b=new marknote.Token(marknote.constants.CDATA_START,g);f.push(b);b=new marknote.Token("",g+9);b.isLiteral=true;e=marknote.constants.CDATA_END;for(h=g+9;h<this.markup.length;h++){if(this.markup.slice(h,h+3)==e){f.push(b);b=new marknote.Token(e,h);f.push(b);h+=2;b=new marknote.Token("",h+3);break}else{b.content+=this.markup.charAt(h)}}}else{b=new marknote.Token("",h+1);b.isLiteral=true}return{token:b,c:h}};marknote.Tokenizer.prototype.tokenize=function(){var m=new Array();this.tokens=m;var f=new marknote.Token();var e=false,b=false,g=false;var n,d,a,l;for(var k=0;k<this.markup.length;k++){var o=this.determineTokenType(k,e);switch(o){case marknote.constants.TOKENTYPE_DOCTYPE_START:b=true;if(f.hasValue()){m.push(f)}f=new marknote.Token(marknote.constants.DOCTYPE_START,k);k+=8;break;case marknote.constants.TOKENTYPE_BRACKET_OPEN:if(b){if(f.hasValue()){m.push(f)}f=new marknote.Token(this.markup.charAt(k),k);f.isLiteral=true;n=marknote.constants.BRACKET_CLOSE;for(++k;k<this.markup.length;k++){f.content+=this.markup.charAt(k);if(this.markup.charAt(k)==n){if(f.hasValue()){m.push(f)}f=new marknote.Token("",k+1);break}}}else{f.content+=this.markup.charAt(k)}break;case marknote.constants.TOKENTYPE_PI_START:var j;var h="";if(f.hasValue()){m.push(f)}f=new marknote.Token(marknote.constants.PI_START,k);m.push(f);d=k+2;e=true;for(k=d;k<this.markup.length;k++){j=this.determineTokenType(k,e);if(j==marknote.constants.TOKENTYPE_PI_END){h=this.markup.slice(d,k);if(marknote.Util.isUndefinedNullOrBlank(h)){h="xml"}f=new marknote.Token(h,k);m.push(f);f=new marknote.Token(marknote.constants.PI_END,k);m.push(f);e=false;break}else{if(j==marknote.constants.TOKENTYPE_WHITESPACE){if(h===""){h=this.markup.slice(d,k);if(marknote.Util.isUndefinedNullOrBlank(h)){h="xml"}f=new marknote.Token(h,k);m.push(f)}break}}}f=new marknote.Token("",k);break;case marknote.constants.TOKENTYPE_PI_END:f=new marknote.Token(marknote.constants.PI_END,k);m.push(f);e=false;k+=2;f=new marknote.Token("",k);break;case marknote.constants.TOKENTYPE_WHITESPACE:if(f.isLiteral){f.content+=this.markup.charAt(k);break}for(++k;k<this.markup.length;k++){if(marknote.Util.hasWhitespace(this.markup.charAt(k))){continue}else{if(f.hasValue()){m.push(f)}o=this.determineTokenType(k,e);if(o==marknote.constants.TOKENTYPE_NORMAL){a=this.markup.charAt(k);f=new marknote.Token(a,k)}else{k--;f=new marknote.Token("",k+1)}break}}break;case marknote.constants.TOKENTYPE_SELF_TERMINATING:case marknote.constants.TOKENTYPE_ENDTAG_OPEN:e=false;if(f.hasValue()){m.push(f)}f=new marknote.Token(this.markup.slice(k,k+2),k);if(f.hasValue()){m.push(f)}k++;f=new marknote.Token("",k+1);break;case marknote.constants.TOKENTYPE_TAG_CLOSE:e=false;b=false;if(f.hasValue()){m.push(f)}f=new marknote.Token(marknote.constants.TAG_CLOSE,k);m.push(f);var i=this.tokenizeTagContent(m,k);f=i.token;k=i.c;break;case marknote.constants.TOKENTYPE_ATTRIBUTE:case marknote.constants.TOKENTYPE_TAG_OPEN:if(this.markup.charAt(k)==marknote.constants.TAG_OPEN){e=true}if(f.hasValue()){m.push(f)}f=new marknote.Token(this.markup.charAt(k),k);if(f.hasValue()){m.push(f)}f=new marknote.Token("",k+1);break;case marknote.constants.TOKENTYPE_QUOTE:if(f.hasValue()){m.push(f)}f=new marknote.Token(this.markup.charAt(k),k);f.isLiteral=true;n=this.markup.charAt(k);for(++k;k<this.markup.length;k++){f.content+=this.markup.charAt(k);if(this.markup.charAt(k)==n){if(f.hasValue()){m.push(f)}f=new marknote.Token("",k+1);break}}break;case marknote.constants.TOKENTYPE_COMMENT_START:if(f.hasValue()){m.push(f)}f=new marknote.Token(marknote.constants.COMMENT_START,k);m.push(f);n=marknote.constants.COMMENT_END;d=k+4;for(k=d;k<this.markup.length;k++){if(this.markup.slice(k,k+3)==n){l=this.markup.slice(d,k);f=new marknote.Token(l,d);f.isLiteral=true;m.push(f);f=new marknote.Token(n,k);m.push(f);k=k+2;break}}f=new marknote.Token("",k);break;default:f.content+=this.markup.charAt(k);break}}if(f.hasValue()){m.push(f)}return m};marknote.Util=new Object();marknote.Util.hasWhitespace=function(e){if(typeof e=="undefined"||e===null){return false}var d=e+"";var a=new RegExp(/^\s+$/);for(var f=0;f<d.length;f++){var b=d.charAt(f);if(a.test(b)){return true}}return false};marknote.Util.isUndefinedNullOrBlank=function(a){return !marknote.Util.hasValue(a)};marknote.Util.isEmpty=marknote.Util.isUndefinedNullOrBlank;marknote.Util.nothingToBlank=function(a){return marknote.Util.isEmpty(a)?"":a};marknote.Util.isAllWhitespace=function(d){if(typeof(d)=="undefined"||d===null){return false}var b=d+"";for(var e=0;e<b.length;e++){var a=b.charAt(e);if(!marknote.Util.hasWhitespace(a)){return false}}return true};marknote.Util.hasValue=function(b){if(typeof b=="undefined"||b===null){return false}var a=b+"";return !(a.length===0||marknote.Util.isAllWhitespace(a))};marknote.Util.trim=function(b){var a=b+"";return a.replace(/^\s+|\s+$/g,"")};marknote.Util.leftTrim=function(b){var a=b+"";return a.replace(/^\s+/,"")};marknote.Util.rightTrim=function(b){var a=b+"";return a.replace(/\s+$/,"")};marknote.Util.splitByWhitespace=function(b){if(typeof b=="undefined"||b===null){return b}var a=marknote.Util.trim(b)+"";return a.split(/\s+/)};marknote.Util.removeArrayItem=function(d,a){try{for(var b=0;b<d.length;b++){if(b==a){d.splice(b,1)}}}catch(c){}return d};marknote.Util.dataType=function(a){return typeof a!="undefined"&&a!==null&&a.dataType&&typeof a.dataType=="string"&&a.dataType.length>9&&a.dataType.slice(0,9)=="marknote."?a.dataType:typeof a};marknote.Util.replaceAll=function(f,b,e){var a=f+"";var d=0;var c="";while(a.indexOf(b,d)!=-1){c+=a.substring(d,a.indexOf(b,d));c+=e;d=(a.indexOf(b,d)+b.length)}c+=f.substring(d,f.length);return c};marknote.Util.erefEncode=function(b){var a=b+"";return marknote.Util.erefTransform(a,true)};marknote.Util.erefXMLEncode=function(b){var a=b+"";return marknote.Util.erefTransform(a,true,true)};marknote.Util.erefDecode=function(b){var a=b+"";return marknote.Util.erefTransform(a,false)};marknote.Util.erefXMLDecode=function(b){var a=b+"";return marknote.Util.erefTransform(a,false,true)};marknote.Util.erefTransform=function(f,j,k){var g=k?new marknote.XMLEntityRefs().getRefs():new marknote.EntityRefs().getRefs();var c=new String();c+=f;for(var d=0;d<g.length;d++){var b="&"+g[d].name+";";var a=g[d].character;var h=j?a:b;var e=j?b:a;c=marknote.Util.replaceAll(c,h,e)}return marknote.Util.replaceAll(c,"&quot;",'"')};marknote.Writer=function(){this.dataType=marknote.constants.DATATYPE_WRITER;this.isSw8tXmlContent=false};marknote.Writer.prototype.outputDocument=function(l,d){var c=new String();var e=l.getProcessingInstructions();var h=l.getDOCTYPE();for(var b=0;b<e.length;b++){if(b>0){c+="\n"}c+=marknote.constants.PI_START;var f=e[b];c+=f.getTarget();var i=f.getData();for(var k=0;k<i.length;k++){var g=i[k];c+=" "+g.getName()+'="'+g.getValue()+'"'}c+=" "+marknote.constants.PI_END}if(h){c+="\n"+h.toString()}var j=l.getRootElement();c+=this.outputElement(j,0,d);return c};marknote.Writer.prototype.outputElement=function(f,b,e){var d,h,i;d="\n"+this.calculateIndent(b,e)+marknote.constants.TAG_OPEN+f.getName();for(var j=0;j<f.getAttributes().length;j++){var g=f.getAttributeAt(j);d+=" "+g.getName()+marknote.constants.EQUALS+marknote.constants.DQUOTE+g.getValue(false)+marknote.constants.DQUOTE}if(f.isSelfTerminated||!f.hasContents()){d+=" "+marknote.constants.TAG_CLOSE_SELF_TERMINATING;return d}d+=marknote.constants.TAG_CLOSE;if(b===0){b=1}h=this.outputContents(f,b,e);i=f.contents.length==1&&f.getText().length>0&&this.hasStrictText(f)?"":this.calculateIndent(b,e);var c=i+marknote.constants.ENDTAG_OPEN+f.getName()+marknote.constants.TAG_CLOSE;return d+h+c};marknote.Writer.prototype.hasStrictText=function(e){var c=true;for(var b=0;b<e.contents.length;b++){var d=e.getContentAt(b);var a=marknote.Util.dataType(d);if(a!=marknote.constants.DATATYPE_TEXT){return false}}return c};marknote.Writer.prototype.calculateIndent=function(d,a){if(d===0){return""}var c="";a=a&&marknote.Util.isAllWhitespace(a)?a:"\t";for(var b=1;b<d;b++){c+=a}return c};marknote.Writer.prototype.outputContents=function(f,b,e){var a=this.calculateIndent(b+1,e);var m=this.calculateIndent(b+2,e);var d=new String();var j="";var l,k,g;for(var i=0;i<f.getContents().length;i++){var h=f.getContentAt(i);j=marknote.Util.dataType(h);switch(j){case marknote.constants.DATATYPE_COMMENT:d+="\n"+a+marknote.constants.COMMENT_START;k=h.getText();g=k.split("\n");for(l=0;l<g.length;l++){d+="\n"+m+marknote.Util.leftTrim(g[l])}d+="\n"+a+marknote.constants.COMMENT_END;break;case marknote.constants.DATATYPE_ELEMENT:d+=this.outputElement(h,b+1,e);break;case marknote.constants.DATATYPE_TEXT:d+=h.getText(false);break;case marknote.constants.DATATYPE_CDATA:d+="\n"+a+marknote.constants.CDATA_START+"\n"+m+h.getText()+"\n"+a+marknote.constants.CDATA_END;break}}if(j!=marknote.constants.DATATYPE_TEXT){d+="\n"}return d};


/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(obj) {

	var ERR_BAD_FORMAT = "File format is not recognized.";
	var ERR_ENCRYPTED = "File contains encrypted entry.";
	var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
	var ERR_READ = "Error while reading zip file.";
	var ERR_WRITE = "Error while writing zip file.";
	var ERR_WRITE_DATA = "Error while writing file data.";
	var ERR_READ_DATA = "Error while reading file data.";
	var ERR_DUPLICATED_NAME = "File already exists.";
	var CHUNK_SIZE = 512 * 1024;

	var INFLATE_JS = "inflate.js";
	var DEFLATE_JS = "deflate.js";
	
	var TEXT_PLAIN = "text/plain";
	
	var MESSAGE_EVENT = "message";

	var appendABViewSupported;
	try {
		appendABViewSupported = new Blob([ new DataView(new ArrayBuffer(0)) ]).size === 0;
	} catch (e) {
	}

	function Crc32() {
		var crc = -1, that = this;
		that.append = function(data) {
			var offset, table = that.table;
			for (offset = 0; offset < data.length; offset++)
				crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		};
		that.get = function() {
			return ~crc;
		};
	}
	Crc32.prototype.table = (function() {
		var i, j, t, table = [];
		for (i = 0; i < 256; i++) {
			t = i;
			for (j = 0; j < 8; j++)
				if (t & 1)
					t = (t >>> 1) ^ 0xEDB88320;
				else
					t = t >>> 1;
			table[i] = t;
		}
		return table;
	})();

	function blobSlice(blob, index, length) {
		if (blob.slice)
			return blob.slice(index, index + length);
		else if (blob.webkitSlice)
			return blob.webkitSlice(index, index + length);
		else if (blob.mozSlice)
			return blob.mozSlice(index, index + length);
		else if (blob.msSlice)
			return blob.msSlice(index, index + length);
	}

	function getDataHelper(byteLength, bytes) {
		var dataBuffer, dataArray;
		dataBuffer = new ArrayBuffer(byteLength);
		dataArray = new Uint8Array(dataBuffer);
		if (bytes)
			dataArray.set(bytes, 0);
		return {
			buffer : dataBuffer,
			array : dataArray,
			view : new DataView(dataBuffer)
		};
	}

	// Readers
	function Reader() {
	}

	function TextReader(text) {
		var that = this, blobReader;

		function init(callback, onerror) {
			var blob = new Blob([ text ], {
				type : TEXT_PLAIN
			});
			blobReader = new BlobReader(blob);
			blobReader.init(function() {
				that.size = blobReader.size;
				callback();
			}, onerror);
		}

		function readUint8Array(index, length, callback, onerror) {
			blobReader.readUint8Array(index, length, callback, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	TextReader.prototype = new Reader();
	TextReader.prototype.constructor = TextReader;

	function Data64URIReader(dataURI) {
		var that = this, dataStart;

		function init(callback) {
			var dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=")
				dataEnd--;
			dataStart = dataURI.indexOf(",") + 1;
			that.size = Math.floor((dataEnd - dataStart) * 0.75);
			callback();
		}

		function readUint8Array(index, length, callback) {
			var i, data = getDataHelper(length);
			var start = Math.floor(index / 3) * 4;
			var end = Math.ceil((index + length) / 3) * 4;
			var bytes = obj.atob(dataURI.substring(start + dataStart, end + dataStart));
			var delta = index - Math.floor(start / 4) * 3;
			for (i = delta; i < delta + length; i++)
				data.array[i - delta] = bytes.charCodeAt(i);
			callback(data.array);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	Data64URIReader.prototype = new Reader();
	Data64URIReader.prototype.constructor = Data64URIReader;

	function BlobReader(blob) {
		var that = this;

		function init(callback) {
			this.size = blob.size;
			callback();
		}

		function readUint8Array(index, length, callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(new Uint8Array(e.target.result));
			};
			reader.onerror = onerror;
			reader.readAsArrayBuffer(blobSlice(blob, index, length));
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	BlobReader.prototype = new Reader();
	BlobReader.prototype.constructor = BlobReader;

	// Writers

	function Writer() {
	}
	Writer.prototype.getData = function(callback) {
		callback(this.data);
	};

	function TextWriter(encoding) {
		var that = this, blob;

		function init(callback) {
			blob = new Blob([], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : TEXT_PLAIN
			});
			callback();
		}

		function getData(callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(e.target.result);
			};
			reader.onerror = onerror;
			reader.readAsText(blob, encoding);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	TextWriter.prototype = new Writer();
	TextWriter.prototype.constructor = TextWriter;

	function Data64URIWriter(contentType) {
		var that = this, data = "", pending = "";

		function init(callback) {
			data += "data:" + (contentType || "") + ";base64,";
			callback();
		}

		function writeUint8Array(array, callback) {
			var i, delta = pending.length, dataString = pending;
			pending = "";
			for (i = 0; i < (Math.floor((delta + array.length) / 3) * 3) - delta; i++)
				dataString += String.fromCharCode(array[i]);
			for (; i < array.length; i++)
				pending += String.fromCharCode(array[i]);
			if (dataString.length > 2)
				data += obj.btoa(dataString);
			else
				pending = dataString;
			callback();
		}

		function getData(callback) {
			callback(data + obj.btoa(pending));
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	Data64URIWriter.prototype = new Writer();
	Data64URIWriter.prototype.constructor = Data64URIWriter;

	function BlobWriter(contentType) {
		var blob, that = this;

		function init(callback) {
			blob = new Blob([], {
				type : contentType
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : contentType
			});
			callback();
		}

		function getData(callback) {
			callback(blob);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	BlobWriter.prototype = new Writer();
	BlobWriter.prototype.constructor = BlobWriter;

	// inflate/deflate core functions

	function launchWorkerProcess(worker, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize;

		function onflush() {
			worker.removeEventListener(MESSAGE_EVENT, onmessage, false);
			onend(outputSize);
		}

		function onmessage(event) {
			var message = event.data, data = message.data;

			if (message.onappend) {
				outputSize += data.length;
				writer.writeUint8Array(data, function() {
					onappend(false, data);
					step();
				}, onwriteerror);
			}
			if (message.onflush)
				if (data) {
					outputSize += data.length;
					writer.writeUint8Array(data, function() {
						onappend(false, data);
						onflush();
					}, onwriteerror);
				} else
					onflush();
			if (message.progress && onprogress)
				onprogress(index + message.current, size);
		}

		function step() {
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					worker.postMessage({
						append : true,
						data : array
					});
					chunkIndex++;
					if (onprogress)
						onprogress(index, size);
					onappend(true, array);
				}, onreaderror);
			else
				worker.postMessage({
					flush : true
				});
		}

		outputSize = 0;
		worker.addEventListener(MESSAGE_EVENT, onmessage, false);
		step();
	}

	function launchProcess(process, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize = 0;

		function step() {
			var outputData;
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(inputData) {
					var outputData = process.append(inputData, function() {
						if (onprogress)
							onprogress(offset + index, size);
					});
					outputSize += outputData.length;
					onappend(true, inputData);
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						chunkIndex++;
						setTimeout(step, 1);
					}, onwriteerror);
					if (onprogress)
						onprogress(index, size);
				}, onreaderror);
			else {
				outputData = process.flush();
				if (outputData) {
					outputSize += outputData.length;
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						onend(outputSize);
					}, onwriteerror);
				} else
					onend(outputSize);
			}
		}

		step();
	}

	function inflate(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function oninflateappend(sending, array) {
			if (computeCrc32 && !sending)
				crc32.append(array);
		}

		function oninflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		if (obj.zip.useWebWorkers) {
			worker = new Worker(obj.zip.workerScriptsPath + INFLATE_JS);
			launchWorkerProcess(worker, reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		} else
			launchProcess(new obj.zip.Inflater(), reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		return worker;
	}

	function deflate(reader, writer, level, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function ondeflateappend(sending, array) {
			if (sending)
				crc32.append(array);
		}

		function ondeflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		function onmessage() {
			worker.removeEventListener(MESSAGE_EVENT, onmessage, false);
			launchWorkerProcess(worker, reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		}

		if (obj.zip.useWebWorkers) {
			worker = new Worker(obj.zip.workerScriptsPath + DEFLATE_JS);
			worker.addEventListener(MESSAGE_EVENT, onmessage, false);
			worker.postMessage({
				init : true,
				level : level
			});
		} else
			launchProcess(new obj.zip.Deflater(), reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		return worker;
	}

	function copy(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var chunkIndex = 0, crc32 = new Crc32();

		function step() {
			var index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					if (computeCrc32)
						crc32.append(array);
					if (onprogress)
						onprogress(index, size, array);
					writer.writeUint8Array(array, function() {
						chunkIndex++;
						step();
					}, onwriteerror);
				}, onreaderror);
			else
				onend(size, crc32.get());
		}

		step();
	}

	// ZipReader

	function decodeASCII(str) {
		var i, out = "", charCode, extendedASCII = [ '\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB',
				'\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9',
				'\u00FF', '\u00D6', '\u00DC', '\u00F8', '\u00A3', '\u00D8', '\u00D7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1',
				'\u00AA', '\u00BA', '\u00BF', '\u00AE', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '_', '_', '_', '\u00A6', '\u00A6',
				'\u00C1', '\u00C2', '\u00C0', '\u00A9', '\u00A6', '\u00A6', '+', '+', '\u00A2', '\u00A5', '+', '+', '-', '-', '+', '-', '+', '\u00E3',
				'\u00C3', '+', '+', '-', '-', '\u00A6', '-', '+', '\u00A4', '\u00F0', '\u00D0', '\u00CA', '\u00CB', '\u00C8', 'i', '\u00CD', '\u00CE',
				'\u00CF', '+', '+', '_', '_', '\u00A6', '\u00CC', '_', '\u00D3', '\u00DF', '\u00D4', '\u00D2', '\u00F5', '\u00D5', '\u00B5', '\u00FE',
				'\u00DE', '\u00DA', '\u00DB', '\u00D9', '\u00FD', '\u00DD', '\u00AF', '\u00B4', '\u00AD', '\u00B1', '_', '\u00BE', '\u00B6', '\u00A7',
				'\u00F7', '\u00B8', '\u00B0', '\u00A8', '\u00B7', '\u00B9', '\u00B3', '\u00B2', '_', ' ' ];
		for (i = 0; i < str.length; i++) {
			charCode = str.charCodeAt(i) & 0xFF;
			if (charCode > 127)
				out += extendedASCII[charCode - 128];
			else
				out += String.fromCharCode(charCode);
		}
		return out;
	}

	function decodeUTF8(string) {
		return decodeURIComponent(escape(string));
	}

	function getString(bytes) {
		var i, str = "";
		for (i = 0; i < bytes.length; i++)
			str += String.fromCharCode(bytes[i]);
		return str;
	}

	function getDate(timeRaw) {
		var date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5,
					(time & 0x001F) * 2, 0);
		} catch (e) {
		}
	}

	function readCommonHeader(entry, data, index, centralDirectory, onerror) {
		entry.version = data.view.getUint16(index, true);
		entry.bitFlag = data.view.getUint16(index + 2, true);
		entry.compressionMethod = data.view.getUint16(index + 4, true);
		entry.lastModDateRaw = data.view.getUint32(index + 6, true);
		entry.lastModDate = getDate(entry.lastModDateRaw);
		if ((entry.bitFlag & 0x01) === 0x01) {
			onerror(ERR_ENCRYPTED);
			return;
		}
		if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
			entry.crc32 = data.view.getUint32(index + 10, true);
			entry.compressedSize = data.view.getUint32(index + 14, true);
			entry.uncompressedSize = data.view.getUint32(index + 18, true);
		}
		if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
			onerror(ERR_ZIP64);
			return;
		}
		entry.filenameLength = data.view.getUint16(index + 22, true);
		entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}

	function createZipReader(reader, onerror) {
		function Entry() {
		}

		Entry.prototype.getData = function(writer, onend, onprogress, checkCrc32) {
			var that = this, worker;

			function terminate(callback, param) {
				if (worker)
					worker.terminate();
				worker = null;
				if (callback)
					callback(param);
			}

			function testCrc32(crc32) {
				var dataCrc32 = getDataHelper(4);
				dataCrc32.view.setUint32(0, crc32);
				return that.crc32 == dataCrc32.view.getUint32(0);
			}

			function getWriterData(uncompressedSize, crc32) {
				if (checkCrc32 && !testCrc32(crc32))
					onreaderror();
				else
					writer.getData(function(data) {
						terminate(onend, data);
					});
			}

			function onreaderror() {
				terminate(onerror, ERR_READ_DATA);
			}

			function onwriteerror() {
				terminate(onerror, ERR_WRITE_DATA);
			}

			reader.readUint8Array(that.offset, 30, function(bytes) {
				var data = getDataHelper(bytes.length, bytes), dataOffset;
				if (data.view.getUint32(0) != 0x504b0304) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				readCommonHeader(that, data, 4, false, onerror);
				dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
				writer.init(function() {
					if (that.compressionMethod === 0)
						copy(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
					else
						worker = inflate(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
				}, onwriteerror);
			}, onreaderror);
		};

		function seekEOCDR(offset, entriesCallback) {
			reader.readUint8Array(reader.size - offset, offset, function(bytes) {
				var dataView = getDataHelper(bytes.length, bytes).view;
				if (dataView.getUint32(0) != 0x504b0506) {
					seekEOCDR(offset + 1, entriesCallback);
				} else {
					entriesCallback(dataView);
				}
			}, function() {
				onerror(ERR_READ);
			});
		}

		return {
			getEntries : function(callback) {
				if (reader.size < 22) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				// look for End of central directory record
				seekEOCDR(22, function(dataView) {
					var datalength, fileslength;
					datalength = dataView.getUint32(16, true);
					fileslength = dataView.getUint16(8, true);
					reader.readUint8Array(datalength, reader.size - datalength, function(bytes) {
						var i, index = 0, entries = [], entry, filename, comment, data = getDataHelper(bytes.length, bytes);
						for (i = 0; i < fileslength; i++) {
							entry = new Entry();
							if (data.view.getUint32(index) != 0x504b0102) {
								onerror(ERR_BAD_FORMAT);
								return;
							}
							readCommonHeader(entry, data, index + 6, true, onerror);
							entry.commentLength = data.view.getUint16(index + 32, true);
							entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
							entry.offset = data.view.getUint32(index + 42, true);
							filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
							entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
							if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/")
								entry.directory = true;
							comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46
									+ entry.filenameLength + entry.extraFieldLength + entry.commentLength));
							entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
							entries.push(entry);
							index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
						}
						callback(entries);
					}, function() {
						onerror(ERR_READ);
					});
				});
			},
			close : function(callback) {
				if (callback)
					callback();
			}
		};
	}

	// ZipWriter

	function encodeUTF8(string) {
		return unescape(encodeURIComponent(string));
	}

	function getBytes(str) {
		var i, array = [];
		for (i = 0; i < str.length; i++)
			array.push(str.charCodeAt(i));
		return array;
	}

	function createZipWriter(writer, onerror, dontDeflate) {
		var worker, files = {}, filenames = [], datalength = 0;

		function terminate(callback, message) {
			if (worker)
				worker.terminate();
			worker = null;
			if (callback)
				callback(message);
		}

		function onwriteerror() {
			terminate(onerror, ERR_WRITE);
		}

		function onreaderror() {
			terminate(onerror, ERR_READ_DATA);
		}

		return {
			add : function(name, reader, onend, onprogress, options) {
				var header, filename, date;

				function writeHeader(callback) {
					var data;
					date = options.lastModDate || new Date();
					header = getDataHelper(26);
					files[name] = {
						headerArray : header.array,
						directory : options.directory,
						filename : filename,
						offset : datalength,
						comment : getBytes(encodeUTF8(options.comment || ""))
					};
					header.view.setUint32(0, 0x14000808);
					if (options.version)
						header.view.setUint8(0, options.version);
					if (!dontDeflate && options.level !== 0 && !options.directory)
						header.view.setUint16(4, 0x0800);
					header.view.setUint16(6, (((date.getHours() << 6) | date.getMinutes()) << 5) | date.getSeconds() / 2, true);
					header.view.setUint16(8, ((((date.getFullYear() - 1980) << 4) | (date.getMonth() + 1)) << 5) | date.getDate(), true);
					header.view.setUint16(22, filename.length, true);
					data = getDataHelper(30 + filename.length);
					data.view.setUint32(0, 0x504b0304);
					data.array.set(header.array, 4);
					data.array.set(filename, 30);
					datalength += data.array.length;
					writer.writeUint8Array(data.array, callback, onwriteerror);
				}

				function writeFooter(compressedLength, crc32) {
					var footer = getDataHelper(16);
					datalength += compressedLength || 0;
					footer.view.setUint32(0, 0x504b0708);
					if (typeof crc32 != "undefined") {
						header.view.setUint32(10, crc32, true);
						footer.view.setUint32(4, crc32, true);
					}
					if (reader) {
						footer.view.setUint32(8, compressedLength, true);
						header.view.setUint32(14, compressedLength, true);
						footer.view.setUint32(12, reader.size, true);
						header.view.setUint32(18, reader.size, true);
					}
					writer.writeUint8Array(footer.array, function() {
						datalength += 16;
						terminate(onend);
					}, onwriteerror);
				}

				function writeFile() {
					options = options || {};
					name = name.trim();
					if (options.directory && name.charAt(name.length - 1) != "/")
						name += "/";
					if (files.hasOwnProperty(name)) {
						onerror(ERR_DUPLICATED_NAME);
						return;
					}
					filename = getBytes(encodeUTF8(name));
					filenames.push(name);
					writeHeader(function() {
						if (reader)
							if (dontDeflate || options.level === 0)
								copy(reader, writer, 0, reader.size, true, writeFooter, onprogress, onreaderror, onwriteerror);
							else
								worker = deflate(reader, writer, options.level, writeFooter, onprogress, onreaderror, onwriteerror);
						else
							writeFooter();
					}, onwriteerror);
				}

				if (reader)
					reader.init(writeFile, onreaderror);
				else
					writeFile();
			},
			close : function(callback) {
				var data, length = 0, index = 0, indexFilename, file;
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					length += 46 + file.filename.length + file.comment.length;
				}
				data = getDataHelper(length + 22);
				for (indexFilename = 0; indexFilename < filenames.length; indexFilename++) {
					file = files[filenames[indexFilename]];
					data.view.setUint32(index, 0x504b0102);
					data.view.setUint16(index + 4, 0x1400);
					data.array.set(file.headerArray, index + 6);
					data.view.setUint16(index + 32, file.comment.length, true);
					if (file.directory)
						data.view.setUint8(index + 38, 0x10);
					data.view.setUint32(index + 42, file.offset, true);
					data.array.set(file.filename, index + 46);
					data.array.set(file.comment, index + 46 + file.filename.length);
					index += 46 + file.filename.length + file.comment.length;
				}
				data.view.setUint32(index, 0x504b0506);
				data.view.setUint16(index + 8, filenames.length, true);
				data.view.setUint16(index + 10, filenames.length, true);
				data.view.setUint32(index + 12, length, true);
				data.view.setUint32(index + 16, datalength, true);
				writer.writeUint8Array(data.array, function() {
					terminate(function() {
						writer.getData(callback);
					});
				}, onwriteerror);
			}
		};
	}

	obj.zip = {
		Reader : Reader,
		Writer : Writer,
		BlobReader : BlobReader,
		Data64URIReader : Data64URIReader,
		TextReader : TextReader,
		BlobWriter : BlobWriter,
		Data64URIWriter : Data64URIWriter,
		TextWriter : TextWriter,
		createReader : function(reader, callback, onerror) {
			reader.init(function() {
				callback(createZipReader(reader, onerror));
			}, onerror);
		},
		createWriter : function(writer, callback, onerror, dontDeflate) {
			writer.init(function() {
				callback(createZipWriter(writer, onerror, dontDeflate));
			}, onerror);
		},
		workerScriptsPath : "",
		useWebWorkers : true
	};

})(this);

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

function CompressedFile(name, data)
{
    this.name = name;
    this.data = data;
}

CompressedFile.prototype.getName = function()
{
    return this.name;
}

CompressedFile.prototype.getData = function()
{
    return this.data;
}
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

function ZipReader(blob, callback)
{
    this.files = [];
    this.numFiles = 0;
    this.handledFiles = 0;
    this.reader = null;
    this.currentFile = null;
    
    var that = this;
    
    var emptyFunction = function()
    {
    }
    
    var getDataFunction = function(name, data)
    {
        var file = new CompressedFile(name, data);
        alert(file + " " + that);
        that.files.push(file);
        
        that.handledFiles++;
        if (that.numFiles == that.handledFiles)
        {
            that.reader.close();
            callback(that);
        }
    }
    
    var handleEntryFunction = function(entries)
    {
        that.numFiles = entries.length;
        alert("got " + that.numFiles + " entries");
        
        for (var i = 0; i < entries.length; i++)
        {
            var entry = entries[i];
            var name = entry.filename;
            entry.getData(new zip.BlobWriter("text/plain"), function(data) { getDataFunction(name, data); });
        }
    }
    var readingFunction = function(reader)
    {
        that.reader = reader;
        that.reader.getEntries(handleEntryFunction);     
    }
    
    zip.createReader(new zip.BlobReader(blob), readingFunction, emptyFunction);
}

ZipReader.prototype.getFiles = function()
{
    return this.files;
}
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

function BaseNode(name)
{
	this.name = name;
}

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

function TextNode(name)
{
    this.name = name;
    this.value = "";
}

TextNode.prototype.load = function(dom_element)
{
    this.value = dom_element.getText();
}

TextNode.prototype.getText = function()
{
    return this.value;
}

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

function ActionNode()
{
}

ActionNode.prototype = new BaseNode("action");

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

function FileNameNode()
{
}

FileNameNode.prototype = new TextNode("fileName");

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

function NameNode()
{
}

NameNode.prototype = new TextNode("name");

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

function TypeNode()
{
}

TypeNode.prototype = new TextNode("type");

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

function ValueNode()
{
}

ValueNode.prototype = new TextNode("value");

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

function LookNode()
{
    this.displayName = new NameNode();
    this.fileName = new FileNameNode();
}

LookNode.prototype = new BaseNode("look");

LookNode.prototype.getDisplayName = function()
{
    return this.displayName.value;
}

LookNode.prototype.getFileName = function()
{
    return this.fileName.value;
}

LookNode.prototype.load = function(dom_element)
{
    Utils.loadChild(this.displayName, dom_element);
    Utils.loadChild(this.fileName, dom_element);
}
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
    this.list = Utils.loadChildrenList(LookNode, dom_element);
}

LookListNode.prototype.getLength = function()
{
    return this.list.length;
}

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
    this.applicationBuildName = "";
    this.applicationBuildNumber = "";
    this.applicationName = "";
    this.applicationVersion = "";
    this.catrobatLanguageVersion = "";
    this.dateTimeUpload = "";
    this.description = "";
    this.deviceName = "";
    this.mediaLicense = "";
    this.platform = "";
    this.platformVersion = "";
    this.programLicense = "";
    this.programName = "";
    this.programScreenshotManuallyTaken = "";
    this.remixOf = "";
    this.screenHeight = "";
    this.screenWidth = "";
    this.tags = "";
    this.url = "";
    this.userHandle = "";
}

HeaderNode.prototype = new BaseNode("header");

function getChildText(dom_element, name)
{
    var child = null;
    child = dom_element.getChildElement(name);
    if (child)
        return child.getText();
    else
        return "";
}

HeaderNode.prototype.load = function(dom_element)
{
    this.applicationBuildName = getChildText(dom_element, "applicationBuildName");
    this.applicationBuildNumber = getChildText(dom_element, "applicationBuildNumber");
    this.applicationName = getChildText(dom_element, "applicationName");
    this.applicationVersion = getChildText(dom_element, "applicationVersion");
    this.catrobatLanguageVersion = getChildText(dom_element, "catrobatLanguageVersion");
    this.dateTimeUpload = getChildText(dom_element, "dateTimeUpload");
    this.description = getChildText(dom_element, "description");
    this.deviceName = getChildText(dom_element, "deviceName");
    this.mediaLicense = getChildText(dom_element, "mediaLicense");
    this.platform = getChildText(dom_element, "platform");
    this.platformVersion = getChildText(dom_element, "platformVersion");
    this.programLicense = getChildText(dom_element, "programLicense");
    this.programName = getChildText(dom_element, "programName");
    this.programScreenshotManuallyTaken = getChildText(dom_element, "programScreenshotManuallyTaken");
    this.remixOf = getChildText(dom_element, "remixOf");
    this.screenHeight = getChildText(dom_element, "screenHeight");
    this.screenWidth = getChildText(dom_element, "screenWidth");
    this.tags = getChildText(dom_element, "tags");
    this.url = getChildText(dom_element, "url");
    this.userHandle = getChildText(dom_element, "userHandle");
}

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
    return "<h3>Hintergrund</h3>\n";
}

ProgramViewCreator.prototype.createObjectButton = function(object)
{
    return "<div data-role=\"collapsible\">\
            <h3> " + object.getDisplayName() + " </h3>\
            <div class=\"object_details\">\
              <div class=\"ui-grid-a\">\
                <div class=\"ui-block-a\">\
                  <ul>\
                    <li>\
                      Skripte: <span>" + object.getNumberOfScripts() + "</span>\
                    </li>\
                    <li>\
                      Aussehen: <span>" + object.getNumberOfLooks() + "</span>\
                    </li>\
                  </ul>\
                </div>\
                <div class=\"ui-block-b\">\
                  <ul>\
                    <li>\
                      Bausteine: <span>0</span>\
                    </li>\
                    <li>\
                      Kl&auml;nge: <span>" + object.getNumberOfSounds() + "</span>\
                    </li>\
                  </ul>\
                </div>\
              </div>\
            </div>\
          </div>\n";
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
    return "<h3>Objekte</h3>\n";
}

