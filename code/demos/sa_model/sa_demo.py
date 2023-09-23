import speech_recognition as sr
import pyttsx3

# --------------- VADER --------------- #
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# --------------- RoBERTa --------------- #
from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax

# --------------- HuggingFace Pipeline --------------- #
from transformers import pipeline

# --------------- TextBlob --------------- #
from textblob import TextBlob


SA_MODELS = ['VADER', 'RoBERTa', 'T_Pipeline', 'TextBlob']
# VADER OUTPUT:         {'neg': 0.0, 'neu': 0.318, 'pos': 0.682, 'compound': 0.6468}
# RoBERTa OUTPUT:       {'neg': 0.0016519687, 'neu': 0.0065048463, 'pos': 0.99184316}
# T_Pipeline OUTPUT:    [{'label': 'POSITIVE', 'score': 0.9997627139091492}]
# TextBlob OUTPUT:      Sentiment(polarity=-0.195, subjectivity=0.52)
SA_MODEL = SA_MODELS[1]
USE_ALL_MODELS = True

# --------------- VADER --------------- #
sia = SentimentIntensityAnalyzer()  

# --------------- RoBERTa --------------- #
MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"    # Pulls down pre-trained model weights. 
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

def polarity_scores_roberta(sentence):
    encoded_text = tokenizer(sentence, return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    scores_dict = {
        'neg' : round(scores[0], 3),
        'neu' : round(scores[1], 3),
        'pos' : round(scores[2], 3)
    }
    return scores_dict

# --------------- HuggingFace Pipeline --------------- #
sent_pipeline = pipeline("sentiment-analysis")


# Speech recognition object is created
recognizer = sr.Recognizer()

print("| =============================== |")
print("| ============ START ============ |")
print("| =============================== |")


while True:
    try:
        with sr.Microphone() as mic:
            
            # Mic recognizes when we start talking and when we stop talking
            recognizer.adjust_for_ambient_noise(mic, duration=0.2)
            
            # Listen to the microphone
            audio = recognizer.listen(mic)

            # Text is extraced and using google's voice-to-text
            text = recognizer.recognize_google(audio)
            text = text.lower()

            # Recognized text is printed out
            print(f"|--->>> RECOGNIZED: {text}\n")

            if SA_MODEL == SA_MODELS[0] or USE_ALL_MODELS:
                print(f"|--->>> SENTIMENT ({SA_MODELS[0]})     : {sia.polarity_scores(text)}\n")

            if SA_MODEL == SA_MODELS[1] or USE_ALL_MODELS:
                print(f"|--->>> SENTIMENT ({SA_MODELS[1]})   : {polarity_scores_roberta(text)}\n")

            if SA_MODEL == SA_MODELS[2] or USE_ALL_MODELS:
                print(f"|--->>> SENTIMENT ({SA_MODELS[2]}): {sent_pipeline(text)}\n")
            
            if SA_MODEL == SA_MODELS[3] or USE_ALL_MODELS:
                print(f"|--->>> SENTIMENT ({SA_MODELS[3]})  : {TextBlob(text).sentiment}\n")

            # TextBlob(text).sentiment.polarity          # -1 to +1
            # TextBlob(text).sentiment.subjectivity    
            # # 0 to 1, 0 is very objective, 1 is very subjective, so essentially it's a confidence rating
            # the lower, the more confident

    except sr.UnknownValueError:
        recognizer = sr.Recognizer()
        continue
        