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

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported. 
} else {
    alert('The File APIs are not fully supported in this browser.');
}

//-------- Wenn HTML file fertig geladen ist wird dies hier aufgerufen ---------
$(document).ready(function() {
    document.getElementById('files').addEventListener('change', handleTextFileSelect, false);
    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
});

//-------- File laden ---------
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for ( var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type
                || 'n/a', ') - ', f.size, ' bytes, last modified: ',
                f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('')
            + '</ul>';
}

//-------- Text File lesen ---------
function handleTextFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for ( var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('text.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                document.getElementById('list').innerHTML = e.target.result;
            };
        })(f);

        reader.readAsText(f);
    }
}

// -------- Image File lesen ---------
function handleImageSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for ( var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = [ '<img class="thumb" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>' ].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

// -------- In Datei schreiben ----------
// Funktioniert nocht nicht ;)
function onInitFs(fs) {

    fs.root.getFile('blub.txt', {
        create : true
    }, function(fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
                alert("Write success");
            };

            fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };

            // Create a new Blob and write it to log.txt.
            var bb = new BlobBuilder(); // Note: window.WebKitBlobBuilder in
                                        // Chrome 12.
            bb.append('Lorem Ipsum');
            fileWriter.write(bb.getBlob('text/plain'));

        }, errorHandler);

    }, errorHandler);
}


