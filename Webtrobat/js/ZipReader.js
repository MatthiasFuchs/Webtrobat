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