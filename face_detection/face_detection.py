#!/usr/bin/env python
#Importing the libraries
import os
import cv2
import requests
import json
import datetime
import hashlib
from uuid import getnode as get_mac

# For listing class methods
from optparse import OptionParser
import inspect

DEVICE_TYPE = "web-cam"

publish_endpoint='http://localhost:5000/api/communication/publish/face'
dir_path = os.path.dirname(os.path.realpath(__file__))

face_cascade_location = dir_path+'/haarcascade_frontalface_default.xml'
smile_cascade_location = dir_path+'/haarcascade_smile.xml'

# loading cascades
face_cascade = cv2.CascadeClassifier(face_cascade_location)
smile_cascade = cv2.CascadeClassifier(smile_cascade_location)

# method for face detection
min_no_neighbors = 5
scale_factor = 1.3
rectangle_thickness = 2
face_rectangle_color = (241, 113, 113)
smile_rectangle_color = (42, 138, 138)

class Node:
    def __init__(self, key, value):
        self.key = key
        self.val = value
        self.next = None
        self.prev = None

class FaceDetection:
    def __init__(self):
        self.head = Node(0,0)
        self.tail = Node(0,0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.class_methods = {}
        self.dict = {}
        self.list_class_methods()

    # defining a function that will do the detection
    def detect(self, gray, original_frame):
        faces = face_cascade.detectMultiScale(gray, scale_factor, min_no_neighbors)
        for (x,y,w,h) in faces:
            cv2.rectangle(original_frame, (x,y), (x+w, y+h), face_rectangle_color, rectangle_thickness)
            roi_gray = gray[y:y+h, x: x+w]
            roi_color = original_frame[y:y+h, x: x+w]
            sub_face = original_frame[y:y+h, x:x+w]
            payload = {
                        'topic':'face',
                        'message': str(sub_face),
                        'current_time': get_current_time(),
                        'device_type': DEVICE_TYPE,
                        'mac_address': get_mac_address(),
                        'check_sum': get_md5_hash(sub_face)
                        }
            requests.post(publish_endpoint, json=payload)
            #cv2.imshow('Face', sub_face)
            smiles = smile_cascade.detectMultiScale(roi_gray, 1.7, 22)
            for (sx, sy, sw, sh) in smiles:
                cv2.rectangle(roi_color, (sx, sy), (sx+sw, sy+sh), smile_rectangle_color, rectangle_thickness)
        return original_frame

    # generate sketch
    def sketch(self, image):
        # convert image to gray scale
        img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # clean up image usng gaussian blur
        img_gray_blur = cv2.GaussianBlur(image, (5,5), 0)
        # extract edges
        edges = cv2.Canny(img_gray_blur, 20, 70)

        ret, mask = cv2.threshold(edges, 70, 255, cv2.THRESH_BINARY_INV)
        return mask

    def capture_video(self):
        # face recognition with webcam
        video_capture = cv2.VideoCapture(0)
        while True:
            _, frame = video_capture.read()
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            canvas = self.detect(gray, frame)
            #cv2.imshow('Our Live Sketch', sketch(frame))
            cv2.imshow('Video', canvas)

            if  cv2.waitKey(1) == 13: # break when enter is executed
                break

    def list_class_methods(self):
        datas = inspect.getmembers(self, predicate=inspect.ismethod)
        for data in datas:
            if data[0] != "list_class_methods":
                self.class_methods[data[0]] = data[1]
        return ([func for func in dir(self) if callable(getattr(self, func)) and (not func.startswith("__") and not func.startswith("_") )])

    def _add_method_operation(self, method_name):
        if method_name in self.class_methods:
            node = Node(method_name, self.class_methods[method_name])
            self.dict[method_name] = node
            p = self.tail.prev
            p.next = node
            node.next = self.tail
            node.prev = p
            self.tail.prev = node
            return True
        return False

    def _list_method_operation(self):
        return list(self.dict.items())

    def _remove_method_operation(self, method_name):
        if method_name in self.dict:
            node = self.dict[method_name]
            p = node.prev
            n = node.next
            p.next = n
            n.prev = p
            return True
        return False
    def _execute_method_operation(self):
        for key, value in self.dict.items():
            # execute the values iteratively
            print(f"## Executing-- {key} ##")
            self.value()
            print(f"## {key} execution is complete ##")

def get_md5_hash(data):
    """
    This function is responsible for getting the md5 sum of the data
    """

    return hashlib.md5(str(data).encode()).hexdigest()

def get_current_time():
    """
    This function is responsible for getting the currrent time
    """
    return str(datetime.datetime.now())

def get_mac_address():
    """
    This function is responsible for getting the mac address of the device
    """
    mac = get_mac()
    return ':'.join(("%012X" % mac)[i:i+2] for i in range(0, 12, 2))

if __name__ == "__main__":
    FD = FaceDetection()
    import pdb;pdb.set_trace()
    FD.capture_video()
    # release the camera and close the windows
    # video_capture.release()
    # cv2.destroyAllWindows()

    # In[6]:
    # video_capture.release()
    # cv2.destroyAllWindows()


# In[ ]:
