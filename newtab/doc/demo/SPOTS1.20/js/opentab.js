/**
 * Spots - 2014-01-28
 * http://spotsmagic.com
 *
 * Copyright (c) 2014 ironSource
 * Licensed Commercial <http://spotsmagic.com/terms>
 */
function bootstrapSpots(){var a=[];if(0===a.length||!window.location.origin.match(new RegExp("http(s?)://((www.)?)("+a.join("|")+")"))){var b='<div ng-app="spotsOpentab" ng-controller="OpentabMainCtrl" ng-init="initMainCtrl()" id="spots" style="display:none;" ng-include="\''+chrome.extension.getURL("")+"opentab.html'\"></div>";SPOTS.createWrapper(b,"#spots",function(a,b){$(document.body).append(a),angular.bootstrap(b,["spotsOpentab"]),cssFiles=["/css/opentab.css"];var c=_.map(cssFiles,function(a){return $.ajax(chrome.extension.getURL(a)).then(function(a){return a})});$.when.apply($,c).done(function(){var a=document.createElement("style");_.each(arguments,function(b){a.innerHTML+=b}),SPOTS.shadowRoot.appendChild(a)})})}}var googlePlayUtils=function(){return{isSignedIn:function(a){opentabService.post("googlePlayUtils","isSignedIn",[],a,!0)},hasDevices:function(a){opentabService.post("googlePlayUtils","hasDevices",[],a,!0)},googleLogin:function(a,b,c,d){opentabService.post("googlePlayUtils","googleLogin",[a,b,c],d,!1)},getGoogleAccountData:function(a){opentabService.post("googlePlayUtils","getGoogleAccountData",[],a,!1)},doInstall:function(a,b){opentabService.post("googlePlayUtils","doInstall",[a],b,!1)}}}(),spotsManager=function(){return{getSpots:function(a){opentabService.post("spotsManager","getSpots",null,a,!0)},getSpotsArray:function(a){opentabService.post("spotsManager","getSpotsArray",null,a,!1)},getSpotByID:function(a,b){opentabService.post("spotsManager","getSpotByID",[a],b,!1)},spotID:function(a,b){opentabService.post("spotsManager","spotID",[a],b,!0)},getSpot:function(a,b){opentabService.post("spotsManager","getSpot",[a],b,!0)}}}(),utilsAPI=function(){return{decrypt:function(a,b){opentabService.post("utilsAPI","decrypt",[a],b,!0)},encrypt:function(a,b){opentabService.post("utilsAPI","encrypt",[a],b,!0)},getCurrentTimeStamp:function(a){opentabService.post("utilsAPI","getCurrentTimeStamp",[],a,!1)},sendGA:function(a,b,c,d){opentabService.post("utilsAPI","sendGA",[a,b,c],d,!1)}}}(),configAPI=function(){return{getConfig:function(a){opentabService.post("configAPI","getConfig",[],a,!0)},get:function(a,b){opentabService.post("configAPI","get",[a],b,!0)},set:function(a,b,c){config[a]=b,opentabService.post("configAPI","set",[a,b],c,!0)},remove:function(a,b){delete config[a],opentabService.post("configAPI","remove",[a],b,!0)},setDefault:function(a,b,c){opentabService.post("configAPI","setDefault",[a,b],c,!0)}}}(),graphicAssets=function(){return{hexToRgb:function(a,b){opentabService.post("graphicAssets","hexToRgb",[a],b,!0)},rgbToHex:function(a,b,c,d){opentabService.post("graphicAssets","rgbToHex",[a,b,c],d,!0)},shadowColor:function(a,b){opentabService.post("graphicAssets","shadowColor",[a],b,!0)},colorLuminance:function(a,b,c){opentabService.post("graphicAssets","colorLuminance",[a,b],c,!0)},contrastFilter:function(a,b){opentabService.post("graphicAssets","contrastFilter",[a],b,!0)},webColorPicker:function(a,b){opentabService.post("graphicAssets","webColorPicker",[a],b,!1)}}}(),languageManager=function(){return{getLang:function(a){opentabService.post("languageManager","getLang",[],a,!0)},changeLang:function(a,b){opentabService.post("languageManager","changeLang",[a],b,!1)},getLangObj:function(a){opentabService.post("languageManager","getLangObj",[],a,!0)},getDefaultLangObj:function(a){opentabService.post("languageManager","getDefaultLangObj",[],a,!0)}}}(),webappsUtils=function(){return{list:function(a){opentabService.post("webappsUtils","list",[],a,!0)},launch:function(a,b){opentabService.post("webappsUtils","launch",[a],b,!1)},uninstall:function(a,b){opentabService.post("webappsUtils","uninstall",[a],b,!1)}}}(),pushService=function(){return{sendNotification:function(a,b,c,d){opentabService.post("pushService","sendNotification",[a,b,c],d,!1)}}}(),urls=function(){function a(a){return/^(http:\/\/|https:\/\/|ftp:\/\/)/.test(a)}function b(a){var b=a.replace(" ","");return/^[a-zA-Z0-9_]+$/.test(b)&&(b+=".com"),b=b.replace(/\/$/,"")}function c(a){var b=h(a);S(b).startsWith("www.")&&(b=b.substr(4));var c=b.length,d=b.substr(c-4),e=b.substr(c-7,5),f=b.substr(c-6,4);return[".com",".net",".org",".gov",".edu"].indexOf(d)>=0?b=b.substring(0,c-4):[".com.",".net.",".org.",".gov",".edu."].indexOf(e)>=0?b=b.substring(0,c-7):[".co.",".ac.",".org.",".gov",".edu."].indexOf(f)>=0&&(b=b.substring(0,c-6)),b=S(b).contains(".")?S(b).replaceAll("."," ").humanize().capitalize().s:3==b.length?b.toUpperCase():S(b).replaceAll("."," ").humanize().capitalize().s}function d(b){var c=b;return/^[a-zA-Z0-9_]+$/.test(c)&&(c+=".com"),c=c.replace(/\/$/,""),a(c)||(c="http://"+c),c}function e(a){var b=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return b.test(a)?!0:!1}function f(a){var b=a.match(/\[(.*?)\]/g);if("object"==typeof b)for(var c=0;c<b.length;c++){var d=b[c];d=d.substr(1,d.length-2);var e=config[d];void 0==e&&(e="");var f=new RegExp("\\["+d+"\\]","gi");a=a.replace(f,e)}var b=a.match(/\((.*?)\)/g);if("object"==typeof b)for(var c=0;c<b.length;c++){var d=b[c];d=d.substr(1,d.length-2);var e=user[d];void 0==e&&(e="");var f=new RegExp("\\("+d+"\\)","gi");a=a.replace(f,e)}return a}function g(b){return a(b)?b:"http://"+b}function h(a,b){a=g(a);var c=document.createElement("a");c.href=a;var d=c.hostname;return b&&d.indexOf("www.")>=0?d.substr(4):d}function i(a,b){var c=new RegExp(b+"=[-A-Za-z0-9]+");if(!c.exec(a))return!1;var d=c.exec(a)[0].split("=")[1];return d}function j(a){var b=urls.getHostName(a);b=b.replace("www.","");for(var c=!1;!c&&-1!==b.lastIndexOf(".");){var d=b.lastIndexOf(".");b.length-d<=4?b=b.substr(0,d):c=!0}return b}function k(a,b){var c=j(a),d=c.split("").join("\\s?");d=new RegExp(d,"i");var e=d.exec(b);return e?e[0]:b=b.split("|")[0]}function l(a,b){m&&m.abort(),a=g(a),m=$.ajax(a,{dataType:"text",type:"GET",success:function(c){var d=c.match(/<title>(.*?)<\/title>/);if(d){var e=d[1];if(e){var f=urls.getPrettyTitle(a,e);f?b(f):b(e)}else b(j(a))}else b(j(a))},error:function(){b(null)}})}var m;return{hasProtocol:a,name2host:b,url2name:c,getFullURL:d,isValidUrl:e,buildURL:f,ensureURL:g,getHostName:h,urlParameter:i,getBaseDomain:j,getPrettyTitle:k,getTitleByUrl:l}}(),paths={base:chrome.extension.getURL("").slice(0,-1),app:"/app/",img:chrome.extension.getURL("img/"),spots:"/app/spots",partials:"/app/"},app=angular.module("spotsOpentab",[],function(){});app.config(["$anchorScrollProvider",function(a){a.disableAutoScrolling()}]),app.service("$location",[function(){var a={ftp:21,http:80,https:443};angular.extend(this,{absUrl:function(){return location.href},hash:function(){return location.hash.substr(1)},host:function(){return location.host},path:function(a){return a?(location.pathname=a,this):location.pathname},port:function(){return location.port?Number(location.port):a[this.protocol()]||null},protocol:function(){return location.protocol.substr(0,location.protocol.length-1)},replace:function(){return this},search:function(a,b){if(a||b)return this;var c={};return location.search.substr(1).split("&").forEach(function(a){a=a.split("="),c[a[0]]=decodeURIComponent(a[1])}),c},url:function(){return this.path()}})}]),app.directive("ngClickOutside",["$document",function(a){var b;return{restrict:"A",link:function(c,d,e){c.clickedOutside=function(){b=null},d.bind("click",function(a){b||(b=d);var c=b.find(a.target).length>0;c&&a.stopPropagation()}),a.bind("click",function(){b=null,c.$apply(e.ngClickOutside)})}}}]),app.directive("ngLink",function(){var a,b,c=20;return{restrict:"A",link:function(d,e,f){e.mousedown(function(c){a=c.pageX,b=c.pageY}),e.mouseup(function(d){Math.abs(a-d.pageX)<c&&Math.abs(b-d.pageY)<c&&(1==d.which?(d.preventDefault(),config.favoritesOpenInNewTab?tabs.openLinkInNewTab(f.ngLink):window.location.href=urls.getFullURL(f.ngLink)):2==d.which&&(d.preventDefault(),tabs.openLinkInNewTab(f.ngLink)))})}}}),app.directive("colorPicker",["$timeout",function(a){return{require:"ngModel",template:'<div class="color-picker" ng-class="{light:scheme==\'light\'}" ng-model="family"><div class="color-picker-family"><div ng-repeat="i in colors track by $index" class="color-picker-family-item" ng-style="{\'background-color\': i.f, width:(100 / colors.length)+\'%\'}" ng-class="{selected:family==$index}" ng-click="setFamily($index)"></div></div><div class="color-picker-shade"><div class="color-picker-shade-item" ng-repeat="c in colors[family].c track by $index" ng-style="{\'background-color\': c, width:(100 / colors[family].c.length)+\'%\'}" ng-class="{selected:selectedColor==c}" ng-click="setColor(c)"></div></div></div>',scope:{selectedColor:"=color",addColors:"=",ngChange:"&",model:"=ngModel"},link:function(b,c,d){b.colors=[],b.family=0,"light"==d.colorPicker?(b.scheme="light",b.colors=[{f:"#7FAAFF",c:["#7FAAFF","#9DBDFF","#BBD1FF","#D8E5FF","#EBF2FF"]},{f:"#59AEE3",c:["#59AEE3","#7FC0E9","#A6D3F0","#CCE6F6","#E5F2FB"]},{f:"#59CFD0",c:["#59CFD0","#7FDADB","#A6E6E6","#CCF0F1","#E5F8F8"]},{f:"#59B794",c:["#59B794","#7FC7AD","#A6D8C6","#CCE9DE","#E5F4EE"]},{f:"#85CF59",c:["#85CF59","#A1DA7F","#BDE5A6","#D9F0CC","#ECF3E5"]},{f:"#83B159",c:["#83B159","#A0C37F","#BDD5A6","#D9E7CC","#ECF3E5"]},{f:"#F1CA59",c:["#F1CA59","#F4D67F","#F8E2A6","#FBEFCC","#FDF7E5"]},{f:"#DFAC5A",c:["#DFAC5A","#E6BF80","#EED3A7","#F5E6CC","#FAF2E5"]},{f:"#FFB275",c:["#FFB275","#FFC495","#FFD6B5","#FFE7D5","#FFF3E9"]},{f:"#CB6E6E",c:["#CB6E6E","#D78F8F","#E3B1B1","#EFD2D2","#F7E8E8"]},{f:"#FF6859",c:["#FF6859","#FF8B7F","#FFAEA6","#FFD1CC","#FFE7E5"]},{f:"#F65971",c:["#F65971","#F87F92","#FAA6B3","#FCCCD3","#FEE5E9"]},{f:"#FF59AC",c:["#FF59AC","#FF7FBF","#FFA6D2","#FFCCE5","#FFE5F2"]},{f:"#FF97E8",c:["#FF97E8","#FFAFED","#FFC7F3","#FFDFF8","#FFEFFB"]},{f:"#D687FF",c:["#D687FF","#DFA2FF","#E9BEFF","#F2DAFF","#F9ECFF"]},{f:"#9070D8",c:["#9070D8","#A991E1","#C3B3EA","#DDD3F3","#EEE9F9"]},{f:"#BBB6B3",c:["#BBB6B3","#CBC7C4","#DBD8D6","#EAE9E8","#F4F4F3"]},{f:"#96A1A2",c:["#96A1A2","#AEB6B7","#C7CCCD","#DFE2E2","#EFF0F0"]}]):(b.scheme="dark",b.colors=[{f:"#303030",c:["#021416","#1A282A","#303E40","#465557","#5E6E70"]},{f:"#777777",c:["#352F2B","#4C4540","#645D58","#7E7671","#978F8A"]},{f:"#3F00DD",c:["#00006F","#000084","#1E0098","#3B0DAD","#5424C3"]},{f:"#9025FF",c:["#58009D","#6800B3","#9400D5","#A528ED","#C046FF"]},{f:"#FF3EC2",c:["#7F0023","#9E0038","#BD004D","#DD0065","#FF007F"]},{f:"#FE0B6B",c:["#BB0071","#DA008B","#F900A5","#FF3AC1","#FF5FDC"]},{f:"#C03544",c:["#6E0012","#8D0017","#AD001D","#CF0023","#F10025"]},{f:"#FE1C03",c:["#7C0003","#6D0004","#9C0000","#DE0000","#FF1700"]},{f:"#F73600",c:["#660003","#850000","#A40000","#C50000","#E61F00"]},{f:"#FD6C05",c:["#A21200","#C23600","#E25200","#FF6B00","#FF892B"]},{f:"#FEAB07",c:["#713400","#8F4C00","#AD6500","#CB7E00","#EB9900"]},{f:"#FFC91E",c:["#734800","#916000","#AE7900","#CC9300","#EAAD00"]},{f:"#5DA200",c:["#002800","#003C00","#005500","#1F6E00","#418700"]},{f:"#30A700",c:["#004C00","#006400","#007F00","#169900","#43B500"]},{f:"#00AB62",c:["#002900","#004117","#00592C","#007443","#00905B"]},{f:"#00A8A9",c:["#004C51","#006569","#007F82","#009A9C","#00B6B7"]},{f:"#009BF0",c:["#002568","#003981","#00509B","#0068B7","#0082D4"]},{f:"#338AFF",c:["#0023A1","#0037BE","#004DDA","#0064F8","#3B7CFF"]}]),b.$watch("addColors",function(a){a&&_.each(a,function(a){_.findWhere(b.colors,{f:a.f})||b.colors.unshift(a)})},!0),b.$watch("model",function(a){a&&_.each(b.colors,function(c,d){_.each(c.c,function(c){c==a&&(b.family=d,b.selectedColor=c)})})},!0),b.setColor=function(c){b.selectedColor=c,a(function(){b.ngChange()})},b.setFamily=function(a){b.family=a,b.setColor(b.colors[a].c[Math.floor(b.colors[a].c.length/2)])}}}}]),app.directive("fallbackSrc",function(){var a={link:function(a,b,c){b.bind("error",function(){angular.element(this).attr("src",c.fallbackSrc)})}};return a}),app.directive("fallbackBg",function(){var a={link:function(a,b,c){b.bind("error",function(){b.css({"background-image":"url("+c.fallbackSrc+")"})})}};return a});var opentabService=function(){"use strict";function a(){l.onMessage.addListener(function(a){i[a.data.callID].callback&&i[a.data.callID].callback.apply(void 0,[a.result])}),chrome.runtime.onMessage.addListener(function(a){switch(a.msgType){case m.event:a.spot&&a.eventType&&g(a.spot,a.eventType,a.data);break;case m.notification:a.spot&&h(a.spot,a.id,a.priority,a.data)}})}function b(a,b,c,d,e){j++,i["call_"+j]={callID:"call_"+j,serviceName:a,functionName:b,sync:!!e,args:_.isArray(c)?c:[c],callback:d},l.postMessage(i["call_"+j])}function c(a,b,c,e){k[m.event].push({spot:a,eventType:b,eventHandler:c}),e&&e.$on("$destroy",function(){d(a,b,c)})}function d(a,b,c){_.each(k,function(d,e){a==d.spot&&b==d.eventType&&c==d.eventHandler&&k[m.event].splice(e,1)})}function e(a,b,c){k[m.notification].push({spot:a,eventHandler:b}),c&&c.$on("$destroy",function(){f(a,b)})}function f(a,b){_.each(k,function(c,d){a==c.spot&&b==c.eventHandler&&k[m.notification].splice(d,1)})}function g(a,b,c){_.each(k[m.event],function(e){if(a==e.spot&&b==e.eventType)try{e.eventHandler(c)}catch(f){console.error("%c eventManger :: error dispatchEvent "+e.spot+" "+e.eventType,"background:#FFE4E4;"),console.error("error is %o",f),d(e.spot,e.eventType,e.eventHandler)}})}function h(a,b,c,d){_.each(k[m.notification],function(e){if(a==e.spot)try{e.eventHandler(a,b,c,d)}catch(g){console.error("%c eventManger :: error dispatchNotification "+e.spot,"background:#FFE4E4;"),console.error("error is %o",g),f(e.spot,e.eventHandler)}})}var i={},j=0,k={},l=chrome.runtime.connect({name:"spots"}),m={event:"event",notification:"notification"};return _.each(m,function(a){k[a]=[]}),a(),{post:b,addEventListener:c,addNotificationListener:e,removeNotificationListener:f,dispatchEvent:d,dispatchNotification:h}}();app.controller("OpentabMainCtrl",["$scope","$rootScope","$timeout","$window","$q",function(a,b,c,d,e){var f=e.defer();b.paths=paths,b.spotsDOM=$(SPOTS.DOM),languageManager.getLang(function(a){moment.lang(a)}),a.parts={};var g=d.innerWidth/2,h=!0,i=20,j=-i,k=300,l=!1,m=!1;a.spotsReady=f.promise,a.initMainCtrl=function(){configAPI.getConfig(function(c){window.config=c,a.config=c,a.$$phase||a.$apply(),languageManager.getLangObj(function(a){b.language=a}),opentabService.addEventListener("SETTINGS","LANGUAGE_CHANGED",function(a){b.language=a.obg,moment.lang(a.langName),b.$apply()}),spotsManager.getSpots(function(b){a.spots=b,a.spotsById={},_.each(a.spots,function(b){a.spotsById[b.id]=b}),f.resolve(a.spots),a.initMainEvents()})})},a.initMainEvents=function(){$(window).load(function(){}),$(document).keyup(function(){var b=!1;return function(d){d.keyCode==config.opentab_toggle_key_code&&(b?a.openSearch(!0):(b=!0,c(function(){b=!1},config.opentab_toggle_key_timeout)))}}());var e=_.debounce(a.closePart,k,!0);a.spotsDOM.on("keydown",".part",function(a){a.keyCode==config.opentab_toggle_key_code&&(utilsAPI.sendGA("Opentab","Handle","hotkey close",null),e(a.currentTarget.id))}),a.spotsDOM.on("keydown keypress keyup input",function(a){a.stopPropagation()}),$(d).on("mousemove",function(b){var c=Number(config.opentab_sensitivity_L);if(g!=b.clientX){g=b.clientX;var e=Number((g/d.innerWidth).toFixed(2));j=c>e?e/c*-i:-i,h&&!m&&a.spotsHandle.css("left",j)}}),opentabService.addEventListener(a.spots.favorites.id,"SHOW_ADD_FORM",function(){b.replacePart(paths.spots+"/favorites/opentab/partials/FavoritesOpentabAdd.html","topRight",!0,function(a){$(".add-favorite input:first",a).focus()})}),opentabService.addEventListener(a.spots.favorites.id,"SHOW_REMOVE_FORM",function(){b.replacePart(paths.spots+"/favorites/opentab/partials/FavoritesOpentabRemove.html","topRight",!0)}),a.spotsHandle=a.spotsDOM.find("#spotsHandle").css("top",100*config.opentabSearchHandlePosition+"%"),a.spotsDOM.show()},b.replacePart=function(b,c,d,e){1==config.ftueOpentab.step?configAPI.get("ftueOpentab",function(f){1==f.step?(opentabService.post("configAPI","set",["ftueOpentab",{isShow:!1,step:null}],e,!0),config.ftueOpentab={isShow:!0,step:1},a.$$phase||a.$apply("config")):a.closePart(c,function(){a.openPart(b,c,d,e)})}):a.closePart(c,function(){a.openPart(b,c,d,e)})},b.closePart=function(b,c){if(a.parts[b]){var d=$("#"+b,a.spotsDOM),e={right:-d.width()};("topLeft"==b||"bottomLeft"==b)&&(e={left:-d.width()}),d.stop().animate(e,k,function(){delete a.parts[b],a.$$phase||a.$apply("parts"),0===_.size(a.parts)&&($("#spots_fader",a.spotsDOM).fadeOut(k),a.spotsHandle.css("top",100*config.opentabSearchHandlePosition+"%"),a.spotsHandle.show().stop(),a.spotsHandle.animate({left:j},function(){h=!0})),c&&c()})}else c&&c()},a.openPart=function(b,d,e,f){var g="8%";a.parts[d]=b,a.$$phase||a.$apply("parts"),c(function(){function b(){c.show().stop().animate(n,k,function(){f&&f(c)})}(e||null==e)&&$("#spots_fader",a.spotsDOM).fadeIn();var c=$("#"+d,a.spotsDOM),l=c.width(),m={right:-l},n={right:0},o=!1;if(("topLeft"==d||"bottomLeft"==d)&&(m={left:-l},n={left:0},o=!0),c.css(m),o)if(h=!1,j>-i){var p=a.spotsHandle.position().top/2;$("#"+d,a.spotsDOM).css("top",g),a.spotsHandle.stop().animate({top:g},p,function(){$(this).stop().animate({left:-i},200,function(){$(this).hide(),c.show().stop().animate(n,k,function(){f&&f(c)})})})}else b();else b()},100)},a.closeAll=function(){_.each(a.parts,function(b,c){b&&("topLeft"==c&&utilsAPI.sendGA("Opentab","Handle","close",null),a.closePart(c))})},a.backgroundImage=_.memoize(function(a){return a?"url("+a+")":"none"}),a.openSearch=_.debounce(function(c){config.ftueOpentab.isShow&&1==config.ftueOpentab.step?config.ftueOpentab={isShow:!0,step:2}:(c||!l)&&(utilsAPI.sendGA("Opentab","Handle",c?"hotkey-open":"open",null),b.replacePart(paths.spots+"/search/opentab/partials/search_opentab.html","topLeft",!0,function(){$(".search-box",a.spotsDOM).focus()}))},k,!0),function(){function b(){l=!0}function c(c){_.delay(b,100);var d=c.pageY-g-window.scrollY;d>i&&(d=i),0>d&&(d=0),f=d/window.innerHeight,a.spotsHandle.css("top",d)}function e(b){$(b.target).is(SPOTS.wrapper)?(a.spotsHandle.css("left",j),m=!1):a.spotsHandle.stop().animate({left:j},k,function(){m=!1}),$(window.document.body).css("-webkit-user-select",n),$(d).off(o),f&&configAPI.set("opentabSearchHandlePosition",f)}var f,g,h,i,n=$(window.document.body).css("-webkit-user-select"),o={mousemove:c,mouseup:e},p=_.once(function(){h=a.spotsHandle.height(),i=window.innerHeight-h});a.startDragSearchHandle=_.debounce(function(b){p(),$(d).on(o),g=b.clientY-a.spotsHandle.position().top,$(window.document.body).css("-webkit-user-select","none"),m=!0,l=!1},1e3,!0)}()}]),app.controller("OpentabFtueStepCtrl",["$scope","$timeout","$rootScope",function(a,b,c){b(function(){1==config.ftueOpentab.step?(configAPI.set("opentab_sensitivity_L_temp",config.opentab_sensitivity_L),configAPI.set("opentab_sensitivity_L",1e4),$("#spotsHandle",a.spotsDOM).bind("mousedown",function(){$(document).bind("mousemove",function(){$(".ftue .step1 .half-circle",a.spotsDOM).css("top",$("#spotsHandle",a.spotsDOM).position().top-75+35)}),$(document).bind("mouseup",function(){$(document).unbind("mousemove"),$(document).unbind("mouseup")})}),c.closePart("topLeft")):2==config.ftueOpentab.step?(config.opentab_sensitivity_L_temp&&(configAPI.set("opentab_sensitivity_L",config.opentab_sensitivity_L_temp),configAPI.remove("opentab_sensitivity_L_temp")),c.replacePart(paths.spots+"/search/opentab/partials/search_opentab.html","topLeft",!1,function(){$(".favorites-search-ftue",a.spotsDOM).css("opacity",1)})):3==config.ftueOpentab.step&&c.closePart("topLeft")},200),a.skip=function(a){config.ftueOpentab={isShow:!1,step:null},utilsAPI.sendGA("Opentab-ftue","step"+a,"skip",null),c.closePart("topLeft")},a.next=function(a){a?(config.ftueOpentab={isShow:!0,step:a},utilsAPI.sendGA("Opentab-ftue","step"+a,"view",null)):(config.ftueOpentab={isShow:!1,step:null},utilsAPI.sendGA("Opentab-ftue","finish","",null))}}]);var SPOTS={createShadowRootMethod:_.find(["createShadowRoot","webkitCreateShadowRoot"],function(a){return a in document.body}),createWrapper:function(a,b,c){return this.createShadowRootMethod?(this.wrapper=document.createElement("spots-wrapper"),this.wrapper.resetStyleInheritance=!0,this.shadowRoot=this.wrapper[this.createShadowRootMethod](),this.shadowRoot.innerHTML=a,this.DOM=this.shadowRoot.querySelector(b),c&&c(this.wrapper,this.DOM),this.wrapper):null}};configAPI.get("opentab_enabled",function(a){a&&!$.isXMLDoc(document)&&$(document).ready(bootstrapSpots)}),app.filter("fromNow",[function(){return function(a){return moment(parseInt(a,10)).fromNow()}}]),app.filter("dayOfWeek",[function(){return function(a){return moment(parseInt(a,10)).format("dddd")}}]),app.filter("spotIconLetters",["$cacheFactory",function(a){var b=a("spotIconLetters");return function(a){_.isObject(a)&&(a.title?a=a.title:a.url&&(a=urls.getHostName(a.url,!0)));var c=a+"_"+config.favoritesLetterCount;if(!b.get(c)){var d=a.substr(0,config.favoritesLetterCount);b.put(c,d)}return b.get(c)}}]),app.filter("normalizePhoneNumber",function(){function a(a){return b[a]}var b={};return function(c){return b[c]?a(c):(contacts.normalizePhoneNumber(c,function(a){b[c]=a}),"-")}}),app.filter("hexToRgba",function(){function a(a){return b[a]}var b={};return function(c,d){return b[c+d]?a(c+d):(graphicAssets.hexToRgb(c,function(a){b[c+d]="rgba("+a.r+","+a.g+","+a.b+","+d+")"}),"-")}}),app.filter("i18n",["$rootScope",function(a){return function(b){return a.language[b]||""}}]);var search=function(){"use strict";return{search:function(a,b){opentabService.post("search","search",[a],b,!1)},buildSearchRegex:function(a){opentabService.post("search","buildSearchRegex",[a],null,!0)}}}(),sms=function(){"use strict";return{getObject:function(a,b){opentabService.post("sms","getObject",[a],b,!1)},getAllObjects:function(a){opentabService.post("sms","getAllObjects",[],a,!1)},getAllObjectsArray:function(a){opentabService.post("sms","getAllObjectsArray",[],a,!1)},getPreviousThreads:function(a,b,c){opentabService.post("sms","getPreviousThreads",[a,b],c,!1)},getThread:function(a,b){opentabService.post("sms","getThread",[a],b,!1)},getThreadForNumber:function(a,b){opentabService.post("sms","getThreadForNumber",[a],b,!1)}}}(),contacts=function(){"use strict";return{normalizePhoneNumber:function(a,b){opentabService.post("contacts","normalizePhoneNumber",[a],b,!0)},getContactDefaultPhone:function(a,b){opentabService.post("contacts","getContactDefaultPhone",[a],b,!0)}}}(),favorites=function(){"use strict";return{launchApp:function(a,b){opentabService.post("favorites","launchApp",[a],b,!0)},getRecentlyClosed:function(a){opentabService.post("favorites","getRecentlyClosed",[],a,!1)},getCategories:function(a){opentabService.post("favorites","getCategories",[],a,!1)},addItem:function(a,b,c){opentabService.post("favorites","addItem",[a,b],c,!1)},removeItem:function(a,b){opentabService.post("favorites","removeItem",[a],b,!1)},getItem:function(a,b){opentabService.post("favorites","getItem",[a],b,!1)},getDetailsForUrl:function(a,b){opentabService.post("favorites","getDetailsForUrl",[a],b,!1)}}}(),topSites=function(){"use strict";var a;return{getTopSites:function(b){a?b(a):opentabService.post("topSites","getTopSites",[],function(c){a=c,b(a)},!1)},search:function(a,b,c){opentabService.post("topSites","search",[],c,!1)}}}();app.controller("SearchOpentabCtrl",["$scope","$timeout","$window",function(a,b,c){function d(){var b=a.results[a.searchTerm]||a.defaultResults;a.selectedItem++,a.selectedCategory>=b.length&&(a.selectedCategory=0,a.selectedItem=0),a.selectedItem>=b[a.selectedCategory].results.length&&(a.selectedCategory++,a.selectedItem=0,a.selectedCategory===b.length&&d()),a.results[a.searchTerm]&&b[a.selectedCategory]&&!b[a.selectedCategory].results[a.selectedItem].show&&d()}function e(){var b=a.results[a.searchTerm]||a.defaultResults;a.selectedItem--,a.selectedItem<0&&(a.selectedCategory--,a.selectedCategory<0&&(a.selectedCategory=b.length-1),a.selectedItem=b[a.selectedCategory].results.length-1,a.selectedItem<0&&e()),a.results[a.searchTerm]&&b[a.selectedCategory]&&!b[a.selectedCategory].results[a.selectedItem].show&&e()}var f;a.selected=0,a.results={};var g={DOWN:40,UP:38,ENTER:13,ESC:27};a.searchKeyHandler=function(b){switch(b.keyCode){case g.DOWN:d();break;case g.UP:e(),a.searchTerm&&a.selectRange(b.target,a.searchTerm.length,a.searchTerm.length);break;case g.ENTER:a.searchTerm?a.results[a.searchTerm].length?a.enterEventInfo={spotID:a.results[a.searchTerm][a.selectedCategory].spotID,type:a.results[a.searchTerm][a.selectedCategory].type,selectedItem:a.selectedItem}:a.resultClick({link:a.buildGoogleSearchURL(a.searchTerm)}):a.enterEventInfo={spotID:a.defaultResults[0].spotID,type:a.defaultResults[0].type,selectedItem:a.selectedItem};break;case g.ESC:a.searchTerm&&(a.searchTerm=null,b.stopPropagation())}},a.resultsLimit=Math.floor((c.innerHeight-.2*c.innerHeight)/60)-1,angular.element(c).bind("resize",_.debounce(function(){var b=Math.floor((c.innerHeight-.2*c.innerHeight)/60)-1;b!=a.resultsLimit&&(a.resultsLimit=b,a.calculateVisibleResults(),a.$apply("resultsLimit"))},200)),a.$watch("searchTerm",function(c){c&&a.searchQueryInPreviousResults(function(){b.cancel(f),a.enterEventInfo=null,!c||a.results[c]&&a.results[c].length?a.spotsResults=_.where(a.results[c],function(a){return a.results.length>0}).length:(a.results[c]=a.tempResults?a.tempResults:null,f=b(function(){search.search(c,a.searchResponseHandler)},200))})}),a.searchQueryInPreviousResults=function(b){if(a.LastSearchCommited&&a.searchTerm){var c=a.searchTerm,d=a.getSearchRegex(c);a.tempResults=angular.copy(a.results[a.LastSearchCommited]),_.each(a.tempResults,function(b){b.results=_.filter(b.results,function(b){return a.checkFields(b,["givenName","familyName","display","title","url","name","shortName","label"],d)})}),a.tempResults=_.reject(a.tempResults,function(a){return 0===a.results.length}),b()}else b()},a.checkFields=function(a,b,c){var d=!1;return _.each(b,function(b){!_.isUndefined(a[b])&&c.test(a[b])&&(d=!0)}),d},a.getSearchRegex=function(a){return a?(a.length<3&&(a="^"+a),a=a.replace(" ","\\s"),new RegExp(a,"i")):null},a.searchResponseHandler=function(b){b.results.length&&(a.results[b.query]||(a.results[b.query]=[]),a.results[b.query]=_.reject(a.results[b.query],function(a){return a.spotID==b.spotID&&a.type==b.type}),a.results[b.query].push(b),a.results[b.query]=_.sortBy(a.results[b.query],function(a){return-1*a.priority}),a.calculateVisibleResults(),a.results[b.query]=_.sortBy(a.results[b.query],function(a){return-1*a.priority})),a.selectedCategory=0,a.selectedItem=0,a.LastSearchCommited=b.query,a.$$phase||a.$apply()},a.calculateVisibleResults=function(){var b=[];_.each(a.results[a.searchTerm],function(c,d){a.results[a.searchTerm][d].results=_.sortBy(c.results,function(a){return-1*a.score}),b=_.union(b,c.results)}),_.each(b,function(b,c){b.show=c<a.resultsLimit})},a.setSelected=function(b,c){a.selectedCategory=b,a.selectedItem=c},a.resultClick=function(b,c){"chrome-apps"===c?(a.closeAll(),webappsUtils.launch(b)):($("html, body").addClass("spots-web-hider"),window.location.href=b.link||b.url)},a.selectRange=function(a,b,c){if(a.setSelectionRange)a.focus(),a.setSelectionRange(b,c);else if(a.createTextRange){var d=a.createTextRange();d.collapse(!0),d.moveEnd("character",c),d.moveStart("character",b),d.select()}},topSites.getTopSites(function(b){a.defaultResults=[{spotID:"ef974b5a-432f-472b-89c6-c92a67d60182",type:"top-sites",results:b.length>5?b.splice(0,5):b}],a.selectedCategory=0,a.selectedItem=0,a.$$phase||a.$apply("defaultResults","selectedCategory","selectedItem")}),a.buildGoogleSearchURL=function(a){return"https://www.google.com/?#q="+a},a.googleSearch=function(){a.searchTerm&&(utilsAPI.sendGA("Opentab-Search","Web-Search","Search-Btn-Click",null),utilsAPI.sendGA("Opentab-Search","Term",a.searchTerm,null),window.location.href=a.buildGoogleSearchURL(a.searchTerm))}}]),app.controller("SearchResultCtrl",["$scope",function(a){"use strict";var b={calculator:"Calculator-Search",navigation:"Navigation-Search","web-search":"Web-Search"};a.openResult=function(){utilsAPI.sendGA("Opentab-Search",b[a.spot.type]||"","AutoComplete-Click",null),"web-search"==a.result.type&&utilsAPI.sendGA("Opentab-Search","Term",a.searchTerm,null),"calculator"===a.spot.type&&(a.result.value=a.buildGoogleSearchURL(a.searchTerm)),a.resultClick({link:a.result.value})},a.$watch("enterEventInfo",function(){a.enterEventInfo&&a.enterEventInfo.spotID==a.spots.search.id&&a.enterEventInfo.selectedItem==a.$index&&a.enterEventInfo.type==a.spot.type&&a.openResult()}),a.webResultClick=function(){a.openResult()}}]),app.controller("FavoritesOpentabAddCtrl",["$scope",function(a){"use strict";a.disableForm=!1,a.item={url:window.location.href,title:urls.getPrettyTitle(window.location.href,window.document.title),placeholder:urls.getBaseDomain(window.location.href)},favorites.getDetailsForUrl(window.location.href,function(b){b.item.icon&&(b.item.icon=paths.base+b.item.icon),a.item=_.extend({},b.item,a.item),a.colorPalette=[{f:b.item.color,c:b.palette}],a.$$phase||a.$apply("item","colorPalette")}),favorites.getCategories(function(b){a.itemCategory=b[0].id,a.categories=b,a.$$phase||a.$apply("itemCategory","categories")}),a.addFavorite=function(){String(a.item.title).trim()||(a.item.title=a.item.placeholder,delete a.item.placeholder),favorites.addItem(a.item,a.itemCategory),a.closePart("topRight")}}]),app.controller("FavoritesOpentabRemoveCtrl",["$scope",function(a){"use strict";favorites.getItem({url:window.location.href},function(b){a.item=b}),a.removeFavorite=function(){favorites.removeItem(a.item),a.closePart("topRight")}}]),app.controller("FavoritesSearchResultCtrl",["$scope",function(a){"use strict";var b={bookmarks:"Bookmarks-Search",favorites:"Favorites-Search","top-sites":"TopSites-Search","chrome-apps":"ChromeApps-Search"};a.openFavorite=function(){utilsAPI.sendGA("Opentab-Search",b[a.spot.type]||"","AutoComplete-Click",null),a.resultClick(a.result,a.spot.type)},a.$watch("enterEventInfo",function(){a.enterEventInfo&&a.enterEventInfo.spotID==a.spots.favorites.id&&a.enterEventInfo.selectedItem==a.$index&&a.enterEventInfo.type==a.spot.type&&a.openFavorite()}),a.FavoriteClick=function(){a.openFavorite()}}]),app.controller("PhoneOpentabSearchCtrl",["$rootScope","$scope","$timeout",function(a,b,c){$("#result_"+b.$index);b.currentView="default",b.$watch("enterEventInfo",function(){b.enterEventInfo&&b.enterEventInfo.spotID==b.spots.contacts.id&&b.enterEventInfo.selectedItem==b.$index&&(utilsAPI.sendGA("Opentab-Search","Contacts-Search","AutoComplete-Click",null),b.openChat(b.defaultPhone))}),b.openChat=function(c){utilsAPI.sendGA("Opentab-Search","Contacts-Search","Open-Chat",null),a.chatItem={phone:c,display:b.result.display,givenName:b.result.givenName,image:b.result.image},a.replacePart(paths.spots+"/phone/opentab/partials/phone_chat.html","bottomRight")},b.callNumber=function(a){b.selectedItem==b.$index&&(b.selectedItemCallItem=b.selectedItem,utilsAPI.sendGA("Opentab-Search","Contacts-Search","Call-Contact",null),b.currentView="calling",b.$$phase||b.$apply("currentView"),pushService.sendNotification(b.spots.call_log.id,1,{number:a,speaker:config.phoneSpeaker},function(){}))},b.cancelCall=function(){utilsAPI.sendGA("Opentab-Search","Contacts-Search","Cancel-Call-Contact",null),pushService.sendNotification(b.spots.call_log.id,2,"",function(){b.currentView="default",b.$$phase||b.$apply("currentView")})},opentabService.addEventListener(b.spots.call_log.id,4,function(){b.selectedItemCallItem==b.$index&&(b.currentView="call_connected",b.$$phase||b.$apply("currentView"),c(function(){b.currentView="default",b.$$phase||b.$apply("currentView")},5e3))},b),b.toggleContact=function(){utilsAPI.sendGA("Opentab-Search","Contacts-Search","AutoComplete-Click",null),b.disableToggle||(b.currentView="all_numbers"==b.currentView?"default":"all_numbers")},b.getAdditionalNumbersHeight=function(){return 44*_.size(b.result.phones)},b.getDefaultPhone=function(){contacts.getContactDefaultPhone(b.result,function(a){b.defaultPhone=a
})},b.getDefaultPhone()}]),app.controller("ChatCtrl",["$rootScope","$scope","$timeout",function(a,b,c){$("#smsText").focus(),b.currentView="default",sms.getThreadForNumber(b.chatItem.phone,function(a){b.numberSmss=a,b.$$phase||b.$apply("numberSmss")}),b.sendSms=function(){utilsAPI.sendGA("Opentab-Phone","Chat","sms sent",null),b.numberSmss.push({id:(new Date).getTime(),number:b.chatItem.phone,text:b.smsText,timestamp:(new Date).getTime().toString(),type:3});var a=b.chatItem.phone,c=b.smsText;pushService.sendNotification(b.spots.sms.id,1,{number:a,text:c},function(){b.smsText="",b.$$phase||b.$apply("smsText")}),b.$$phase||b.$apply("numberSmss")},b.closeChat=function(){a.closePart("bottomRight"),utilsAPI.sendGA("Opentab-Phone","Chat","close",null)},opentabService.addEventListener(b.spots.sms.id,"SMS_EVENT",function(a){_.each(a,function(a){a.number==b.chatItem.phone&&(_.each(b.numberSmss,function(c,d){c.text==a.text&&3==c.type&&b.numberSmss.splice(d,1)}),b.numberSmss.push(a),b.$$phase||b.$apply("numberSmss"))})},b),b.callNumber=function(a){utilsAPI.sendGA("Opentab-Phone","Chat","call made",null),b.selectedItemCallItem=b.selectedItem,b.currentView="calling",b.$$phase||b.$apply("currentView"),pushService.sendNotification(b.spots.call_log.id,1,{number:a,speaker:config.phoneSpeaker},function(){})},b.cancelCall=function(){pushService.sendNotification(b.spots.call_log.id,2,"",function(){b.currentView="default",b.$$phase||b.$apply("currentView")})},opentabService.addEventListener(b.spots.call_log.id,4,function(){b.currentView="call_connected",b.$apply("currentView"),c(function(){b.currentView="default",b.$$phase||b.$apply("currentView")},5e3)},b)}]);