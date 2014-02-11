var sendMessage = function (moudel, act, data) {
    try {
        setTimeout(function () {
            chrome.tabs.query({title: chrome.i18n.getMessage("title"), url: "chrome://newtab/"}, function (tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, {active: true}, function (tab) {
                        if (typeof chrome.tabs.sendMessage == 'function') {
                            chrome.tabs.sendMessage(tab['id'], {"model": moudel, "act": act, "data": data})
                        } else {
                            chrome.tabs.sendRequest(tab['id'], {"model": moudel, "act": act, "data": data})
                        }
                    })
                } else {
                    chrome.tabs.create({url: "chrome://newtab/", selected: true}, function (tab) {
                        setTimeout(function () {
                            if (typeof chrome.tabs.sendMessage == 'function') {
                                chrome.tabs.sendMessage(tab['id'], {"model": moudel, "act": act, "data": data})
                            } else {
                                chrome.tabs.sendRequest(tab['id'], {"model": moudel, "act": act, "data": data})
                            }
                        }, 200)
                    })
                }
            })
        }, 500)
    } catch (e) {
    }
};
try {
    var _setup = JSON.parse(localStorage.getItem("setup"));
    var contextMenusSwitch = typeof _setup["contextMenusSwitch"] == "undefined" ? true : _setup["contextMenusSwitch"]
} catch (e) {
    var contextMenusSwitch = true
}
if (contextMenusSwitch) {
    chrome.contextMenus.create({id: "addToDialbox", title: chrome.i18n.getMessage("contextMenusAddToDialbox")}, function () {
    })
}
function showNotification(opts) {
    if (typeof opts == "string") {
        var ext = new XMLHttpRequest();
        ext.onreadystatechange = function () {
            if (ext.readyState == 4) {
                try {
                    if (JSON.parse(ext.responseText)) {
                        var result = JSON.parse(ext.responseText);
                        createNotification(result)
                    }
                } catch (e) {
                }
            }
        };
        try {
            ext.open("GET", opts, true);
            ext.send()
        } catch (e) {
        }
    } else if (typeof opts == "object") {
        createNotification(opts)
    }
}
function createNotification(opts) {
    if (typeof webkitNotifications.createHTMLNotification == "undefined") {
        chrome.notifications.create("", opts, function (id) {
        })
    } else {
        var notification = webkitNotifications.createNotification(opts.iconUrl, opts.title, opts.message);
        notification.show();
        setTimeout(function () {
            notification.close()
        }, 5000)
    }
}
var notifyHander = function (message, sender, sendResponse) {
    if (message.model == "notification") {
        if (message.act == "show") {
            showNotification(message.data.opts.url)
        }
    }
};
if (typeof chrome.extension.onMessage != "undefined") {
    chrome.extension.onMessage.addListener(notifyHander)
} else {
    chrome.extension.onRequest.addListener(notifyHander)
}
chrome.contextMenus.onClicked.addListener(function (info, data) {
    if (info.menuItemId == "addToDialbox") {
        sendMessage("website", "insert", data)
    }
});
chrome.management.onInstalled.addListener(function (data) {
    if (data.appLaunchUrl || data.type == "packaged_app") {
        sendMessage("extension", "installed", data)
    }
});
chrome.management.onUninstalled.addListener(function (data) {
    if (data.appLaunchUrl || data.type == "packaged_app") {
        sendMessage("extension", "unstalled", data)
    }
});
chrome.management.onDisabled.addListener(function (data) {
    if (data.appLaunchUrl || data.type == "packaged_app") {
        sendMessage("extension", "disabled", data)
    }
});