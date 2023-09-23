import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { useEffect, useState } from 'react'
import Sentiment from 'sentiment'

const sentiment = new Sentiment();

const SpeechToText = () => {

    const [sentimentScore, setSentimentScore] = useState(null);
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    useEffect(() => {
        setSentimentScore(sentiment.analyze(transcript));
    }, [transcript])

    if (!browserSupportsSpeechRecognition) {
        return <span>ERROR: Browser doesn't support speech recognition.</span>
    }

    const resetText = () => {
        resetTranscript()
        setSentimentScore(null)
    }

    return (
        <div>SpeechToText:
            <div>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <div className='speech-box'>{transcript}</div>
                <button className='speech-button' onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
                <button className='speech-button' onClick={SpeechRecognition.abortListening}>Stop</button>
                <button className='speech-button' onClick={resetText}>Reset Text</button>
                <p>Sentiment Score:     {sentimentScore !== null ? sentimentScore.score : ''}</p>
                <p>Comparitive Score:   {sentimentScore !== null ? sentimentScore.comparative : ''}</p>
                <p>Positive words:      {sentimentScore !== null ? JSON.stringify(sentimentScore.positive) : ''}</p>
                <p>Negative words:      {sentimentScore !== null ? JSON.stringify(sentimentScore.negative) : ''}</p>
            </div>
        </div>
    )
}

export default SpeechToText

// ! ------------- Sentiment Analysis (done on backend):

// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
// import { useState } from 'react'

// const SpeechToText = ({ socket }) => {

//     const [sentimentPolarity, setSentimentPolarity] = useState('')
//     const [sentimentSubjectivity, setSentimentSubjectivity] = useState('')
    
//     const {
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition
//     } = useSpeechRecognition()

//     if (!browserSupportsSpeechRecognition) {
//         return <span>ERROR: Browser doesn't support speech recognition.</span>
//     }

//     const calculateSentiment = () => {
//         socket.emit("text", transcript)       // SEND Text TO BACK END
//     }

//     const resetText = () => {
//         resetTranscript()
//         setSentimentPolarity('')
//         setSentimentSubjectivity('')
//     }

//     socket.on("text_data", (data) => {
//         setSentimentPolarity(data.sentiment_polarity)
//         setSentimentSubjectivity(data.sentiment_subjectivity)
//     });

//     return (
//         <div>SpeechToText:
//             <div>
//                 <p>Microphone: {listening ? 'on' : 'off'}</p>
//                 <div className='speech-box'>{transcript}</div>
//                 {/* Anonymous function */}
//                 <button className='speech-button' onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
//                 <button className='speech-button' onClick={SpeechRecognition.abortListening}>Stop</button>
//                 <button className='speech-button' onClick={resetText}>Reset Text</button>
//                 <button className='speech-button' onClick={calculateSentiment}>Calculate Sentiment</button>
//                 <p>Sentiment Polarity: {sentimentPolarity}</p>
//                 <p>Sentiment Subjectivity: {sentimentSubjectivity}</p>
//             </div>
//         </div>
//     )
// }

// export default SpeechToText