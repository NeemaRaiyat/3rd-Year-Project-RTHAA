from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from textblob import TextBlob

from PIL import Image
import base64
import io

from deepface import DeepFace
import cv2
from skimage.exposure import is_low_contrast
import numpy as np
import imutils

LOW_CONTRAST_THRESH = 0.55  # Lower thresh, means that even slightly dark environments are considered high contrast 

# ! =========================
FAST_ML = False     # Decides whether to use the actual pretrained models, or hardcodes the result
# ! =========================

REACT_JS_PORT = 3000        # Port which react application is hosted on
WEBSOCKET_PORT = 8000       # Port which websocket opens on and sends/receives data

app = Flask(__name__)
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins=f"http://localhost:{REACT_JS_PORT}")  # '*' Will allow origin from all, but not good for security reasons

def getLighting(image):
    image = imutils.resize(image, width=450)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    lighting = 'good'
    if is_low_contrast(gray, LOW_CONTRAST_THRESH):
        lighting = 'bad'

    return lighting
    
@socketio.on("text")
def handle_text(text):
    sentiment = TextBlob(text).sentiment
    sentiment_polarity = sentiment.polarity
    sentiment_subjectivity = sentiment.subjectivity
    data = {
        'sentiment_polarity': sentiment_polarity,
        'sentiment_subjectivity': sentiment_subjectivity
    }
    emit("text_data", data, broadcast=False)


@socketio.on("frame")
def handle_frame(frame):
    # FRAME IS A STRING
    # frame[:100] :
    # data:image/webp;base64,UklGRiKNAABXRUJQVlA4WAoAAAAgAAAA8wEAdgEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCI
    # split() function is used to remove everything before the comma (including the comma itself)

    image = Image.open(io.BytesIO(base64.b64decode(frame.split(',')[1])))
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  # ! Don't convert to RGB

    # Create a case statement of all the models
    if FAST_ML:
        emotion = 'FAST_ML: neutral'
        age     = '24'
        gender  = 'man'
        race    = 'middle eastern'

        emotion     = 'FAST_ML'
        angry       = 'FAST_ML'
        disgust     = 'FAST_ML'
        fear        = 'FAST_ML'
        happy       = 'FAST_ML'
        sad         = 'FAST_ML'
        surprise    = 'FAST_ML'
        neutral     = 'FAST_ML'

    else:
        result = DeepFace.analyze(image, enforce_detection=False)
        # result = DeepFace.analyze(image, enforce_detection=False, prog_bar=False)
        # result = DeepFace.analyze(image, enforce_detection=False, actions=['emotion', 'age', ...])
        
        
        emotion     = result['dominant_emotion']
        angry       = str(round(result['emotion']['angry']))
        disgust     = str(round(result['emotion']['disgust']))
        fear        = str(round(result['emotion']['fear']))
        happy       = str(round(result['emotion']['happy']))
        sad         = str(round(result['emotion']['sad']))
        surprise    = str(round(result['emotion']['surprise']))
        neutral     = str(round(result['emotion']['neutral']))

        age         = str(result['age'])
        gender      = result['gender']
        race        = result['dominant_race']

    lighting = getLighting(image)

    data = {
        'emotion'   : emotion,
        'gender'    : gender,
        'age'       : age,
        'race'      : race,
        'lighting'  : lighting,
        'angry'     : angry,
        'disgust'   : disgust,
        'fear'      : fear,
        'sad'       : sad,
        'neutral'   : neutral,
        'surprise'  : surprise,
        'happy'     : happy
    }

    emit("frame_data", data, broadcast=False)   # Was TRUE before, but this meant broadcasting to all

if __name__ == '__main__':
    socketio.run(app, port=WEBSOCKET_PORT) 