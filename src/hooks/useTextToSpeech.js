import { useEffect, useRef, useState } from "react";
import { base64ToBlob } from "../utils/util";

const useTextToSpeech = () => {
	const [audioUrl, setAudioUrl] = useState("");
	const audioRef = useRef(new Audio());
	const [isAudioEnded, setIsAudioEnded] = useState(false); // 再生終了を管理するステート

	useEffect(() => {
		const audio = audioRef.current;
		const handleEnded = () => {
			setIsAudioEnded(true);
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
	}, []);

	const handleTextToSpeech = async (text) => {
		setIsAudioEnded(false); // 再生開始時にリセット
		const apiKey = process.env.REACT_APP_API_KEY;
		try {
			const response = await fetch(
				`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						input: {
							text: text,
						},
						voice: {
							languageCode: "en-US",
							name: "en-US-Studio-O",
						},
						audioConfig: {
							audioEncoding: "MP3", // MP3に変更
							pitch: -20,
							speakingRate: 0.55,
						},
					}),
				},
			);

			if (!response.ok) {
				console.error('APIリクエストに失敗しました:', response.statusText);
				return;
			}

			const data = await response.json();

			if (data.audioContent) {
				const audioBlob = base64ToBlob(data.audioContent, "audio/mp3");
				const audioUrl = URL.createObjectURL(audioBlob);

				// 現在の音声の再生を停止
				audioRef.current.pause();
				audioRef.current.currentTime = 0;

				audioRef.current.src = audioUrl;
				audioRef.current.onended = () => setIsAudioEnded(true);
				await audioRef.current.play();
			} else {
				console.error('音声データが取得できませんでした:', data);
			}
		} catch (error) {
			console.error('エラーが発生しました:', error);
		}
	};

	return { audioUrl, handleTextToSpeech, isAudioEnded };
};

export default useTextToSpeech;
