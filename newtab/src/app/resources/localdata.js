angular.module('resources.localData', ['idbStore']);
angular.module('resources.localData').factory('LocalData', ['IDBStore', function () {
    var process = null, userData = null, userDataReady = false, conf = null, confReady = false;
    userData = new IDBStore({
        dbVersion: 1,
        storeName: 'userData',
        keyPath: 'id',
        autoIncrement: false,
        onStoreReady: function () {
            userDataReady = true;
            //console.log('user data store ready!');
        }
    });
    conf = new IDBStore({
        dbVersion: 1,
        storeName: 'config',
        keyPath: 'id',
        autoIncrement: false,
        onStoreReady: function () {
            confReady = true;
            //console.log('config store ready!');
        }
    });
    process = {
        getTopSite: function (callback) {
            chrome.topSites.get(function (data) {
                callback(data);
            });
        },
        onSuccess: function (id) {
           // console.log('Yeah, dude inserted! insertId is: ' + id);
        },
        onError: function (error) {
            console.log('Oh noes, sth went wrong!', error);
        }
    };

    return {
        getTopSites: function (callback) {
            chrome.topSites.get(function (data) {
                callback(data);
            });
        },
        putUserData: function (data, onSuccess, onError) {
            userData.put(data, onSuccess, onError || process.onError);
        },
        getUserDataById: function (id, callback) {
            var t = setInterval(function () {
                if (userDataReady) {
                    userData.get(id, callback);
                    clearInterval(t);
                }
            });

        },
        putConfig: function (data, callback) {
            conf.put(data, process.onSuccess, process.onError);
        },
        getConfigById: function (id, callback) {
            var t = setInterval(function () {
                if (confReady) {
                    conf.get(id, callback);
                    clearInterval(t);
                }
            });
        }
    };
}]);


