var ntp = window.ntp || {};
//chrome.storage.local.set({'ntp_sites':''});
ntp.localData = {
    getTopSites: function (callback) {
        chrome.topSites.get(function (d) {
            callback(d);
        })
    },
    getLocalSites: function (callback) {
        chrome.storage.local.get('ntp_sites', function (data) {
            callback(data.ntp_sites);
        });
    },
    setLocalSites: function (data, callback) {
        chrome.storage.local.set({'ntp_sites': data}, function (data) {
//            callback && callback(data.ntp_sites);
        })
    }
};

