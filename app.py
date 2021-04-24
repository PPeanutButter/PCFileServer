import json
import mimetypes
import os
import socket
import sys
import time

from flask import Flask, request, send_file, redirect

root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()


def resource_path(relative_path):
    return sys.path[0] + '/' + relative_path


app = Flask(__name__, static_url_path="", static_folder=resource_path('static'),
            template_folder=resource_path("templates"))


def get_host_ip():
    """
    查询本机局域网ip地址
    :return: ip
    """
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
    except Exception:
        print("ip err")
    return ip


@app.errorhandler(404)
def not_found(err):
    return app.send_static_file('index.html')


@app.route('/')
def send_index_html():
    if check_client_ip(request.remote_addr):
        return app.send_static_file('index.html'), 200, [("Cache-Control", "no-cache, no-store, must-revalidate"),
                                                         ("Pragma", "no-cache"), ("Expires", "0"),
                                                         ("Cache-Control", "public, max-age=0")]
    else:
        return redirect('/login', code=302)


@app.route('/login')
def send_login_html():
    return app.send_static_file('login.html'), 200, [("Cache-Control", "no-cache, no-store, must-revalidate"),
                                                     ("Pragma", "no-cache"), ("Expires", "0"),
                                                     ("Cache-Control", "public, max-age=0")]


@app.route('/getAssets')
def send_assets(parent=''):
    res = request.args.get("res")
    path = request.args.get("path")
    if res.startswith("mime-type-icon/video/") and path:
        return get_video_preview(path)
    return app.send_static_file(parent + res)


@app.route('/getFileList')
def send_file_list():
    json_array = []
    path = request.args.get("path")
    a = os.listdir(root + path)
    a.sort()
    for f in a:
        mime = mimetypes.guess_type(f)[0]
        bookmark_flag_file = resource_path('') + 'preview/' + (path + f).replace("/", "_") + '.bookmark'
        if os.path.isdir(root + path + f) and not os.path.exists(root + path + f + '/.cover'):
            # skip folders that might not contains media file
            continue
        if os.path.isfile(root + path + f) and not (
                "application/octet-stream" if mime is None else get_known_mime(mime)).startswith('video/'):
            # skip file that is not media file
            continue
        json_array.append({
            "name": f,
            "type": "File" if os.path.isfile(root + path + f) else "Directory",
            "mime_type": "application/octet-stream" if mime is None else get_known_mime(mime),
            "watched": "watched" if os.path.exists(bookmark_flag_file) else ""
        })
    return json.dumps(json_array), 200, {"Content-Type": "application/json"}


def file_size_desc(size):
    if size >> 30 >= 1.0:
        return f'{size / (1024 * 1024 * 1024):.2f}GB'
    if size >> 20 >= 1.0:
        return f'{size / (1024 * 1024):.2f}MB'
    if size >> 10 >= 1.0:
        return f'{size / 1024:.2f}KB'
    return f'{size:.2f}B'


@app.route('/getFileDetail')
def send_file_detail():
    path = request.args.get("path")
    mime = mimetypes.guess_type(path, False)[0]
    bookmark_flag_file = resource_path('') + 'preview/' + path.replace("/", "_") + '.bookmark'
    json_array = [{
        "key": "类型",
        "value": mime
    }, {
        "key": "大小",
        "value": file_size_desc(os.path.getsize(root + path))
    }, {
        "key": "上次修改时间",
        "value": time.ctime(os.path.getmtime(root + path))
    }, {
        "key": "bookmark_state",
        "value": "bookmark_add" if not os.path.exists(bookmark_flag_file) else "bookmark_added"
    }]
    return json.dumps(json_array), 200, {"Content-Type": "application/json"}


@app.route('/toggleBookmark')
def toggle_bookmark():
    if check_client_ip(request.remote_addr):
        path = request.args.get("path")
        bookmark_flag_file = resource_path('') + 'preview/' + path.replace("/", "_") + '.bookmark'
        state = os.path.exists(bookmark_flag_file)
        if state:
            os.remove(bookmark_flag_file)
        else:
            with open(bookmark_flag_file, 'w') as fp:
                fp.write("This is a Bookmark file!")
        return "成功取消标记" if state else "成功标记为看过"
    else:
        return redirect('/login', code=302)


@app.route("/getFile/<file_name>")
def get_file(file_name):
    if check_client_ip(request.remote_addr):
        # url中加一个文件名避免播放器不知道视频文件名
        path = request.args.get("path")
        return send_file(root + path, as_attachment=True, attachment_filename=path[path.rindex("/") + 1:],
                         conditional=True)
    else:
        return "Permission Denied", 404


@app.route("/getVideoPreview")
def get_video_preview(_path=None):
    path = _path if _path else request.args.get("path")
    cache_file_name = path.replace("/", "_")
    try:
        # 判断是否有缓存
        new_file = resource_path('') + 'preview/' + cache_file_name + '.jpg'
        if not os.path.exists(new_file):
            import cv2
            cap = cv2.VideoCapture(root + path)  # 读取视频文件
            cap.set(cv2.CAP_PROP_POS_FRAMES, float(180))
            _, frame = cap.read()
            if not os.path.exists(resource_path('') + "preview"):
                os.mkdir(resource_path('') + "preview")
            cv2.imencode('.jpg', frame)[1].tofile(new_file)
        return send_file(new_file)
    except BaseException as a:
        print(a.__str__())
        return a.__str__()


@app.route("/getCover")
def get_cover(_path=None):
    path = request.args.get("cover")
    try:
        new_file = root + f'/{path}/.cover'
        return send_file(new_file)
    except BaseException as a:
        print(a.__str__())
        return a.__str__()


@app.route("/getDeviceName")
def get_device_name():
    import platform
    return platform.node()


def get_known_mime(mime_type=''):
    first_list = os.listdir(resource_path('static/mime-type-icon'))
    it = mime_type.split("/")
    try:
        first_list.index(it[0])
    except ValueError:
        return "application/octet-stream"
    secondary_list = os.listdir(resource_path('static/mime-type-icon/' + it[0]))
    try:
        secondary_list.index(it[1])
    except ValueError:
        return it[0] + "/all"
    return mime_type


@app.route("/remoteDownload")
def add_remote_download():
    if check_client_ip(request.remote_addr):
        url = request.args.get("url").replace("__and__", "&")
        name = request.args.get("name")
        l = name.rindex("/")
        import subprocess
        cmd = 'wget -P %s -O %s "%s"' % (root + name[:l], name[l + 1:], url)
        subprocess.call(cmd, shell=True)
        return "成功添加离线任务:" + name
    else:
        return "Permission Denied"


def check_client_ip(ip):
    with open(resource_path('') + "user.json", 'r') as f:
        return ip in json.loads(f.read())['ip']


@app.route("/userLogin")
def user_login():
    name = request.args.get("name")
    psw = request.args.get("psw")
    with open(resource_path('') + "user.json", 'r') as f:
        j = json.loads(f.read())
        try:
            if j[name] == psw and not check_client_ip(request.remote_addr):
                j['ip'].append(request.remote_addr)
                with open(resource_path('') + "user.json", 'w') as f1:
                    f1.write(json.dumps(j))
                return "OK"
            else:
                return "用户名或密码错误"
        except KeyError:
            return "用户名或密码错误"


# 不管是什么路径的链接都发送模板html，读取路径然后通过api来加载文件夹与文件
# api
#      √http://localhost:8081/getDeviceName --获取文件Device Name
#      √http://localhost:8081/getFileList?path=/ --获取文件list[{name,type}]
#      √http://localhost:8081/getAssets?res=style.css --获取html模板资源
#      √http://localhost:8081/getFileDetail?path=style.css --获取文件信息[{mime_type,size,last_edit_time}]
#      √http://localhost:8081/getFile?path= --下载文件
#      √http://localhost:8081/getVideoPreview?path= --下载视频文件缩略图
#      ?http://localhost:8081/settings?key=&value= --设置
#      √http://localhost:8081/remoteDownload?url=&name= --远程下载
#      √http://localhost:8081/else --获取index.html
if __name__ == '__main__':
    print('挂载目录		' + root)
    print('脚本目录		' + resource_path(''))
    print('访问地址		' + 'http://' + get_host_ip() + ':8081/')
    app.run(host="0.0.0.0", port=8081)
