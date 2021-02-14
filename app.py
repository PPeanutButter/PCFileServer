import json
import mimetypes
import os
import sys
import time

from flask import Flask, request, send_file

root = os.getcwd()


def resource_path(relative_path):
    # if hasattr(sys, '_MEIPASS'):
    #     return os.path.join(sys._MEIPASS, relative_path)
    # return os.path.join(os.path.abspath("."), relative_path)
    return sys.path[0]+'/'+relative_path


app = Flask(__name__, static_url_path="", static_folder=resource_path('static'),
            template_folder=resource_path("templates"))


@app.errorhandler(404)
def not_found(err):
    return app.send_static_file('index.html')


@app.route('/')
def send_index_html():
    return app.send_static_file('index.html')


@app.route('/getAssets')
def send_assets(parent=''):
    return app.send_static_file(parent + request.args.get("res"))


@app.route('/getFileList')
def send_file_list():
    jsonArray = []
    path = request.args.get("path")
    for f in os.listdir(root + path):
        mime = mimetypes.guess_type(f)[0]
        jsonArray.append({
            "name": f,
            "type": "File" if os.path.isfile(root + path + f) else "Directory",
            "mime_type": "application/octet-stream" if mime is None else get_known_mime(mime)
        })
    return json.dumps(jsonArray), 200, {"Content-Type": "application/json"}


@app.route('/getFileDetail')
def send_file_detail():
    path = request.args.get("path")
    mime = mimetypes.guess_type(path, False)[0]
    jsonArray = [{
        "key": "类型",
        "value": mime
    }, {
        "key": "大小",
        "value": (os.path.getsize(root + path) >> 10).__str__() + "KB"
    }, {
        "key": "上次修改时间",
        "value": time.ctime(os.path.getmtime(root + path))
    }]
    return json.dumps(jsonArray), 200, {"Content-Type": "application/json"}


@app.route("/getFile")
def get_file():
    path = request.args.get("path")
    return send_file(root+path, as_attachment=True, attachment_filename=path[path.rindex("/")+1:], conditional=True)


@app.route("/getDeviceName")
def get_device_name():
    import platform
    return platform.node()


def get_known_mime(mime_type=''):
    firstList = os.listdir(resource_path('static/mime-type-icon'))
    it = mime_type.split("/")
    try:
        firstList.index(it[0])
    except ValueError:
        return "application/octet-stream"
    secondaryList = os.listdir(resource_path('static/mime-type-icon/' + it[0]))
    try:
        secondaryList.index(it[1])
    except ValueError:
        return it[0] + "/all"
    return mime_type


# 不管是什么路径的链接都发送模板html，读取路径然后通过api来加载文件夹与文件
# api：
#      √http://localhost:8081/getDeviceName --获取文件Device Name
#      √http://localhost:8081/getFileList?path=/ --获取文件list[{name,type}]
#      √http://localhost:8081/getAssets?res=style.css --获取html模板资源
#      √http://localhost:8081/getFileDetail?path=style.css --获取文件信息[{mime_type,size,last_edit_time}]
#      √http://localhost:8081/getFile?path= --下载文件
#      ?http://localhost:8081/getVideoPreview?path= --下载视频文件缩略图
#      ?http://localhost:8081/settings?key=&value= --设置
#      √http://localhost:8081/else --获取index.html
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8081)
