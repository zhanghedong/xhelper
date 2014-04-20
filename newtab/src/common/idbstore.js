var idbStore = angular.module('idbStore', []);
idbStore.factory('IDBStore', function() {
    return window.IDBStore; // assumes underscore has already been loaded on the page
});