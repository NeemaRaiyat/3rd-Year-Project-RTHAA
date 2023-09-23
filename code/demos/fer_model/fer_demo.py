import cv2
from deepface import DeepFace

# 7 emotions detected

DRAW_FACE_OUTLINE = True
WEBCAM_ID = 0

# Face detection using Viola Jones
if DRAW_FACE_OUTLINE:
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Webcam is opened
cap = cv2.VideoCapture(WEBCAM_ID)   
if not cap.isOpened():
    raise IOError("Cannot Open Webcam")

font = cv2.FONT_HERSHEY_SIMPLEX

while True:
    ret, frame = cap.read()     # Read one image from a video
    result = DeepFace.analyze(frame, enforce_detection=False)
    # enfore_detection=False means that there doesn't have to be a face present all the time
    if DRAW_FACE_OUTLINE:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(gray, 1.1, 4)
        # Draw a rectangle around detected face
        for (x, y, w, h) in faces: 
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)      # BGR , width

    # putText() is used to overlay text on video
    cv2.putText(frame,
        'Emotion: ' + result['dominant_emotion'],
        (50, 50),
        font, 1,
        (0, 0, 255),
        2,
        cv2.LINE_4) ;
    
    cv2.putText(frame,
        'Age: ' + str(result['age']),
        (50, 90),
        font, 1,
        (0, 0, 255),
        2,
        cv2.LINE_4) ;

    cv2.putText(frame,
        'Gender: ' + result['gender'],
        (50, 130),
        font, 1,
        (0, 0, 255),
        2,
        cv2.LINE_4) ;

    cv2.putText(frame,
        'Ethnicity: ' + result['dominant_race'],
        (50, 170),
        font, 1,
        (0, 0, 255),
        2,
        cv2.LINE_4) ;
    
    cv2.imshow('Real-time emotion detection', frame)

    # PRESS 'q' TO QUIT!
    if cv2.waitKey(2) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# cd code/local_model/
# python emotion_detection.py

# Source:
# https://www.youtube.com/watch?v=fkgpvkqcoJc&list=LL&index=175&ab_channel=DeepLearning_by_PhDScholar