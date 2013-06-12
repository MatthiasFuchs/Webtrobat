
// IndexedDB
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
dbVersion = 11;
dbRecent = "webtrobat_recenta";
 
// Create/open database
var request = indexedDB.open("elephantFiles", dbVersion);
db = null;

createObjectStore = function (dataBase)
{
    // Create an objectStore
    console.log("Creating objectStore")
    try
    {
        dataBase.deleteObjectStore(dbRecent);
    }
    catch(e)
    {
    }
    dataBase.createObjectStore(dbRecent);
};
 
setRecentProjectId = function(projectId)
{
    console.log("Putting elephants in IndexedDB");
    
    // Open a transaction to the database
    var transaction = db.transaction([dbRecent], "readwrite");
    
    // Put the blob into the dabase
    var put = transaction.objectStore(dbRecent).put(projectId, dbRecent);
};

getRecentProjectId = function(callback)
{
    var transaction = db.transaction([dbRecent]);
    
    var objectStore = transaction.objectStore(dbRecent);
    objectStore.get(dbRecent).onsuccess = function (event)
    {
        callback(event.target.result);
    }
};

request.onerror = function(event)
{
    console.log("Error creating/accessing IndexedDB database");
};

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event)
{
    createObjectStore(event.target.result);
};
