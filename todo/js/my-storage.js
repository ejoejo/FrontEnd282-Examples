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
    this.setItem(collection.name, collection.keys);
};

MyStorage.prototype.getCollection = function (name) {
    var keys = this.getItem(name);
    if (!keys) {
        this.createCollection(name);
        return this.getItem(name);
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
    var newinput = [];
    var Name;
    if (collectionName === "node-order")
        Name = "node";
    var orgkey = this.getCollection(collectionName);
    var collection = new Collection(Name);
    this.collections[Name] = collection;
    collection = this.collections[Name];
    collection.insert(item);
    var keys = collection.keys;
    var key = keys[keys.length - 1];
    this.setItem(collectionName, keys);
    this.setItem(key, item);

    if (orgkey.length > 0) {
        for (var index = 0; index < orgkey.length; index++) {
            newinput.push(orgkey[index]);
        }
        newinput.push(key);
        this.setItem(collectionName, newinput);
    }
};

MyStorage.prototype.delete = function (key) {
    var keys = this.getCollection('node-order');

    var item = this.getItem(key);
    for (var index = 0; index < keys.length; index++) {
        if (keys[index] === key)
            keys.splice(index, 1);
    }
    this.setItem("node-order", keys);
};

module.exports = MyStorage;