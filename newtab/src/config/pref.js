var NTP = window.NTP || {};
(function () {
    NTP.PREF = NTP.PREF || {};
    var process, helper, localData, g = {}, userData, config = [];
    var pref = {
        init: function () {
            NTP.IDB.getConfig(function (data) {
                angular.forEach(data, function (item) {
                    config[item.id] = item.data;
                });
            });
        },
        get: function (id) {
            return config[id];
        },
        set: function (id,data) {
            config[id] =data;
            NTP.IDB.putConfig({id: id, data: data});
        },
        setDefault:function(id,data){
            _.isUndefined(pref.get(id)) && (config[id] = data)
        },
        remove: function (id) {
            delete config[id];
            NTP.IDB.removeConfig(id);
        },
        restoreDefaults: function () {
            NTP.IDB.clearConfig();
        }
    };
    pref.setDefault('version', chrome.runtime.getManifest().version);
    pref.setDefault('geolocationServiceUrl', 'http://ip-api.com/json');
    pref.setDefault('weatherAPI', 'http://api.openweathermap.org/data/2.5/weather');
    pref.setDefault('weatherForecastAPI', 'http://api.openweathermap.org/data/2.5/forecast/daily');
    pref.setDefault('getCity', 'http://61.4.185.48:81/g/');
    pref.setDefault('weatherAPIForCN', 'http://www.weather.com.cn/data/sk/');
    pref.setDefault('weatherForecastAPIForCN', 'http://m.weather.com.cn/data/');
    pref.setDefault('lang', window.navigator.language);
    NTP.PREF = pref;
}());
