/**
 * @zhanghd
 */
(function ($) {
    "use strict";
    var g = {};
    g.params = {
        sid: '',
        username: '',
        uploadFileName: 'file', //上传文件 name = file0,file1,file2
        saveImagesToServer: true,
        belongTo: '00000000-0000-0000-0000-000000000000',
        imgArr: [],
        imgGUIDArr: [],
        noteID: '',
        firstItem: '',
        noteData: '',
        uploadFilesNum: 20,
        pageComplete: false,
        signalAjax: false
    };
    var helper = {
        getSuffix: function (url) {
            return url.substr(url.length - 4).toLocaleLowerCase();
        }
    };
    var process = {
        jQuerySetUp: function () {
            $.ajaxSetup({
                dataType: 'json',
//                scriptCharset: "utf-8" ,
                cache: false
//                dataFilter:function (data) {
//                },
//                beforeSend:function (xhr) {
//                    xhr.setRequestHeader('UserClient', 'note_web_chromeext/3.1.0');
//                }
            });
        },
        init: function () {
            process.browserAction();
            process.initContextMenus();
            process.initExtensionConnect();
            process.initExtensionRequest();
            process.jQuerySetUp();
            process.addListener();
            process.cookieToStorage('');//通过cookie自动登录
        },
        cookieToStorage: function (callback) {
            chrome.cookies.getAll({url: "http://note.91.com"}, function (cookies) {
                if (cookies) {
                    var userName = '', uapc = '', nickName = '', flag = false;
                    for (var i = 0, j = cookies.length; i < j; i++) {
                        if (cookies[i].name == 'lUserName') {
                            noteConfig.setLocalStorage('userName', cookies[i].value);
                        } else if (cookies[i].name == 'lNickName') {
                            noteConfig.setLocalStorage('nickName', decodeURI(cookies[i].value));
                        } else if (cookies[i].name == 'uapc') {
                            flag = true;
                            uapc = cookies[i].value;
                            noteConfig.setLocalStorage('note91sid', noteHelper.sidDecode(uapc));
                            noteConfig.setLocalStorage('note91uid', noteHelper.uidDecode(uapc));
                            noteConfig.setLocalStorage('note91bid', noteHelper.bidDecode(uapc));
                            noteConfig.setLocalStorage('note91tid', noteHelper.tidDecode(uapc));
                        }
                    }
                    if (!flag) {
                        noteConfig.setLocalStorage('userName', '');
                        noteConfig.setLocalStorage('nickName', '');
                        noteConfig.setLocalStorage('note91sid', '');
                        noteConfig.setLocalStorage('note91uid', '');
                        noteConfig.setLocalStorage('note91bid', '');
                        noteConfig.setLocalStorage('note91tid', '');
                        callback && callback();
                    } else {
                        if (!noteConfig.getLocalStorage('nickName')) {
                            $.ajax({
                                url: noteConfig.url.getUserInfo + '/' + noteConfig.getLocalStorage('note91uid') + '?1=1' + noteConfig.getVerifierQueryStr(),
                                type: "GET",
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    noteConfig.setLocalStorage('nickName', decodeURI(data.nickname));
                                    callback && callback();
                                },
                                error: function () {
                                    callback && callback();
                                }
                            });
                        } else {
                            callback && callback();
                        }
                    }
                } else {
                }
            });
        },
        addListener: function () {
            /*//屏蔽自动登录
             chrome.tabs.onUpdated.addListener(function HandlerConnect(id, info) {
             if (info.url && info.url.indexOf('note.91.com') > 0) {
             process.autoSignInOrOut(function (flag) {
             if (!flag) {
             noteConfig.setSid('');
             noteConfig.setUserName('');
             //为避免多次登录退出暂时先不移除监听，功能完成后优化
             //chrome.tabs.onUpdated.removeListener(HandlerConnect);
             }
             });
             }
             });
             */
        },
        browserAction: function () {
            chrome.browserAction.onClicked.addListener(function (tab) {
                chrome.tabs.executeScript(null, {"code": "noteClipper.openOrClosePopup();"});
            });
        },
        openPopup: function () {
            chrome.tabs.executeScript(null, {"code": "noteClipper.openPopup();"});
        },
        closePopup: function () {
            chrome.tabs.executeScript(null, {"code": "noteClipper.closePopup();"});
        },
        initContextMenus: function () {
            chrome.contextMenus.create({
                title: chrome.i18n.getMessage("select_content_context_menu"),
                contexts: ['all'],
                onclick: function (info, tab) {
                    chrome.tabs.executeScript(tab.id, {code: "noteClipper.getSelectedContent();"});
                }
            });
            chrome.contextMenus.create({
                title: chrome.i18n.getMessage("select_image_context_menu"),
                contexts: ['all'],
                onclick: function (info, tab) {
                    g.params.imgArr = [];
                    g.params.imgGUIDArr = [];
                    if (info.srcUrl) {
                        var suffix = helper.getSuffix(info.srcUrl);
                        var imgGUIDSrc = noteHelper.getGUID();
                        if (/^\.(gif|jpg|png|jpeg|bmp)$/.test(suffix)) {
                            imgGUIDSrc += suffix;
                        } else {
                            imgGUIDSrc += '.jpg';//默认为jpg
                        }
                        g.params.imgArr.push(info.srcUrl);
                        g.params.imgGUIDArr.push(imgGUIDSrc);
                        var param = {
                            imgs: [info.srcUrl],
                            title: tab.title,
                            imgTitles: [tab.title],
                            sourceUrl: tab.url
                        };
                        process.saveSelectImage(param);//不需要加callback
                    } else {
                        noteHelper.notifyHTML(chrome.i18n.getMessage('click_on_images'));
                    }
//                    chrome.tabs.executeScript(tab.id, {code:"noteClipper.saveImage(["+param+"]);"});
                }
            });
        },
        writeBlobAndSendFile: function (fs, blob, fileName, successCallback, errorCallback, imgIndex) {
            fs.root.getFile(fileName, {create: true}, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwrite = function (e) {
                        fileEntry.file(function (file) {
                            successCallback(file, imgIndex);
                        });
                    };
                    fileWriter.onerror = function (e) {
                        console.log('Write failed: ' + e.toString());
                    };
                    fileWriter.write(blob);
                }, process.onFileError);
            }, process.onFileError);
        },
        onFileError: function (err) {
            for (var p in FileError) {
                if (FileError[p] == err.code) {
                    console.log('Error code: ' + err.code + 'Error info: ' + p);
                    break;
                }
            }
        },
        removeFile: function (fileName, fileSize) {
            window.requestFileSystem(TEMPORARY, fileSize, function (fs) {
                fs.root.getFile(fileName, {}, function (fileEntry) {
                    fileEntry.remove(function () {
                        console.log('File ' + fileName + ' removed.');
                    }, process.onFileError);
                }, process.onFileError);
            }, process.onFileError);
        },
        downloadImage: function (url, imgIndex, successCallback, errorCallback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    var suffix = url.split('.'),
                        blob = new Blob([this.response], {type: 'image/' + suffix[suffix.length - 1]}),
                        parts = url.split('/'),
                        fileName = parts[parts.length - 1];
                    window.requestFileSystem(TEMPORARY, this.response.byteLength, function (fs) {
                        process.writeBlobAndSendFile(fs, blob, fileName, successCallback, errorCallback, imgIndex);
                    }, process.onFileError);
                }
            };
            xhr.onerror = function () {
                console.log('retrieve remote image xhr onerror')
                errorCallback && errorCallback(imgIndex);
            };
            xhr.onabort = function () {
                console.log('retrieve remote image xhr onabort')
                errorCallback && errorCallback(imgIndex);
            };
            xhr.send(null);
        },
        _saveImages: function (noteData, successCallback, failCallback) {
            var imgs, imgsGUID , content = '';
            //替换照片src
            var itemContent = $(noteData.content);
            g.params.imgArr = [];
            g.params.imgGUIDArr = [];
            itemContent.find('img').each(function (i) {
                if (this.tagName.toLocaleLowerCase() == 'img') {
                    var url = this.src;
                    if (!/.*?(data:image)/.test(url)) {
                        var suffix = helper.getSuffix(url);
//                    var imgGUID = noteHelper.getGUID();
                        var imgGUIDSrc = noteHelper.getGUID();
                        if (/^\.(gif|jpg|png|jpeg|bmp)$/.test(suffix)) {
                            imgGUIDSrc += suffix;
                        } else {
                            imgGUIDSrc += '.jpg';//默认为jpg
                        }
                        g.params.imgArr.push(url);
                        g.params.imgGUIDArr.push(imgGUIDSrc);
                        try {
                            noteData.content = noteData.content.replace(new RegExp(url, "g"), imgGUIDSrc);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            });
            imgs = g.params.imgArr;
            imgsGUID = g.params.imgGUIDArr;
            if (g.params.saveImagesToServer && imgs.length) {
                //正在保存图片提示
                noteHelper.notifyHTML(chrome.i18n.getMessage('is_retrieving_remote_image_tip'), false);
                var totalImgNum = imgs ? imgs.length : 1,
                    saveSucceedImgNum = 0,
                    saveFailedImgNum = 0,
                    saveSucceedImgIndex = [],
                    saveSucceedImgIndexByOrder = {},
                    files = {};
                var removeFiles = function () {
                    for (var idx in files) {
                        process.removeFile(files[idx].name, files[idx].size);
                    }
                };
                var checkComplete = function (form) {
                    if (saveSucceedImgNum + saveFailedImgNum == totalImgNum) {
                        if (saveFailedImgNum == totalImgNum) {
                            //all images retrieve failed
                            if (failCallback) {
                                //is replace images in page content
                                failCallback(true);
                            } else {
                                noteHelper.notifyHTML(chrome.i18n.getMessage('retrieve_images_failed'));
                            }
                        } else {
                            for (var i = 0, l = saveSucceedImgIndex.length; i < l; i++) {
                                saveSucceedImgIndexByOrder[saveSucceedImgIndex[i]] = i.toString();
                            }
                            noteHelper.notifyHTML(chrome.i18n.getMessage('is_uploading_images_tip'), false);
                            $.ajax({
                                url: noteConfig.url.uploadFile,
//                                url:noteConfig.url.uploadFile + '?sid=' + noteConfig.getSid(),
                                type: "POST",
                                data: form,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data.code != 200) {
                                        //todo: server error, pending note...
                                        console.log('Internal error: ');
                                        if (failCallback) {
                                            failCallback(true);
                                        }
                                        removeFiles();
                                        return;
                                    }
                                    if (successCallback) {
                                        //is replace images in page content
                                        successCallback(data, saveSucceedImgIndexByOrder);
                                    }
                                    removeFiles();
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log('xhr error: ')
                                    console.log(textStatus)
                                    removeFiles();
                                    noteHelper.notifyHTML(chrome.i18n.getMessage('upload_images_failed'));
                                }
                            });
                        }
                    }
                };
                var filesInfo = [];
                var checkDownloadAndUpload = function () {//分批上传
                    //console.log(filesInfo);
                    if (saveSucceedImgNum + saveFailedImgNum == totalImgNum) {
                        var formData = new FormData(), uploadFlag = false;
                        formData.append('type', 'Embedded');
                        formData.append('categoryId', noteData.categoryId || '');
                        formData.append('id', noteData.id || '');
                        formData.append('note_id', g.params.noteID || '');
                        formData.append('belong_to', noteConfig.getBelongTo() || g.params.belongTo);
                        var currNum = 0;//
                        for (var key in filesInfo) {
                            currNum++;
                            uploadFlag = false;
                            formData.append(key, filesInfo[key]);
                            if (currNum == g.params.uploadFilesNum && g.params.uploadFilesNum < totalImgNum) {
                                checkComplete(formData);
                                uploadFlag = true;
                                currNum = 0;
                                formData = new FormData();
                                formData.append('type', 'Embedded');
                                formData.append('categoryId', noteData.categoryId || '');
                                formData.append('id', noteData.id || '');
                                formData.append('note_id', g.params.noteID || '');
                                formData.append('belong_to', g.params.belongTo || '');
                            }
                        }
                        if (!uploadFlag) {
                            checkComplete(formData);
                        }
                    }
                    //formData.append(imgsGUID[idx], file);
                };
                for (var i = 0, l = totalImgNum; i < l; i++) {
                    process.downloadImage(imgs[i], i, function (file, idx) {
                        console.log(file);
                        saveSucceedImgNum++;
                        saveSucceedImgIndex.push(idx);
                        filesInfo[imgsGUID[idx]] = file;
                        //formData.append(imgsGUID[idx], file);
                        //files[idx] = file;
                        //checkComplete();
                        checkDownloadAndUpload();
                    }, function (idx) {
                        saveFailedImgNum++;
                        //checkComplete();
                    });
                }
            }else{
                successCallback(noteData);
            }
        },
        saveImages: function (noteData, successCallback, failCallback) {

//            if (g.params.imgArr.length > 0) {
                process._saveImages(noteData, successCallback, failCallback);
//            } else {
//                successCallback(noteData);
//            }
        },
        initExtensionRequest: function () {
            chrome.extension.onRequest.addListener(function (request, sender) {
                if (!sender || sender.id !== chrome.i18n.getMessage("@@extension_id")) return;
                switch (request.name) {
                    case 'checkloginfromnotepopup':
                        process.cookieToStorage(function () {
                            chrome.tabs.sendRequest(sender.tab.id, {name: 'checkloginedreturn'});
                        });
                        break;
                    case 'openloginwin':
                        g.params.currentTabId = sender.tab.id;
                        process.checkSid(function () {
                            chrome.tabs.sendRequest(sender.tab.id, {name: 'checkloginedreturn'});
                        });
                        break;
                    default:
                        break;
                }
            })
        },
        initExtensionConnect: function () {
            chrome.extension.onConnect.addListener(function (port) {
                switch (port.name) {
                    case 'actionsetpopupcontent':
                        process.setPopupContentConnect(port);
                        break;
                    case 'savenotefrompopup':
                        process.saveContentFromPopup(port);
                        break;
                    case 'saveselectedcontent':
                        process.saveSelectContent(port);
                        break;
                    case 'signinhandler':
                        process.signInHandler(port);
                        break;
                    case 'note91clipperisnotready':
                        process.note91clipperisnotready(port);
                        break;
                    case 'resizedetailpanel':
                        process.resizedetailpanel(port);
                        break;
                    default:
                        break;
                }
            });

        },
        resizedetailpanel: function (port) {
            chrome.tabs.sendRequest(port.sender.tab.id, {name: 'resizedetailpanel'});
        },
        note91clipperisnotready: function (port) {
            port.onMessage.addListener(function (msg) {
                noteHelper.notifyHTML(chrome.i18n.getMessage('clipper_not_ready'), 8000);
            });
        },
        signInHandler: function (port) {
            if (g.params.noteData) {
                process.save(g.params.noteData);
                g.params.noteData = '';
            }
        },
        setPopupContentConnect: function (port) {
            port.onMessage.addListener(function (data) {
                chrome.tabs.sendRequest(port.sender.tab.id, {name: 'actionsetpopupcontent', data: data});
            });
        },
        saveNote: function (noteData, successCallback, failCallback) {//id为当前note_id新流程先保存笔记 再上传图片未用到该参数
            if (!g.params.signalAjax) {
                noteHelper.notifyHTML(chrome.i18n.getMessage('note_saving'), false);
                var params = {
                    "title": noteData.title,
                    "sourceUrl": noteData.sourceUrl || "",
                    "content": noteData.content || "",
                    "categories": noteData.categories || '',
                    "tags": noteData.tags
                };
                g.params.noteID = noteHelper.getGUID();
                g.params.firstItem = noteHelper.getGUID();
//                var contentHTML = '<!DOCTYPE HTML>';
//                contentHTML += '    <html>';
//                contentHTML += '           <head>';
//                contentHTML += '                <meta charset="UTF-8">';
//                contentHTML += '                <title>' + params.title + '</title>';
//                contentHTML += '                <link rel="stylesheet" href="' + noteConfig.getTheme().css + '" />';
//                contentHTML += '           </head>';
//                contentHTML += '           <body>';
//                contentHTML += '                <div class="note91-content">';
//                contentHTML += params.content;
//                contentHTML += '                </div>';
//                contentHTML += '           </body>';
//                contentHTML += '    </html>';
//                var dataObj = {
//                    "client_type": "chrome",
//                    "belong_to": params.belongTo, //所属文件夹ID，默认文件夹为GUID_NULL字符串
//                    "title": params.title, //笔记标题
//                    "note_src": params.sourceUrl, //笔记来源
//                    "note_id": g.params.noteID,
//                    "first_item": g.params.firstItem, //主笔记项GUID
//                    "file_ext": "html", //主笔记项的文件夹扩展名
//                    "item_content": contentHTML
//                };
                var dataObj1 = {
                    nonce: 'e9199ce3b0',
                    title: params.title,
                    content: params.content,
                    categories: params.categories || 'uncategorized',
                    status: 'publish',
                    tags: params.tags
                };

                params.belongTo && noteConfig.setBelongTo(params.belongTo);
                g.params.signalAjax = $.ajax({
//                    headers:{
//                        'X-Requested-With':'XMLHttpRequest'
//                    },
                    type: 'POST',
//                    url: 'http://ihome.com/api/posts/create_post/',
                    url: noteConfig.url.saveNote,
                    data: dataObj1,
                    success: function (data) {
                        console.log(data);
                        g.params.signalAjax = false;
                        if (data.status == 'ok') {
                            successCallback && successCallback();
                            return;
//                        } else if (data.code == 425) {
//                            noteHelper.notifyHTML(chrome.i18n.getMessage('overflow'));
//                            process.closePopup();
//                            return;
                        } else {
                            failCallback && failCallback();
                            return;
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        g.params.signalAjax = false;
                        failCallback && failCallback();
                        noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_failed'));
                    }
                });
            } else {
                noteHelper.notifyHTML(chrome.i18n.getMessage('re_submit'));
                return false;
            }
        },
        saveSelectContent: function (port) {
            port.onMessage.addListener(function (noteData) {
                if (noteData.content) {
                    process.checkLogin(noteData, function (post) {
                        //保存数据
                        process.save(noteData);
                    });
                } else {
                    noteHelper.notifyHTML(chrome.i18n.getMessage('not_found_content'));
                }
            });
        },
        saveContentFromPopup: function (port) {
            port.onMessage.addListener(function (noteData) {
                process.checkLogin(noteData, function (post) {
                    process.save(noteData);
                });
            });
        },
        save: function (noteData) {
            process.saveImages(noteData, function (noteData) {//替换img url后返回的内容
                process.saveNote(noteData, function () {
                    process.closePopup();
                    noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_succeed'), 2000);
                }, function () {
                    noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_failed_and_sign_in'));
                    process.reLogin(noteData);
                });
            }, function () {
                noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_failed'));
            });
//            process.saveNote(noteData, function () {
//                if (g.params.imgArr.length > 0) {
//                    process.saveImages({}, function () {
//                        process.closePopup();
//                        noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_succeed'), 2000);
//                    }, function () {
//                        noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_failed'));
//                    });
//                } else {
//                    process.closePopup();
//                    noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_succeed'), 2000);
//                }
//            }, function () {
//                noteHelper.notifyHTML(chrome.i18n.getMessage('note_save_failed_and_sign_in'));
//                process.reLogin(noteData);
//            });
        },
        saveSelectImage: function (param) {
            var content = '<div class="image"><img src="' + param.imgs[0] + '" title="' + param.imgTitles + '" /></div>';
            var noteData = {
                title: param.title,
                sourceUrl: param.sourceUrl,
                content: content
            };//去掉登录判断
            process.checkLogin(noteData, function () {
                process.save(noteData);
            });
        },
        checkLogin: function (noteData, callback) {
            callback();
            //屏蔽登录判断
//            process.checkSid(function () {
//                callback && callback();
//            });
//            if (noteConfig.getTicket()) {
//                callback();
//            } else {
//                //暂时屏蔽note登录时插件自动登录功能
////                process.autoSignInOrOut(function (flag) {
////                    if (!flag) {//取不到cookie时弹出登录框 这里主要是处理当登录WEB端退出后再登录导致tab监听丢失问题
//                g.params.noteData = noteData;//保存临时数据用户登录后调用
//                chrome.tabs.getSelected(function (tab) {
//                    process.openPopup();
//                });
////                    }
////                });
//            }
        },
        reLogin: function (noteData) {//保存失败后重登录
//            g.params.noteData = noteData;//保存临时数据用户登录后调用
//            noteConfig.setSid('');
//            noteConfig.setUserName('');
//            noteConfig.setTicket('');
//            noteConfig.setBlowFish('');
//            chrome.tabs.getSelected(function (tab) {
//                process.openPopup();
//            });
            process.publicLoginWin(function () {
                if (noteConfig.getLocalStorage('note91sid') && noteConfig.getLocalStorage('note91bid') && noteConfig.getLocalStorage('note91tid')) {
                    process.save(noteData);
                }
            });
        },
        publicLoginWin: function (callback) {
            chrome.windows.create({url: "https://reg.uap.91.com/uaplogin/login/auto?appid=18&returnurl=http://note.91.com/NoteMain/Index.aspx", type: "popup", width: 640, height: 550}, function (win) {
                var tabId = win.tabs[0].id;
                chrome.windows.onRemoved.addListener(function (id) {
                    if (id == win.id) {
                        if (g.params.currentTabId) {
                            chrome.tabs.sendRequest(g.params.currentTabId, {name: 'removemask'});
                        }
                    }
                });
                chrome.tabs.onUpdated.addListener(function handlerOnUpdate(id, info) {
                    if (id == tabId && info.url == "http://note.91.com/NoteMain/Index.aspx") {
                        g.params.pageComplete = true;
                    }
                    if (g.params.pageComplete && info.status == 'loading') {
                        g.params.pageComplete = false;
                        process.cookieToStorage(function () {
                            chrome.tabs.onUpdated.removeListener(handlerOnUpdate);
                            chrome.windows.remove(win.id, null);
                            callback && callback();
                        });
                    }
                });
            });
        },
        checkSid: function (callback) {
            chrome.cookies.get({url: "http://note.91.com", name: "uapc"}, function (cookie) {
                if (!cookie) {
                    process.publicLoginWin(callback);
                } else {
                    process.cookieToStorage(function () {
                        callback && callback();
                    });
                }
            });
        }
    };
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    process.init();
})(jQuery);

