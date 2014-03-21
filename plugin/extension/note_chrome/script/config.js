(function () {
    window.noteConfig = function () {
        "use strict";

        var g = {};
        g.params = {
            cookiesTimeout: 2592000
        };
        g.params = {
            blowFish: 'note91chromeplus' + Math.round(new Date().getTime() / 1000)
        };
        g.url = {
//            baseUrl:'http://inner.note.91.com/'
//            baseUrl:'http://api1.note.91.com/'
            baseUrl: 'http://ihome.com/'
        };
        g.themes = {//临时测试地址，等样式确认后发布到WEB端
            "white": {
                "css": 'http://1625.me/temp/note91/themes/theme_1.css',
                "icon": 'http://1625.me/'
            },
            "gray": {
                "css": 'http://1625.me/temp/note91/themes/theme_2.css',
                "icon": 'http://1625.me/'
            }
        };
        var process = {
            getLocalStorage: function (name) {
                return (window.localStorage[name]);
            }
        };
        return {
            url: {
                uploadFile: g.url.baseUrl + 'api/file/upload_file/',
                saveNote: g.url.baseUrl + 'api/create_post/',
                getUserInfo: 'http://uap.91.com/user',
                login: g.url.baseUrl + 'common/log/loginname',
//                getSubDir:g.url.baseUrl + 'web/dirselect/getsubdirsimple',
                getSubDir: g.url.baseUrl + 'api/get_category_index/',
                getTags: g.url.baseUrl + 'api/get_tag_index/',
                webSignIn: 'http://note.91.com/NoteMain/Index.aspx',
                webSignOut: 'http://note.91.com/Logout.aspx'
            },
            getVerifierQueryStr: function () {
                if (process.getLocalStorage('note91tid')) {
                    return '&sid=' + process.getLocalStorage('note91sid') + '&blowfish=' + process.getLocalStorage('note91bid') + '&ticket=' + process.getLocalStorage('note91tid');
                } else {
                    return '&sid=' + process.getLocalStorage('note91sid');
                }
            },
            getSidQueryStr: function () {
                return '&sid=' + process.getLocalStorage('note91sid');
            },
            setLocalStorage: function (name, value) {
                window.localStorage[name] = value;
            },
            getLocalStorage: function (name) {
                return (window.localStorage[name]);
            },
            setSid: function (sid) {
                window.localStorage['note91sid'] = sid;
            },
            getSid: function () {
                return (window.localStorage['note91sid'] || '');
            },
            setUserName: function (userName) {
                window.localStorage['note91chromeusername'] = userName;
            },
            getUserName: function () {
                return (window.localStorage['note91chromeusername'] || '');
            },
            setTicket: function (ticket) {
                window.localStorage['note91chrometicket'] = ticket;
            },
            getTicket: function () {
                return (window.localStorage['note91chrometicket'] || '');
            },
            setTheme: function (themeName) {
                window.localStorage['note91chrometheme'] = g.themes[themeName];
            },
            getTheme: function () {
                return (window.localStorage['note91chrometheme'] || g.themes.white );
            },
            setInspectorSwitch: function (s) {
                window.localStorage['note91chromeinspector'] = s;
            },
            getInspectorSwitch: function () {
                return (window.localStorage['note91chromeinspector'] || 'false');
            },
            setSignInCallback: function (callback) {
                window.localStorage['note91chromelogincallback'] = callback;
            },
            getSignInCallback: function () {
                return (window.localStorage['note91chromelogincallback'] || '');
            },
            getBlowFish: function () {
                return (window.localStorage['note91chromeblowfish'] || g.params.blowFish );
            },
            setBlowFish: function (blowFish) {
                window.localStorage['note91chromeblowfish'] = blowFish;
            },
            getBelongTo: function () {
                return (window.localStorage['note91chromebelongto'] || '00000000-0000-0000-0000-000000000000' );
            },
            setBelongTo: function (belongTo) {
                window.localStorage['note91chromebelongto'] = belongTo;
            }
        };
    }();
})();