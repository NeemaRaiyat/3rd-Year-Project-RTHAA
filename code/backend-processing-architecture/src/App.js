// ! PLEASE NOTE: React App will by default run on port:3000
// ! If this port is changed, make sure to change the 'REACT_JS_PORT' constant in 'server.py' to whatever the new port is
// ! Also any changes to WEBSOCKET_PORT should be reflected in 'server.py' too

import Webcam from "react-webcam"
import React, { useState, useRef, useEffect } from "react"
import SpeechToText from "./components/SpeechToText"
import openSocket from "socket.io-client"


const App = () => {
    // ! ---------------
    // Defines how many miliseconds delay there should be between each frame being sent to the backend to prevent overload
    const MILLISECONDS_PER_FRAME = 3500         // FAST_ML = False
    // const MILLISECONDS_PER_FRAME = 500       // FAST_ML = True
    // ! ---------------

    const WEBSOCKET_PORT = 8000
    const socket = openSocket(`http://localhost:${WEBSOCKET_PORT}`) // ? This would ideally be done securely (httpS)

    const webRef = useRef(null)

    const [processing, setProcessing] = useState(false)
    const processingRef = useRef(null)

    const [emotion, setEmotion]     = useState("")
    const [gender, setGender]       = useState("")
    const [race, setRace]           = useState("")
    const [age, setAge]             = useState("")
    const [lighting, setLighting]   = useState("")

    const [angry, setAngry]         = useState("")
    const [fear, setFear]           = useState("")
    const [sad, setSad]             = useState("")
    const [happy, setHappy]         = useState("")
    const [surprise, setSurprise]   = useState("")
    const [disgust, setDisgust]     = useState("")
    const [neutral, setNeutral]     = useState("")

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    useEffect(() => {
        const toggleProcessing = async () => {
            while (processingRef.current) {
                console.log("Processing")
                // ?: Compress base 64 webp string format ?
                // ?: Change image format to jpeg for compression? Test which one is quicker!
                socket.emit("frame", webRef.current.getScreenshot())    // SEND IMAGE TO BACK END
                await sleep(MILLISECONDS_PER_FRAME)
            }
            console.log("Stopping Processing")
        }
        processingRef.current = processing      // Async function has access to most recent state/reference
        if (processing) {
            toggleProcessing()  // async function
        }
    }, [processing])

    socket.on("frame_data", (data) => {
        // setResponse(JSON.stringify(data))
        setEmotion(data.emotion)
        setGender(data.gender)
        setAge(data.age)
        setRace(data.race)
        setLighting(data.lighting)

        setAngry(data.angry)
        setDisgust(data.disgust)
        setFear(data.fear)
        setNeutral(data.neutral)
        setHappy(data.happy)
        setSad(data.sad)
        setSurprise(data.surprise)
    })

    return (
        <>
            <div className="app">
                <div className="text-to-speech">
                    <SpeechToText />        
                </div>
                <div className="webcam-container">
                    <Webcam
                        ref={webRef}
                        mirrored={true}
                        screenshotQuality={0.5}
                        className="webcam"
                    />
                    <div className="webcam-button-container">
                        <button onClick={() => setProcessing((current) => !current)}>
                            {processing ? "Stop Processing" : "Begin Processing"}
                        </button>
                    </div>
                </div>
                <div className="data">
                    Emotion: &nbsp;&nbsp;&nbsp; {processing ? emotion : ""}
                    <br />
                    Gender: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {processing ? gender : ""}
                    <br />
                    Race: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {processing ? race : ""}
                    <br />
                    Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    {processing ? age : ""}
                    <br />
                    <br />
                    Lighting: &nbsp;&nbsp;&nbsp; {processing ? lighting : ""}
                    <br />
                    <br />
                    Angry: &nbsp;&nbsp;&nbsp; {processing ? angry + '%' : ""}
                    <br />
                    Disgust: &nbsp; {processing ? disgust + '%' : ""}
                    <br />
                    Fear: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {processing ? fear + '%' : ""}
                    <br />
                    Sad: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}{processing ? sad + '%' : ""}
                    <br />
                    Surprise:&nbsp;&nbsp;{processing ? surprise + '%' : ""}
                    <br />
                    Neutral: &nbsp; {processing ? neutral + '%' : ""}
                    <br />
                    Happy: &nbsp;&nbsp;&nbsp; {processing ? happy + '%' : ""}
                </div>
            </div>
        </>
    )
}

export default App
