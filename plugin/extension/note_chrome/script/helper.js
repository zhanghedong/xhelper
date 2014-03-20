(function ($) {
    window.noteHelper = function () {
        "use strict";
        var g = {};
        g.params = {
            notificationTimer: 0,
            notification: false,
            notificationData: {}
        };
        var process = {
            getParam: function getParam(url, name) {
                var paramValue = '', arrSource = decodeURI(url).split("&"), i = 0;
                while (i < arrSource.length) {
                    if (arrSource[i].indexOf("=") > 0) {
                        if (arrSource[i].split("=")[0].toLowerCase() == name.toLowerCase()) {
                            paramValue = arrSource[i].split("=")[1];
                            break;
                        }
                    }
                    i++;
                }
                return paramValue;
            },
            base64: function base64() {
                var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                this.encode = function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = _utf8_encode(input);
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output +
                            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                    }
                    return output;
                };
                this.decode = function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (i < input.length) {
                        enc1 = _keyStr.indexOf(input.charAt(i++));
                        enc2 = _keyStr.indexOf(input.charAt(i++));
                        enc3 = _keyStr.indexOf(input.charAt(i++));
                        enc4 = _keyStr.indexOf(input.charAt(i++));
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
                        output = output + String.fromCharCode(chr1);
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
                    }
                    output = _utf8_decode(output);
                    return output;
                };
                var _utf8_encode = function (string) {
                    string = string.replace(/\r\n/g, "\n");
                    var utftext = "";
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }

                    }
                    return utftext;
                };
                var _utf8_decode = function (utftext) {
                    var string = "";
                    var i = 0, c = 0, c1 = 0, c2 = 0 , c3 = 0;
                    while (i < utftext.length) {
                        c = utftext.charCodeAt(i);
                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        } else if ((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i + 1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        } else {
                            c2 = utftext.charCodeAt(i + 1);
                            c3 = utftext.charCodeAt(i + 2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }
                    }
                    return string;
                }
            }
        };
        return {
            init: function () {
//                var base = new process.base64();
//                var value = 'c2lkPXRxNTlpNjBucmE2OGhpZWRmYWF1MDhyYWk2JnVpZD0xMTQzMjI0NDAmdGlkPSZiaWQ9';
//                var url = base.decode(value);
            },
            sidDecode: function (value) {
                var base = new process.base64();
                var url = base.decode(value);
                return process.getParam(url, 'sid');
            },
            uidDecode: function (value) {
                var base = new process.base64();
                var url = base.decode(value);
                return process.getParam(url, 'uid');
            },
            bidDecode: function (value) {
                var base = new process.base64();
                var url = base.decode(value);
                return process.getParam(url, 'bid');
            },
            tidDecode: function (value) {
                var base = new process.base64();
                var url = base.decode(value);
                return process.getParam(url, 'tid');
            },
            getGUID: function () {
                var g = function g() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
                };
                return  (g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g()).toUpperCase();
            },
            closeNotification: function () {
                g.params.notification.cancel();
            },
            getNotificationData: function () {
                return g.params.notificationData
            },
            notifyHTML: function (content, lastTime, title) {
                if (!content) return;
                var havePermission = window.webkitNotifications.checkPermission();
                if (havePermission === 0) {
                    var notification = window.webkitNotifications.createNotification(
                        'http://i.stack.imgur.com/dmHl0.png',
                        title || '操作提示',
                        content
                    );
                    notification.onclick = function () {
                        notification.close();
                    };
                    notification.show();
                    setTimeout(function () {
                        notification.cancel();
                    }, 5000);
                } else {
                    window.webkitNotifications.requestPermission();
                }
//                g.params.notificationData = {
//                    content:content,
//                    title:title || 'Hi:  '+ (window.localStorage['nickName'] || window.localStorage['userName'] || '')
//                };
//                if (g.params.notification) {
//                    clearTimeout(g.params.notificationTimer);
//                    //chrome version below 20 has no such method
//                    if (chrome.extension.sendMessage) {
//                        chrome.extension.sendMessage({name:'sendnotification', data:g.params.notificationData});
//                    }
//                } else {
//                    g.params.notification = webkitNotifications.createHTMLNotification('notification.html');
//                    g.params.notification.addEventListener('close', function (e) {
//                        g.params.notification = null;
//                    });
//                    g.params.notification.show();
//                }
//                if (lastTime !== false) {
//                    g.params.notificationTimer = setTimeout(function () {
//                        g.params.notification && g.params.notification.cancel();
//                    }, lastTime || 5000);
//                }
            }
        };
    }();
    noteHelper.init();
})(jQuery);