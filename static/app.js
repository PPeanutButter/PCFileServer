var root = "/";

function goNext(name) {
    root = root + name + "/";
    getFileList();
}

function goBack() {
    if (root !== "/") {
        root = root.substring(0, root.substring(0, root.length - 1).lastIndexOf("/") + 1);
        getFileList();
    } else openSnackbar("不能再返回了");
}

function onItemClick(name, type, mime_type) {
    console.log(name);
    if (type === "Directory")
        goNext(name);
    else
        getFileDetail(name, mime_type);
}

function getFileList() {
    $.get("/getFileList?path=" + root, function (data) {
        $('#dir-panel').empty();
        $('#file-panel').empty();
        $('.mdc-top-app-bar__title').text(root)
        for (const list of eval(data)) {
            if (list.type === "Directory")
                $('div#dir-panel').append(String.format(directory_html_data, list.name))
            else {
                let _0 = list.name
                let _1 = list.mime_type
                let _2 = root + _0
                let _3 = window.location.host + "/getFile/" + _0 + "?path=" + _2
                let _4 = _2
                let _5 = list.bookmark_state
                let _6 = list.watched
                $('div#file-panel').append(String.format(file_html_data, _0, _1, _2, _3, _4, _5, _6));
            }
        }
        // const selector = '.mdc-button, .mdc-icon-button';
        // const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
        //     return new mdc.ripple.MDCRipple(el);
        // });
    });
}

function getFileDetail(fileName, mime_type) {
    $.get("/getFileDetail?path=" + root + fileName, function (data) {
        //文件名
        $('.file-dialog-name__text').text(fileName);
        $('.mdc-list-detail-panel').empty();
        $('.mdc-dialog__actions_').empty();
        //判断是否是视频文件
        let _2 = "/getVideoPreview?path=" + root + fileName
        //详情
        let bookmark;
        for (const list of eval(data)) {
            if (list.key === "bookmark_state") {
                bookmark = list.value
                continue
            }
        }
        $('div.mdc-dialog__actions_').append(String.format(dialog_actions_html, window.location.host + "/getFile/" + fileName + "?path=" + root + fileName, isVideo, root + fileName, bookmark))
        showDialog();
    });
}

function onDialogButtonClick(url, type) {
    console.log(url)
    if (type === "copy") {
        const clipboard = new ClipboardJS('.dialog-copy', {
            text: function (trigger) {
                return encodeURI(url);
            }
        });
        clipboard.on('success', function (e) {
            openSnackbar("复制成功");
            e.clearSelection();
            clipboard.destroy();
        });
        clipboard.on('error', function (e) {
            openSnackbar("复制失败：" + data + "，请手动复制");
            clipboard.destroy();
        });
    } else if (type === "download") {
        window.open(encodeURI("http://" + url));
    } else if (type === "play") {
        window.open(encodeURI("potplayer://http://" + url));
    } else if (type === "bookmark") {
        $.get("/toggleBookmark?path=" + url, function (data) {
            openSnackbar(data)
            getFileList()
        });
    }
}

String.format = function () {
    if (arguments.length === 0)
        return null;
    let str = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        const re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

function openSnackbar(error_msg) {
    $("div.mdc-snackbar__label").text(error_msg);
    const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.open();
}

function showDialog() {
    const dialog = new mdc.dialog.MDCDialog(document.querySelector('#dialog-detail'));
    dialog.open();
}

function addRemoteDownload() {
    const dialog = new mdc.dialog.MDCDialog(document.querySelector('#dialog-download'));
    dialog.open();
}

getFileList()