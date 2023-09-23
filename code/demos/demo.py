import cv2
from deepface import DeepFace
from skimage.exposure import is_low_contrast
import mediapipe as mp

DRAW_FACE_OUTLINE   = False
DRAW_FACE_MESH      = True
DETECT_LOW_CONTRAST = True
LOW_CONTRAST_THRESH = 0.55                  # Threshold for low contrast: 0.55

WEBCAM_ID = 0

# Face detection using Viola Jones
if DRAW_FACE_OUTLINE:
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

if DRAW_FACE_MESH:
    mpDraw = mp.solutions.drawing_utils
    mpFaceMesh = mp.solutions.face_mesh
    faceMesh = mpFaceMesh.FaceMesh(max_num_faces=1)
    drawSpec = mpDraw.DrawingSpec(thickness=1, circle_radius=0)

# Webcam is opened
cap = cv2.VideoCapture(WEBCAM_ID)   
if not cap.isOpened():
    raise IOError("Cannot Open Webcam")

font = cv2.FONT_HERSHEY_SIMPLEX

blue = (255, 191, 0)
green = (0, 245, 80)
red = (30, 50, 255)
yellow = (0, 255, 255)
purple = (214, 112, 218)
orange = (0, 180, 255)

def putText(frame, str: str, coords: tuple, font_size: float, BGR_color: tuple):
    cv2.putText(frame,
        str.title(),
        coords,
        font, font_size,
        BGR_color,
        2,
        cv2.LINE_4) ;

while True:
    ret, frame = cap.read()     # Read one image from a video
    result = DeepFace.analyze(frame, enforce_detection=False)
    # enfore_detection=False means that there doesn't have to be a face present all the time

    # Converted to Gray for Face detection and low contrast detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if DRAW_FACE_MESH:
        imgRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = faceMesh.process(imgRGB)
        if results.multi_face_landmarks:
            for faceLms in results.multi_face_landmarks:
                mpDraw.draw_landmarks(frame, faceLms, mpFaceMesh.FACEMESH_CONTOURS, drawSpec, drawSpec)

    if DRAW_FACE_OUTLINE:
        faces = faceCascade.detectMultiScale(gray, 1.1, 4)
        # Draw a rectangle around detected face
        for (x, y, w, h) in faces: 
            cv2.rectangle(frame, (x, y), (x+w, y+h), purple, 2)      # BGR , width

    if DETECT_LOW_CONTRAST:
        lc_text = "Good"
        lc_color = green

        if is_low_contrast(gray, LOW_CONTRAST_THRESH):
            # text = "Low contrast: Yes"
            lc_text = "!! BAD !!"
            lc_color = (0, 0, 255)

        putText(frame, f'Lighting:', (5, 25), 0.8, red)
        putText(frame, f'{lc_text}', (130, 25), 0.8, lc_color)

    # putText() is used to overlay text on video
    color1 = red
    color2 = orange
    putText(frame, "Emotion:", (5, 75), 0.8, color1)
    putText(frame, f"{result['dominant_emotion']}", (130, 75), 0.8, color2)

    putText(frame, "Gender:", (5, 100), 0.8, color1)
    putText(frame, f"{result['gender']}", (130, 100), 0.8, color2)

    putText(frame, "Race:", (5, 125), 0.8, color1)
    putText(frame, f"{result['dominant_race']}", (130, 125), 0.8, color2)

    putText(frame, "Age:", (5, 150), 0.8, color1)
    putText(frame, f"{result['age']}", (130, 150), 0.8, color2)

    # --------- Dictionary Data --------- #
    color1 = orange
    color2 = blue
    putText(frame, "Neutral:", (5, 200), 0.7, color1)
    putText(frame, f"{round(result['emotion']['neutral'])}%", (120, 200), 0.7, color2)

    putText(frame, "Happy:", (5, 225), 0.7, color1)
    putText(frame, f"{round(result['emotion']['happy'])}%", (120, 225), 0.7, color2)

    putText(frame, "Surprise:", (5, 250), 0.7, color1)
    putText(frame, f"{round(result['emotion']['surprise'])}%", (120, 250), 0.7, color2)

    putText(frame, "Sad:", (5, 275), 0.7, color1)
    putText(frame, f"{round(result['emotion']['sad'])}%", (120, 275), 0.7, color2)

    putText(frame, "Fear:", (5, 300), 0.7, color1)
    putText(frame, f"{round(result['emotion']['fear'])}%", (120, 300), 0.7, color2)

    putText(frame, "Angry:", (5, 325), 0.7, color1)
    putText(frame, f"{round(result['emotion']['angry'])}%", (120, 325), 0.7, color2)

    putText(frame, "Disgust:", (5, 350), 0.7, color1)
    putText(frame, f"{round(result['emotion']['disgust'])}%", (120, 350), 0.7, color2)

    cv2.imshow('Real-time Human Attribute Analysis Demo', frame)

    # PRESS 'q' TO QUIT!
    if cv2.waitKey(2) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()