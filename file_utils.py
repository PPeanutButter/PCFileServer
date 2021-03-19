import cv2


def get_video_pic(name):
    cap = cv2.VideoCapture(name)
    cap.set(1, int(cap.get(7)/2))  # 取它的中间帧
    ret, frame = cap.read()  # 如果rval为False表示这个视频有问题，为True则正常
    if ret:
        cv2.imwrite('image.jpg', frame)  # 存储为图像
    cap.release()


get_video_pic("1.mp4")
