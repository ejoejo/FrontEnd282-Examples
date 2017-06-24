var Collection = require('./collection');

function MyStorage(type) {
    if (type === "localStorage")
        this.storage = localStorage;
    else if (type === "sessionStorage")
        this.storage = sessionStorage;
    else
        this.storage = localStorage;
    this.collections = {};
}


MyStorage.prototype.createCollection = function (name) {
    var collection = new Collection(name);
    this.collections[name] = collection;
    this.setItem(collection.name + "-keys", collection.keys);
};

MyStorage.prototype.getCollection = function (name) {
    var keys = this.getItem(name + "-keys");
    if (!keys) {
        this.createCollection(name);
        return this.getItem(name + "-keys");
    }
    return keys;
};

MyStorage.prototype.getItem = function (key) {
    return JSON.parse(this.storage.getItem(key));
};

MyStorage.prototype.setItem = function (key, value) {
    this.storage.setItem(key, JSON.stringify(value));
};

MyStorage.prototype.insert = function (collectionName, item) {
    var orgkey = this.getCollection('notes');

    var collection = new Collection(collectionName);
    this.collections[collectionName] = collection;
    collection = this.collections[collectionName];
    collection.insert(item);
    var keys = collection.keys;
    var key = keys[keys.length - 1];
    this.setItem(collection.name + "-keys", keys);
    this.setItem(key, item);

    var newinput = [];
    if (orgkey.length > 0) {
        for (var index = 0; index < orgkey.length; index++) {
            newinput.push(orgkey[index]);
        }
        newinput.push(key);
        this.setItem("notes-keys", newinput);
    }
};

MyStorage.prototype.delete = function (key) {
    var keys = this.getCollection('notes');
    for (var index = 0; index < keys.length; index++) {
        if (keys[index] === key)
            keys.splice(index, 1);
    }
    this.setItem("notes-keys", keys);
};


MyStorage.prototype.find = function (filter) {

};

module.exports = MyStorage;