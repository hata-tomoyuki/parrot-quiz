import { useState, useRef, useEffect } from 'react';
import { base64ToBlob } from '../utils/util';


const useTextToSpeech = () => {
    const [audioUrl, setAudioUrl] = useState('');
    const audioRef = useRef(new Audio());
    const [isAudioEnded, setIsAudioEnded] = useState(false); // 再生終了を管理するステート

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsAudioEnded(true);
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const handleTextToSpeech = async (text) => {
        setIsAudioEnded(false); // 再生開始時にリセット
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: {
                    text: text,
                },
                voice: {
                    languageCode: "en-US",
                    name: "en-US-Studio-O"
                },
                audioConfig: {
                    audioEncoding: "MP3", // MP3に変更
                    pitch: -20,
                    speakingRate: 0.55
                },
            }),
        });

        const data = await response.json();

        if (data.audioContent) {
            const audioBlob = base64ToBlob(data.audioContent, 'audio/mp3');
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            audioRef.current.src = audioUrl;
            audioRef.current.play();
        }
    };

    return { audioUrl, handleTextToSpeech, isAudioEnded };
};

export default useTextToSpeech;
