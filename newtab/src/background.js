//chrome.app.runtime.onLaunched.addListener(function (launchData) {
//});
(function(){
    var process = {
        onClick:function(info,data){
            console.log(info);
            console.log(data);
        }
    };
    chrome.runtime.onInstalled.addListener(function() {
       var parent = chrome.contextMenus.create({"title": "newtab for me"});

        var child1 = chrome.contextMenus.create(
       {"title": "add to ", "parentId": parent, "onclick": process.onClick});
        chrome.contextMenus.onClicked.addListener(function (info, data) {
            var child2 = chrome.contextMenus.create(
                {"title": "add to xxx", "parentId": parent, "onclick": process.onClick});
        });
    });
}());
