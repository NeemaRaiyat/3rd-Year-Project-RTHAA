from skimage.exposure import is_low_contrast
import numpy as np
import imutils
import cv2

WEBCAM_ID = 0
LOW_CONTRAST_THRESH = 0.45                  # Threshold for low contrast: 0.45
HIGH_CONTRAST_THRESH = 0.95                 # Threshold for high contrast
DRAW_EDGE_MAP = True
# Lower thresh, means that even slightly dark environments are considered high contrast 
# (so it has to be really dark to be considered low constrast)

# Webcam is opened
cap = cv2.VideoCapture(WEBCAM_ID)   
if not cap.isOpened():
    raise IOError("Cannot Open Webcam")

# loop over frames from the video stream
while True:
    # read a frame from the video stream
    (grabbed, frame) = cap.read()
    # if the frame was not grabbed then we've reached the end of
    # the video stream so exit the script
    if not grabbed:
        print("[INFO] no frame read from stream - exiting")
        break
    # resize the frame, convert it to grayscale, blur it, and then
    # perform edge detection
    frame = imutils.resize(frame, width=450)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 30, 150)

    text = "Good Lighting!"
    color = (0, 255, 0)


    if is_low_contrast(gray, LOW_CONTRAST_THRESH):
        text = "Bad Lighting!"
        color = (0, 0, 255)

    # draw the text on the output frame
    cv2.putText(frame, text, (5, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.8,
        color, 2)

    if DRAW_EDGE_MAP:
        # stack the output frame and edge map next to each other
        output = np.dstack([edged] * 3)
        output = np.hstack([frame, output])
        # show the output to our screen
        cv2.imshow("Real-time low contrast detection", output)
    else:
        cv2.imshow('Real-time low contrast detection', frame)

    key = cv2.waitKey(1) & 0xFF
    
    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()