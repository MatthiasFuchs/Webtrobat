
// IndexedDB
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
dbVersion = 14;
dbRecent = "recent";
dbProjects = "projects";
 
// Create/open database
var request = indexedDB.open("elephantFiles", dbVersion);
db = null;

createObjectStoreRecent = function(dataBase)
{
    try
    {
        dataBase.deleteObjectStore(dbRecent);
    }
    catch(e)
    {
    }
    dataBase.createObjectStore(dbRecent);
}

createObjectStoreProjects = function(dataBase)
{
    try
    {
        dataBase.deleteObjectStore(dbProjects);
    }
    catch(e)
    {
    }
    var objectStore = dataBase.createObjectStore(dbProjects, { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("script", "script", { unique: false });
}

createObjectStore = function(dataBase)
{
    // Create an objectStore
    console.log("Creating objectStore");
    
    createObjectStoreRecent(dataBase);
    createObjectStoreProjects(dataBase);

};

setRecentProjectId = function(projectId)
{
    console.log("Putting projectId in IndexedDB");
    
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


putProject = function(project)
{
    console.log("Putting project in IndexedDB");
    
    // Open a transaction to the database
    var transaction = db.transaction([dbProjects], "readwrite");
    
    // Put the blob into the dabase
    var put = transaction.objectStore(dbProjects).put(project);
};

getProject = function(id, callback)
{
    var transaction = db.transaction([dbProjects]);
    
    var objectStore = transaction.objectStore(dbProjects);
    objectStore.get(id).onsuccess = function (event)
    {
        var value = event.target.result;
        callback({id: value.id, name: value.name, script: value.script});
    }
}

getAllProjects = function(callback)
{
    var transaction = db.transaction([dbProjects]);
    var objectStore = transaction.objectStore(dbProjects);
    var result = [];
    
    objectStore.openCursor().onsuccess = function(event)
    {
        var cursor = event.target.result;
        if (cursor)
        {
            var value = cursor.value;
            result.push({id: value.id, name: value.name, script: value.script});
            cursor.continue();
        }
        else
        {
            callback(result);
        }
    };
}

request.onerror = function(event)
{
    console.log("Error creating/accessing IndexedDB database");
};

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event)
{
    createObjectStore(event.target.result);
};
