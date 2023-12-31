# **Third Year Project: Real-time Human Attribute Analysis Web Application** 

<!-- # Check things are runnable
# Screenshots of demos
# Precise instructions on how to run things
# MAKE REPO PUBLIC
# DO FINAL CHECK OF EVERYTHING, REMOVE BAD COMMENTS ETC. UNI FORMAT -->

### Author: `Neema Raiyat`

---

# What is RTHAA?

Emotions form the fundamental basis for physical communication between humans. They give us a glimpse about our thought process and an insight of what is going on inside the mind. Therefore, measuring the changes in emotion induced by products is clearly an object of interest for businesses. Many existing systems that measure and monitor a human's emotion are restricted as they are unimodal, i.e. they use only a single channel of sensory input and hence are less reliable and accurate. 

RTHAA (pronounced: "Arthur") is a multimodal web application developed using React.js capable of, *real-time human attribute analysis* (RTHAA), that not only monitors a human's emotions using their facial expression, using deep learning, but also measures their speech-content sentiment, using sentiment analysis, resulting in a more comprehensive and robust tool. Other human attributes like age and sex are also measured as they can provide useful data on how different demographics interact with the system. User testing with people of varying ages, sexes and ethnicities showed that our application can more reliably measure a human's overall impression of a system compared to contemporary tools.

> Angry face, negative sentiment, dark colour theme:

![RTHAA-dashboard](docs/images/cv_public1.png)

> Happy Face, positive sentiment, dark colour theme:

![RTHAA-dashboard](docs/images/cv_public2.png)

> Neutral Face, neutral sentiment, light colour theme:

![RTHAA-dashboard](docs/images/webappFE12H.png)


---

# Navigating this repo

The directory skeleton of the key directories/files is as follows:

```
3rd-Year-Project-RTHAA/
├── code/
│   ├── backend-processing-architecture/
│   ├── demos/
│   │   ├── fer_model/
│   │   ├── lc_model/
│   │   ├── sa_model/
│   │   └── demo.py
│   ├── rthaa-web-app/
│   └── datasets_eda.ipynb
├── docs/
│   ├── diagrams/
│   └── images/
└── dissertation.pdf
```

* `/code` - Contains 4 items:

    * `/backend-processing-architecture` - A React app that utilizes a server in to process user data

    * `/demos` - Contains demos (that can be run locally) of the various models used in RTHAA

    * `/rthaa-web-app` - The main **RTHAA** React app where user data processing is done entirely in the browser

    * `datasets_eda.ipynb` - A brief EDA of the datasets used to train the various models in this project 

* `/docs` - Contains various project documentation and images

* `dissertation.pdf` - 18,000 word document that explains the entire background, design, implmentation, testing and evaluation of this application. A fun read ;)

---

# Running demos

> Ensure you have the required packages installed: DeepFace, OpenCV, numpy, scikit-image, mediapipe etc.

Navigate to `/code/demos` which contains all the demos:

## Facial Expression Recognition (FER) demo

* `/fer_model` - Real-time **Facial Expression Recognition**, ethnicity, age and sex detection. This can be run as follows:

```bash
python fer_model/fer_demo.py
```

![fer-demo](docs/images/cv_public4.png)

## Low-Contrast (LC) demo

* `/lc_model` - Real-time **low-contrast** detection, i.e. detects poor lighting environments. The better the lighting, the more edges that should be discernable, as shown on the right-hand side black and white image. Try shining a light on your face and more edges will appear, indicating better lighting! This can be run as follows:

```bash
python lc_model/lc_demo.py
```

> Good lighting, most major edges are discernable

![lc-demo](docs/images/cv_public3.png)

> More light being shone on my face, and hence more edges are disernable

![lc-demo](docs/images/cv_public7.png)

> Poor lighting, few edges are discernable

![lc-demo](docs/images/cv_public8.png)

## Sentiment Analysis (SA) demo

* `/sa_model` - Real-time **sentiment analysis**, based off of user's speech, picked up from microphone. . This can be run as follows:
```bash
python sa_model/sa_demo.py
```

![sa-demo](docs/images/cv_public5.png)

## Facial Landmark demo

* `demo.py` - Does FER, LC and Facial landmark detection
```bash
python demo.py
```
![fl-demo](docs/images/cv_public6.png)

---

# Running RTHAA

> Make sure browser is chromium-based for the best experience!

RTHAA was the final software output developed in this project. Its source code can be located in `/code/rthaa-web-app`. This directory contains two important directories and a file:

* `/public` contains pre-trained models used from **face-api.js**

* `/src` contains source code

* `package.json` specifies required packages

![RTHAA-dashboard](docs/images/webappFE13H.png)

In order to run RTHAA:

1. Install Node.js.

2. Initialise a new React.js project, one way of doing so is by running `npm create-react-app` in the terminal.

3. Replace the `public` and `src` folders in this project with RTHAA's `public` and `src` folders, and also copy the `package.json` and `package-lock.json` into the parent folder of the project, it should have the same structure as the `/rthaa-web-app` folder.

4. Run `npm i` to install all package dependencies

5. Run `npm start` to launch the application (on port 3000 by default)

## Navigating RTHAA's subfolders

Contained in the `src` folder are 3 other folders. The `charts` folder contains the data visualization components, the `components` folder contains the dashboard components and the `global` folder contains the high level, large components, i.e. the dashboard and header component. The most important file in the code for RTHAA, is `Dashboard.jsx`, contained in the `global` folder. This component contains all the other UI and data visualization components, as well as the data logic.

When looking into the `src` folder, `Index.js` is responsible for rendering the main React component, `App.js`, into the DOM. `App.js` is the main entry point for the application. It is the top-level component that is responsible for rendering all other components and content of the application. `index.css` simply contains some basic styling for the page. `theme.js` contains the colour theme used in RTHAA.

The `public` folder contains the `models` folder which contains the pre-trained models used from **face-api.js**.

---


# Running Backend-Processing Architecture

This was the intial application developed in the first few sprints of the development phase of the project, and was later abandond due to performance reasons as discussed in Sections 5.1 and 6.1 of the final report. 

![BPA-dashboard](docs/images/webappFE3H.png)

In order to run:

1. Install Node.js, Python 3 and Flask
2. Initialise a new React.js project, one way of doing so is by running `npm create-react-app` in the terminal.
3. Replace the `public` and `src` folders in this project with RTHAA's `public` and `src` folders, and also copy the `package.json` and `package-lock.json` into the parent folder of the project, it should have the same structure as the `/rthaa-web-app` folder.
4. Run `npm i` to install all package dependencies
5. Run `npm start` to launch the application (on port 3000 by default), and in another terminal, run the python server `server.py`. Running the python server will depend on your environment variables, but in most cases, running `python server.py` should work. When running the server, errors may rise due to packages not being installed. To install said packages run `pip install` followed by the library name, for example `pip install deepface` to install the deepface library.