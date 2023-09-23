# **Third Year Project: `Real-time Human Attribute Analysis Web Application`** 






### Author: `Neema Raiyat`

The ZIP contains 3 items, the code for RTHAA, the code for the backend-processing architecture that was abandoned and also an EDA on the FER datasets. These datasets were too large to include into the ZIP file and hence must be downloaded manually, however, the results of the EDA should still be visible in `datasets_eda.ipynb`.

---

# Running RTHAA

RTHAA was the final software output developed in this project. Its source code can be located in the `/rthaa-web-app` folder. This folder contains two other folders, `public` which contains the models used from **face-api.js**, and `src` which contains the actual source code of the application. Also `package.json` specifies all necesarry packages needed to run the application.

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

In order to run:

1. Install Node.js, Python 3 and Flask
2. Initialise a new React.js project, one way of doing so is by running `npm create-react-app` in the terminal.
3. Replace the `public` and `src` folders in this project with RTHAA's `public` and `src` folders, and also copy the `package.json` and `package-lock.json` into the parent folder of the project, it should have the same structure as the `/rthaa-web-app` folder.
4. Run `npm i` to install all package dependencies
5. Run `npm start` to launch the application (on port 3000 by default), and in another terminal, run the python server `server.py`. Running the python server will depend on your environment variables, but in most cases, running `python server.py` should work. When running the server, errors may rise due to packages not being installed. To install said packages run `pip install` followed by the library name, for example `pip install deepface` to install the deepface library.