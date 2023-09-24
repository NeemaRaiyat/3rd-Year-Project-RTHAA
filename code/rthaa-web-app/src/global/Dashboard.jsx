// React hooks import
import { useState, useRef, useEffect } from 'react';

// Theme import
import { tokens } from "../theme";

// Material UI related imports
import { Box, Button, useTheme } from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import DeblurOutlinedIcon from '@mui/icons-material/DeblurOutlined';

// Speech Sentiment Analysis-related imports
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import Sentiment from 'sentiment'

// face-api.js is imported for facial expression and attribute recognition
import * as faceapi from "face-api.js";

// Components import
import Header from "./Header"
import SentimentScore from "../components/SentimentScore";
import Transcript from "../components/Transcript";
import PosNegWords from "../components/PosNegWords";
import Gender from "../components/Gender";
import Age from "../components/Age";
import CurrentEmotion from "../components/CurrentEmotion";
import EmotionTime from "../components/EmotionTime";
import AverageEmotion from "../components/AverageEmotion";


const sentiment = new Sentiment();

// MODEL-VIEW-CONTROLLER (MVC) Software Design Pattern is used 
const Dashboard = () => {

    // --------------------------------------------------------------------------------- //
    // ------------------------------------- MODEL ------------------------------------- //
    // --------------------------------------------------------------------------------- //

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // State variables to indicate whether the start button has been pressed and if user data is being processed
    const [processing, setProcessing] = useState(false)
    const processingRef = useRef(null)

    // State variables to indicate whether the face-mesh is currently being shown
    const [showCanvas, setShowCanvas] = useState(false)
    const showCanvasRef = useRef(showCanvas)

    // State variables to store user data
    const [gender, setGender]       = useState('')
    const [age, setAge]             = useState('')
    const [lighting, setLighting]   = useState('')
    
    const [emotion, setEmotion]     = useState('')

    const [neutral, setNeutral]     = useState(0)
    const [happy, setHappy]         = useState(0)
    const [surprise, setSurprise]   = useState(0)
    const [angry, setAngry]         = useState(0)
    const [sad, setSad]             = useState(0)
    const [fear, setFear]           = useState(0)
    const [disgust, setDisgust]     = useState(0)

    const [sentimentScore, setSentimentScore] = useState(null);

    // If browser doesn't support microphone, user will be alerted
    const [hasBeenAlerted, setHasBeenAlerted] = useState(false)

    // For Pie Chart
    const [averageEmotionDict, setAverageEmotionDict] = useState({
        "Neutral": 0,
        "Happy": 0,
        "Surprise": 0,
        "Angry": 0,
        "Sad": 0,
        "Fear": 0,
        "Disgust": 0,
        "Total": 0
    })

    // For Emotion-Time Graph (Line Graph)
    const [emotionsOverTime, setEmotionsOverTime] = useState([
        {
            "id": "Neutral",
            "data": []
        },
        {
            "id": "Disgust",
            "data": []
        },
        {
            "id": "Surprise",
            "data": []
        },
        {
            "id": "Angry",
            "data": []
        },
        {
            "id": "Sad",
            "data": []
        },
        {
            "id": "Fear",
            "data": []
        },
        {
            "id": "Happy",
            "data": []
        }
    ])


    const videoRef = useRef();      // Reference to video stream
    const canvasRef = useRef();     // Reference to canvas (which face mesh is drawn on)

    const CANVAS_WIDTH = 534
    const CANVAS_HEIGHT = 400

    const BRIGHTNESS_THRESH = 80                // Threshold for determing whether user has good/bad lighting

    const MILLISECONDS_PER_FRAME = 1500         // Milliseconds inbetween a frame from the webcam being processed
    const MODELS_PATH = '/models'

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const LAST_N_SECONDS = 20       // The number of values on the x-axis of the Emotion-Time graph (restricted to 20 to avoid clogging)

    /**
     * Resets all user-data state variables to their default value
     */
    const clearStateVars = () => {
        setGender('')
        setAge('')
        setLighting('')
        
        setEmotion('')
        
        setNeutral(0)
        setHappy(0)
        setSurprise(0)
        setAngry(0)
        setSad(0)
        setFear(0)
        setDisgust(0)
        
        resetTranscript()
        setSentimentScore(null)
        
        setAverageEmotionDict({
            "Neutral": 0,
            "Happy": 0,
            "Surprise": 0,
            "Angry": 0,
            "Sad": 0,
            "Fear": 0,
            "Disgust": 0,
            "Total": 0,
        })
        
        setEmotionsOverTime([
            {
                "id": "Neutral",
                "data": []
            },
            {
                "id": "Disgust",
                "data": []
            },
            {
                "id": "Surprise",
                "data": []
            },
            {
                "id": "Angry",
                "data": []
            },
            {
                "id": "Sad",
                "data": []
            },
            {
                "id": "Fear",
                "data": []
            },
            {
                "id": "Happy",
                "data": []
            }
        ])
        clearCanvas()
    }
    
    /**
     * Clears data and stops processing
     */
    const clearData = async () => {
        if (processingRef.current) {
            setProcessing(false)
        }
        // Wait so that we can clear the data after the last frame has been processed (as opposed to before)
        await sleep(1000)     
        clearStateVars();
    }
    
    // -------------------------------------------------------------------------- //
    // ------------------------------- CONTROLLER ------------------------------- //
    // -------------------------------------------------------------------------- //
    
    /**
     * A function that waits a specified number of milliseconds
     * @param {number} ms Number of milliseconds to delay
     * @returns 
    */
   const sleep = (ms) => {
       return new Promise((resolve) => setTimeout(resolve, ms))
    }
    
    /**
     * Removes anything drawn onto the canvas
     */
    const clearCanvas = () => {
        // Remove face mesh and outline when the 'Stop' button is clicked
        canvasRef.current.getContext('2d').clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // Remove -75??
    }
    
    /**
     * Determines whether the user has good lighting by calculating luminance of the current frame
     * @returns A boolean: True if user has good lighting, false otherwise
     */
    const hasGoodLighting = () => {

        // Create canvas element
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        // Draw video element (graphical webcam element) onto our canvas
        canvas.getContext('2d', { willReadFrequently: true }).drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // We use getImageData frequently hence why 'willReadFrequently'=true

        // willReadFrequently flag explained:
        // A boolean value that indicates whether or not a lot of read-back operations are planned. 
        // This will force the use of a software (instead of hardware accelerated) 
        // 2D canvas and can save memory when calling getImageData() frequently.

        // We convert the canvas to an array
        const imageData = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const data = imageData.data;

        let brightness = 0;
        
        // Sum of the luminance of each pixel is calculated by iterating through the array 
        for (let i = 0; i < data.length; i += 4) {
            // Luminance equation
            brightness += (0.2126 * data[i]) + (0.7152 * data[i+1]) + (0.0722 * data[i+2]);
        }
        
        brightness = brightness / (CANVAS_WIDTH * CANVAS_HEIGHT);
        
        return brightness >= BRIGHTNESS_THRESH
    }

    /**
     * Obtains last n seconds of emotionsOverTime, which is displayed, so that Emotion-Time Graph doesn't clog
     * @param {object} emotionsOverTime Array containing data of how each emotion varies over time
     * @param {number} n Last n seconds
     * @returns {object} Array containing data of how each emotion varied during the last n seconds
     */
    const lastNseconds = (emotionsOverTime, n) => {
        
        if (emotionsOverTime[0]['data'].length < n) {
            return emotionsOverTime
        }

        let result = [
            {
                "id": "Neutral",
                "data": []
            },
            {
                "id": "Disgust",
                "data": []
            },
            {
                "id": "Surprise",
                "data": []
            },
            {
                "id": "Angry",
                "data": []
            },
            {
                "id": "Sad",
                "data": []
            },
            {
                "id": "Fear",
                "data": []
            },
            {
                "id": "Happy",
                "data": []
            }
        ];

        for (let i = 0; i < emotionsOverTime.length; i++) {

            const dataArray = emotionsOverTime[i]['data'];
            const emotionsInLastNseconds = dataArray.slice(-1 * n);     // Get the last n elements from the 'data' array

            for (let j = 0; j < emotionsInLastNseconds.length; j++) {   // Loop over each object of the last n elements array
                result[i]['data'].push(emotionsInLastNseconds[j]);                  
            }
        }

        return result;
    }

    /**
     * Facial Attribute Recognition models are loaded
     */
    const loadModels = () => {
        // Runs all of these async calls in parallel
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_PATH),
            faceapi.nets.faceExpressionNet.loadFromUri(MODELS_PATH),
            faceapi.nets.ageGenderNet.loadFromUri(MODELS_PATH)
        ]).then(attributeClassification)
    };

    /**
     * Video stream is started, error is thrown if unsuccessful
     */
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            })
            .catch((error) => {
                console.error("Error accessing user media:", error)
            });
    }

    /**
     * Main attributeClassification function, uses face-api to recognise human attributes and updates the relevant state variables.
     * Canvas is also drawn if canvas state variable is set.
     */
    const attributeClassification = async () => {
        setInterval(async () => {
            while (processingRef.current) {

                // Lighting is determined
                setLighting(hasGoodLighting())

                // Classification
                const detections = await faceapi.detectAllFaces 
                    (videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        .withFaceExpressions()
                        .withAgeAndGender();
                    
                // Relevant state variables are set
                setNeutral(Math.round(detections[0].expressions.neutral))
                setHappy(Math.round(detections[0].expressions.happy))
                setSurprise(Math.round(detections[0].expressions.surprised))
                setAngry(Math.round(detections[0].expressions.angry))
                setSad(Math.round(detections[0].expressions.sad))
                setFear(Math.round(detections[0].expressions.fearful))
                setDisgust(Math.round(detections[0].expressions.disgusted))
    
                const a = Math.round(detections[0].expressions.neutral)
                const b = Math.round(detections[0].expressions.happy)
                const c = Math.round(detections[0].expressions.surprised)
                const d = Math.round(detections[0].expressions.angry)
                const e = Math.round(detections[0].expressions.sad)
                const f = Math.round(detections[0].expressions.fearful)
                const g = Math.round(detections[0].expressions.disgusted)
    
                const array = [a, b, c, d, e, f, g]
                const emotionDict = {0: 'Neutral', 1: 'Happy', 2: 'Surprise', 3: 'Angry', 4: 'Sad', 5: 'Fear', 6: 'Disgust'}
                const currentEmotion = emotionDict[array.indexOf(Math.max(a, b, c, d, e, f, g))]

                setEmotion(currentEmotion)

                // For Avg Emotions Pie Chart
                averageEmotionDict[currentEmotion]++
                averageEmotionDict['Total'] =           // Total is computed for normalisation purposes (i.e. all emotions add up to 100 when displayed in pie chart)
                    averageEmotionDict['Neutral'] 
                    + averageEmotionDict['Happy']
                    + averageEmotionDict['Surprise']
                    + averageEmotionDict['Angry']
                    + averageEmotionDict['Sad']
                    + averageEmotionDict['Fear']
                    + averageEmotionDict['Disgust']
    
                // For Emotion-Time Graph
                let length = emotionsOverTime[0]['data'].length
                emotionsOverTime[0]['data'].push({'x': length, 'y': a*100})
                emotionsOverTime[1]['data'].push({'x': length, 'y': g*100})
                emotionsOverTime[2]['data'].push({'x': length, 'y': c*100})
                emotionsOverTime[3]['data'].push({'x': length, 'y': d*100})
                emotionsOverTime[4]['data'].push({'x': length, 'y': e*100})
                emotionsOverTime[5]['data'].push({'x': length, 'y': f*100})
                emotionsOverTime[6]['data'].push({'x': length, 'y': b*100})

                setGender(detections[0].gender)
                setAge(Math.round(detections[0].age))
                
                // Face Mesh is disabled currently (bug with styling)
                if (showCanvasRef.current && false) {
    
                    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
                    
                    faceapi.matchDimensions(canvasRef.current, {
                        width: CANVAS_WIDTH,
                        height: CANVAS_HEIGHT,
                    })
    
                    const resized = faceapi.resizeResults(detections, {
                        width: CANVAS_WIDTH,
                        height: CANVAS_HEIGHT,
                    });
    
                    faceapi.draw.drawDetections(canvasRef.current, resized)
                    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
                    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    
                    resized.forEach(detection => {
                        const box = detection.detection.box
                        const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
                        drawBox.draw(canvasRef.current)
                    })
                }
                await sleep(MILLISECONDS_PER_FRAME)
            }
        }, MILLISECONDS_PER_FRAME * 3)
    }

    // ----------------- USE EFFECTS ----------------- //

    // Sentiment is calculated everytime the transcript is updated
    useEffect(() => {
        setSentimentScore(sentiment.analyze(transcript));
    }, [transcript])

    // Webcam is opened as soon as page is loaded
    useEffect(() => {
        startVideo();
        videoRef.current.width = CANVAS_WIDTH
        videoRef.current.height = CANVAS_HEIGHT
    }, []);

    // Canvas toggle
    useEffect(() => {
        showCanvasRef.current = showCanvas
        canvasRef.current.getContext('2d').clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }, [showCanvas])

    // Processing toggle (Start/Stop)
    useEffect(() => {
        processingRef.current = processing      // Async function has access to most recent state/reference
        if (processingRef.current) {
            // console.log("Processing")
            SpeechRecognition.startListening({ continuous: true })
            videoRef && loadModels();
        } 
        else {
            // console.log("Stopping Processing")
            // loadModels also stops running
            SpeechRecognition.abortListening()
        }
    }, [processing])

    // If browser doesn't support speech recognition
    if (!browserSupportsSpeechRecognition) {
        if (!hasBeenAlerted) {
            alert("ERROR: Browser doesn't support speech recognition.");
            setHasBeenAlerted(true)
        }
    }
    
    // -------------------------------------------------------------------------------- //
    // ------------------------------------- VIEW ------------------------------------- //
    // -------------------------------------------------------------------------------- //
    return (
        <main 
            className="content"
            style={
                theme.palette.mode === 'dark' ? (
                    {}
                )
                :
                (
                    {
                        background: 'hsl(0, 22%, 95%)'
                    }
                )
            }
        >
            <Header 
                averageEmotionDict={averageEmotionDict} 
                emotionsOverTime={emotionsOverTime} 
                transcript={transcript} 
                sentimentScore={sentimentScore}
                lighting={lighting}
                processing={processing}
                hasBeenAlerted={hasBeenAlerted}
            />      
            <Box m="17px" mt={0}>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(48, 1fr)"
                    gridAutoRows="100px"    // Chrome
                    gap="17px"
                >
                    <SentimentScore sentimentScore={sentimentScore} />

                    {/* WEBCAM COMPONENT */}
                    <Box
                        gridColumn="span 18"
                        gridRow="span 4"
                        backgroundColor={colors.primary[400]}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={2}
                    >
                        {/* WEBCAM CONTAINER */}
                        <Box
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                        >
                            <video crossOrigin='anonymous' 
                                ref={videoRef} 
                                autoPlay 
                                muted
                                className="webcam"
                                >
                            </video>
                            <canvas hidden="true" ref={canvasRef} className='canvas' />
                        </Box>
                            

                        {/* BUTTON CONTAINER */}
                        <Box
                            display="flex"
                            alignItems="center"

                            sx={{
                                margin: "7px 10px 10px 10px",
                            }}
                            justifyContent="space-between"
                        >

                            <Button 
                                variant="contained" 
                                color={processing ? "err" : "alt4"}
                                onClick={() => {
                                    setProcessing((current) => !current)
                                }}
                                endIcon={processing ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
                                sx={{
                                    width: "32.5%",
                                    padding: "8px 8px 8px 8px",
                                    fontWeight: "600"
                                }}
                            >
                                {processing ? "Stop" : "Start"}
                            </Button>

                            <Button 
                                variant="contained" 
                                color="alt"
                                onClick={clearData}
                                endIcon={<RestartAltOutlinedIcon />}
                                sx={{
                                    width: "32.5%",
                                    padding: "8px 8px 8px 8px",
                                    fontWeight: "600"
                                }}
                            >
                                Clear Data
                            </Button>

                            <Button 
                                variant="contained" 
                                color={showCanvas ? "alt5" : "alt3"}
                                onClick={() => setShowCanvas((current) => !current)}
                                disabled={!processing}
                                endIcon={<DeblurOutlinedIcon />}
                                sx={{
                                    width: "32.5%",
                                    padding: "8px 8px 8px 8px",
                                    fontWeight: "600"
                                }}
                            >
                                {showCanvas ? "Remove Face Mesh" : "Add Face Mesh"}
                            </Button>
                            
                        </Box>
                        {/* <canvas hidden="true" ref={canvasRef} className='canvas' /> */}
                    </Box>
                    

                    <Gender gender={gender} />

                    <Age age={age} />

                    <Transcript transcript={transcript} />

                    <CurrentEmotion
                        emotion={emotion}
                        neutral={neutral}
                        happy={happy}
                        surprise={surprise}
                        angry={angry}
                        sad={sad}
                        fear={fear}
                        disgust={disgust}
                    />

                    <PosNegWords sentimentScore={sentimentScore} />

                    <EmotionTime emotionsOverTime={lastNseconds(emotionsOverTime, LAST_N_SECONDS)} lastNseconds={LAST_N_SECONDS} />

                    <AverageEmotion averageEmotionDict={averageEmotionDict} />

                </Box>
            </Box>
        </main>
    )
}

export default Dashboard