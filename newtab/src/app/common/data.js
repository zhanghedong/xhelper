var ntp = window.ntp || {};
chrome.storage.local.set({'ntp_sites':''});
//chrome.storage.local.set({'ntp_blog':''});
//chrome.storage.local.set({'ntp_sites':''});
(function(){
//    var storage = chrome.storage;
    ntp.localData = {
        getTopSites: function (callback) {
            chrome.topSites.get(function (d) {
                callback(d);
            });
        },
        getLocalSites: function (callback) {
            chrome.storage.local.get('ntp_sites', function (data) {
                callback(data.ntp_sites);
            });
        },
        setLocalSites: function (data, callback) {
            chrome.storage.local.set({'ntp_sites': data}, function (data) { });
        },
        getNote:function(callback){
            chrome.storage.local.get('ntp_note', function (data) {
                callback(data.ntp_note);
            });
        },
        setNote:function(note){
            chrome.storage.local.set({'ntp_note': note}, function (data) {});
        },
        getBlog:function(callback){
            chrome.storage.local.get('ntp_blog', function (data) {
                callback(data.ntp_blog);
            });
        },
        setBlog:function(data,callback){
            chrome.storage.local.set({'ntp_blog': data}, function (data) {});
        }
    };
}());
