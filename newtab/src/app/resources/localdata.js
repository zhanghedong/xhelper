angular.module('resources.localData',['idbStore']);
angular.module('resources.localData').factory('LocalData',['IDBStore',function () {
    var process=null,userData=null,conf = null;
    userData = new IDBStore({
       dbVersion:1,
        storeName:'userData',
        keyPath:'id',
        autoIncrement:false,
        onStoreReady:function(){
            console.log('user data store ready!');
        }
    });
    conf = new IDBStore({
        dbVersion:1,
        storeName:'config',
        keyPath:'id',
        autoIncrement:false,
        onStoreReady:function(){
            console.log('config store ready!');
        }
    });
    process = {
        getTopSite:function(callback){
            chrome.topSites.get(function(data){
                callback(data);
            });
        }
    };

    return {
        pushFavorites:function(){

        },
        getFavorites:function(){

        },
        putNote:function(data,callback){

        },
        getNote:function(callback){

        },
        putBlog:function(data,callback){

        },
        getBlog:function(callback){

        },
        putConfig:function(data,callback){

        },
        getConfig:function(callback){

        }
    };
//    return $resource('http://d.com/apps/newtab/xhr/sites.php?id=:site_id', {}, {
//        query: {method: 'JSON', params: {}, isArray: true},
//        get: {method: 'JSON', params: {}, isArray: true},
//        save: {method: 'JSON', params: {}, isArray: true},
//        remove: {method: 'JSON', params: {}, isArray: true}
//    });
}]);


