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
   var sites = {"askfm":{"title":"Ask FM","color":"#CDD5DD","logo":""},"9gag":{"title":"9GAG","color":"#000000","logo":"/resource/logo/9gag.svg"},"lolwall":{"title":"LOL Wall","color":"#d1dae9","logo":""},"funnyordie":{"title":"Funny or Die","color":"#ffe100","logo":""},"cheezburger":{"title":"Cheezburger","color":"#00718F","logo":""},"cracked":{"title":"Cracked","color":"#ffcc00","logo":""},"failblog":{"title":"FAIL Blog","color":"#00718F","logo":""},"collegehumor":{"title":"College Humor","color":"#F9A01E","logo":""},"happyplace":{"title":"HappyPlace","color":"#E02A10","logo":""},"necessarycoolness":{"title":"Necessary Coolness","color":"#E06C69","logo":""},"uncrate":{"title":"Uncrate","color":"#020202","logo":""},"gearpatrol":{"title":"Gear Patrol","color":"#ffffff","logo":""},"werd":{"title":"Werd","color":"#8DFF87","logo":""},"coolmaterial":{"title":"Cool Material","color":"#000000","logo":""},"menshealth":{"title":"Men's Health","color":"#FF3300","logo":""},"artofmanliness":{"title":"The Art Of Manliness","color":"#020001","logo":""},"theawesomer":{"title":"The Awesomer","color":"#ffffff","logo":""},"guyism":{"title":"guyism","color":"#433D3F","logo":""},"brobible":{"title":"BroBible","color":"#1C4F7E","logo":""},"songza":{"title":"Songza","color":"#00A4F2","logo":""},"pandora":{"title":"Pandora","color":"#5d84ae","logo":"/resource/logo/pandora.svg"},"spotify":{"title":"Spotify","color":"#94c004","logo":"/resource/logo/spotify.svg"},"soundcloud":{"title":"SoundCloud","color":"#fb6a17","logo":"/resource/logo/soundcloud.svg"},"yahoonews":{"title":"Yahoo! News","color":"#2d1152","logo":""},"nytimes":{"title":"New York Times","color":"#000000","logo":"/resource/logo/nytimes.svg"},"newsy":{"title":"Newsy","color":"#49a6ee","logo":""},"huffingtonpost":{"title":"Huffington Post","color":"#2d7061","logo":""},"businessinsider":{"title":"Business Insider","color":"#346981","logo":""},"buzzfeed":{"title":"Buzz Feed","color":"#ee3322","logo":""},"500px":{"title":"500px","color":"#ffffff","logo":""},"flickr":{"title":"flickr","color":"#0972de","logo":"/resource/logo/flickr.svg"},"natgeophoto":{"title":"National Geographic Photography","color":"#FFCC00","logo":""},"timelightbox":{"title":"Time-LightBox","color":"#B8B6B7","logo":""},"theimpossiblecool":{"title":"The Impossible Cool","color":"#000000","logo":""},"purephoto":{"title":"PurePhoto","color":"#3789BB","logo":""},"totallycoolpix":{"title":"Totally Cool Pix","color":"#3D3C3E","logo":""},"epicurious":{"title":"Epicurious","color":"#ffffff","logo":""},"allrecipes":{"title":"all recipes","color":"#F06821","logo":""},"chow":{"title":"CHOW","color":"#D70400","logo":""},"bakespace":{"title":"BakeSpace","color":"#ffffff","logo":""},"foodnetwork":{"title":"Food Network","color":"#C4110A","logo":""},"fancy":{"title":"FANCY","color":"#dcedfa","logo":""},"mrporter":{"title":"MR PORTER","color":"#242424","logo":""},"asos":{"title":"ASOS","color":"#131313","logo":""},"gilt":{"title":"GILT","color":"#2B2B2B","logo":""},"svpply":{"title":"SVPPLY","color":"#ffffff","logo":""},"nuji":{"title":"Nuji","color":"#060606","logo":""},"shopience":{"title":"shopience","color":"#ffffff","logo":""},"wanelo":{"title":"Wanelo","color":"#ded89a","logo":""},"jcrew":{"title":"J.Crew","color":"#231F20","logo":""},"tripadvisor":{"title":"Trip Advisor","color":"#5A9640","logo":"/resource/logo/tripadvisor.svg"},"kayak":{"title":"KAYAK","color":"#ED7100","logo":""},"tripit":{"title":"TripIt Travel Organizer","color":"#F79D31","logo":"/resource/logo/tripit.svg"},"expedia":{"title":"Expedia Hotels & Flights","color":"#FDEA1F","logo":"/resource/logo/expedia.svg"},"booking":{"title":"Booking.com","color":"#003580","logo":""},"netflix":{"title":"Netflix","color":"#B9090B","logo":"/resource/logo/netflix.svg"},"hulu":{"title":"hulu","color":"#99CC33","logo":""},"amazoniv":{"title":"Amazon Instant Video","color":"#000000","logo":""},"vodlyto":{"title":"vodly.to","color":"#E8F0F4","logo":""},"kickasstorrents":{"title":"Kick Ass Torrents","color":"#D6C476","logo":""},"torrentbutler":{"title":"Torrent Butler","color":"#343434","logo":""},"youtube":{"title":"YouTube","color":"#a9100c","logo":"/resource/logo/youtube.svg"},"movieclips":{"title":"MovieClips","color":"#0AAEFF","logo":""},"liveleak":{"title":"LiveLeak","color":"#87070B","logo":""},"vimeo":{"title":"Vimeo","color":"#2cbae9","logo":"/resource/logo/vimeo.svg"},"ted":{"title":"TED","color":"#FF2B06","logo":""},"accuweather":{"title":"AccuWeather","color":"#F16314","logo":""},"theweatherchannel":{"title":"The Weather Channel","color":"#223E8E","logo":"/resource/logo/theweatherchannel.svg"},"weatherbug":{"title":"WeatherBug","color":"#1D3EAA","logo":"/resource/logo/weatherbug.svg"},"instaweather":{"title":"InstaWeather","color":"#0078CB","logo":""},"noaa":{"title":"NOAA","color":"#00A3E3","logo":"/resource/logo/noaa.svg"},"gmail":{"title":"Gmail","color":"#D80806","logo":"/resource/logo/gmail.svg"},"gameo":{"title":"GAMES","color":"#0FA593","logo":"https://s3.amazonaws.com/IL-spots-gallery/logos/gameo.png"},"google":{"title":"Google","color":"#3369e8","logo":"/resource/logo/google.svg"},"yahoo":{"title":"Yahoo!","color":"#6D319D","logo":"/resource/logo/yahoo.svg"},"bing":{"title":"bing","color":"#D24524","logo":"/resource/logo/bing.svg"},"wikipedia":{"title":"Wikipedia","color":"#000000","logo":"/resource/logo/wikipedia.svg"},"amazon":{"title":"Amazon","color":"#0b0b0b","logo":"/resource/logo/amazon.svg"},"ebay":{"title":"eBay","color":"#E4343C","logo":"/resource/logo/ebay.svg"},"facebook":{"title":"Facebook","color":"#3B5998","logo":"/resource/logo/facebook.svg"},"twitter":{"title":"Twitter","color":"#4099FF","logo":"/resource/logo/twitter.svg"},"linkedin":{"title":"LinkedIn","color":"#007bb6","logo":"/resource/logo/linkedin.svg"},"tumblr":{"title":"Tumblr","color":"#32506d","logo":"/resource/logo/tumblr.svg"}};

    pref.setDefault('version', chrome.runtime.getManifest().version);
    pref.setDefault('geolocationServiceUrl', 'http://ip-api.com/json');
    pref.setDefault('weatherAPI', 'http://api.openweathermap.org/data/2.5/weather');
    pref.setDefault('weatherForecastAPI', 'http://api.openweathermap.org/data/2.5/forecast/daily');
    pref.setDefault('getCity', 'http://61.4.185.48:81/g/');
    pref.setDefault('weatherAPIForCN', 'http://www.weather.com.cn/data/sk/');
    pref.setDefault('weatherForecastAPIForCN', 'http://m.weather.com.cn/data/');
    pref.setDefault('lang', window.navigator.language);
    pref.setDefault('logo', sites);
    NTP.PREF = pref;
}());
