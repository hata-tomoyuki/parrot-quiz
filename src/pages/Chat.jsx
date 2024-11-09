import React, { useEffect, useRef, useState } from "react";
import micIconFilled from "../assets/images/icons/mic-filled.svg";
import micIcon from "../assets/images/icons/mic.svg";
import { conversationPrompt, emotionPrompt } from "../const/prompt";
import useTextToSpeech from "../hooks/useTextToSpeech";
import { postToAPI } from "../utils/util";

import parrot from "../assets/images/background/parrot.png";
import boredparrot from "../assets/images/parrot-images/standard/boredparrot.gif";
import bouncingparrot from "../assets/images/parrot-images/standard/bouncingparrot.gif";
import exceptionallyfastparrot from "../assets/images/parrot-images/standard/exceptionallyfastparrot.gif";
import sleepingparrot from "../assets/images/parrot-images/standard/sleepingparrot.gif";
import slowparrot from "../assets/images/parrot-images/standard/slowparrot.gif";

export const Chat = () => {
	const recognitionRef = useRef(null);
	const outputRef = useRef(null);
	const [isRecording, setIsRecording] = useState(false);
	const { handleTextToSpeech, isAudioEnded } = useTextToSpeech();
	const [image, setImage] = useState(sleepingparrot);
	const [buttonIsActive, setButtonIsActive] = useState(false);
	const [responseText, setResponseText] = useState("");
	const [isWakeUp, setIsWakeUp] = useState(false);
	const WALEUPTEXT = "おはよう。私を起こすなんて、どんだけ暇人なんだよ。";
	const longPressTimeoutRef = useRef(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.lang = "ja";
		recognition.continuous = true;
		recognition.onresult = ({ results }) => {
			if (outputRef.current) {
				const transcript = results[0][0].transcript;
				outputRef.current.textContent = transcript;
				fetchConversationResponse(transcript);
			}
		};
		recognitionRef.current = recognition;

		return () => {
			recognition.stop();
		};
	}, []);

	useEffect(() => {
		if (isAudioEnded) {
			setImage(parrot);
			setButtonIsActive(true);
		}
	}, [isAudioEnded]);

	/**
	 * 音声認識を開始し、UIを更新します。
	 */
	const startRecognition = () => {
		if (recognitionRef.current) {
			recognitionRef.current.start();
			setImage(boredparrot);
			setIsRecording(true);
			setMessage("");
		}
	};

	/**
	 * 長押しを開始します。
	 */
	const handleMouseDown = () => {
		longPressTimeoutRef.current = setTimeout(() => {
			startRecognition();
		}, 500); // 500ms以上押された場合に反応
	};

	/**
	 * 長押しを解除します。
	 */
	const handleMouseUp = () => {
		if (longPressTimeoutRef.current) {
			clearTimeout(longPressTimeoutRef.current);
			if (!isRecording) {
				setMessage("長押しするとレコーディング状態になります。");
			}
		}
		stopRecognition();
	};

	/**
	 * 音声認識を停止し、UIを更新します。
	 */
	const stopRecognition = () => {
		if (recognitionRef.current && isRecording) {
			recognitionRef.current.stop();
			setImage(parrot);
			setIsRecording(false);
			setButtonIsActive(false);
		}
	};

	/**
	 * テキストを解析し、感情スコアを計算します。
	 * @param {string} text - 解析するテキスト。
	 * @returns {Promise<Object>} - 感情スコアを含むオブジェクト。
	 */
	const scoring = async (text) => {
		const parts = text.split(" ");
		let happy = 0;
		let anger = 0;
		let sadness = 0;
		let joy = 0;

		for (let i = 0; i < parts.length; i += 2) {
			const keyword = parts[i];
			const value = Number.parseFloat(parts[i + 1]);

			if (keyword === "喜") {
				happy = value;
			} else if (keyword === "怒") {
				anger = value;
			} else if (keyword === "哀") {
				sadness = value;
			} else if (keyword === "楽") {
				joy = value;
			}
		}

		return { happy, anger, sadness, joy };
	};

	/**
	 * ユーザーの入力に基づいて会話のレスポンスを取得し、音声合成を行います。
	 * @param {string} text - ユーザーの入力テキスト。
	 */
	const fetchConversationResponse = async (text) => {
		const messages = [
			{
				role: "system",
				content: conversationPrompt,
			},
			{ role: "user", content: text },
		];

		const gptResponse = await postToAPI(messages);
		const responseText = gptResponse.data.choices[0].message.content;
		handleTextToSpeech(responseText);
		setResponseText(responseText.replace("Ha？", ""));
		fetchEmotionResponse(responseText);
	};

	/**
	 * 会話のレスポンスに基づいて感情のレスポンスを取得し、UIを更新します。
	 * @param {string} text - 会話のレスポンステキスト。
	 */
	const fetchEmotionResponse = async (text) => {
		const messages = [
			{
				role: "system",
				content: emotionPrompt,
			},
			{ role: "user", content: text },
		];

		const gptResponse = await postToAPI(messages);
		const responseText = gptResponse.data.choices[0].message.content;
		const score = await scoring(responseText);

		if (score.happy > 0) {
			setImage(exceptionallyfastparrot);
		} else {
			setImage(slowparrot);
		}
	};

	const parrotWakeUp = () => {
		setImage(parrot);
		setIsWakeUp(true);
		handleTextToSpeech(WALEUPTEXT);
		setTimeout(() => {
			setImage(slowparrot);
			setResponseText(WALEUPTEXT);
		}, 500);
	};

	return (
		<div>
			<h1 className="mt-12 font-bold text-3xl">オウムとおしゃべり</h1>
			<div className="mt-12 mb-32 w-fit mx-auto relative">
				<img src={image} alt="" className="mx-auto w-32 h-32" />
				<div className="w-80 absolute bottom-[-4rem] left-1/2 -translate-x-1/2 text-left font-bold text-green-900">
					{responseText}
				</div>
			</div>
			{isWakeUp ? (
				<>
					<button
						type="button"
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						className={`border-black border-2 rounded-full w-16 h-16 ${isRecording ? "bg-yellow-200" : "bg-white"} ${buttonIsActive ? "" : "opacity-50 cursor-not-allowed"}`}
						disabled={!buttonIsActive}
					>
						<img
							src={isRecording ? micIconFilled : micIcon}
							alt=""
							className="w-12 h-12 block mx-auto"
						/>
					</button>
					<div className="output mt-6" ref={outputRef} />
				</>
			) : (
				<button
					type="button"
					onClick={parrotWakeUp}
					className="border-black border-2 w-32 h-12 bg-white"
				>
					起こす
				</button>
			)}
			{message && <div className="text-red-500 mt-4">{message}</div>}
		</div>
	);
};
