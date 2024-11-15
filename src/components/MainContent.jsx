import React, { useEffect, useRef, useState } from "react";
import { QuizContent } from "./QuizContent";

import wrongGif from "../assets/images/background/60fpsparrot.gif";
import kokuban from "../assets/images/background/bunbougu_kokuban.png";
import timeUpGif from "../assets/images/background/darkmodeparrot.gif";
import parrot from "../assets/images/background/parrot.png";
import teacher from "../assets/images/background/teacher.png";
import correctGif from "../assets/images/background/ultrafastparrot.gif";
import useQuizSounds from "../hooks/useQuizSounds";
import useRank from "../hooks/useRank";
import useTextToSpeech from "../hooks/useTextToSpeech";

export const MainContent = ({
	setImage,
	setParrotsMessage1,
	setParrotsMessage2,
	setParrotsMessage3,
	setParrotsMessage4,
	generateQuizData,
	openingMessage = "今日は様々なParty Parrotについて学びましょう。",
	introSoundPlay,
	introSoundInterval = 5000,
}) => {
	const [quizData, setQuizData] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [correctCount, setCorrectCount] = useState(0);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [isHidden, setIsHidden] = useState(true);
	const [rankIsHidden, setRankIsHidden] = useState(true);
	const [questionText, setQuestionText] = useState("");
	const [rank, setRank] = useState("");
	const [timer, setTimer] = useState(5);
	const intervalIdRef = useRef(null);
	const audioRef = useRef(new Audio());

	const { handleTextToSpeech, isAudioEnded } = useTextToSpeech();
	const {
		correctSoundPlay,
		wrongSoundPlay,
		ahSoundPlay,
		yeahSoundPlay,
		firstSoundPlay,
		nextSoundPlay,
		okSoundPlay,
		finishSoundPlay,
		timeUpSoundPlay,
		haSoundPlay,
	} = useQuizSounds();

	const { getRank } = useRank();

	/**
	 * タイマーのカウントダウンを開始する関数
	 */
	const countDown = () => {
		intervalIdRef.current = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer === 1) {
					handleTimeUp();
					clearInterval(intervalIdRef.current);
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);
	};

	useEffect(() => {
		setQuizData(generateQuizData());
	}, []);

	const currentQuestion = quizData[currentQuestionIndex];

	useEffect(() => {
		if (isAudioEnded && currentQuestionIndex < quizData.length) {
			setIsHidden(false); // オーディオ再生終了後にクイズを表示
		}
	}, [isAudioEnded, currentQuestionIndex, quizData.length]);

	useEffect(() => {
		if (!isHidden && !gameFinished) {
			countDown();
		}
	}, [isHidden, gameFinished]);

	/**
	 * クイズを終了する関数
	 * @param {string} message - 終了メッセージ
	 * @param {string} image - 終了時に表示する画像
	 * @param {function} sound - 終了時に再生する音声
	 * @param {object} rank - 終了時のランク
	 */
	const endQuiz = (message, image, sound, rank) => {
		setFeedbackMessage(message);
		setImage(image);
		sound();
		setGameFinished(true);

		setTimeout(() => {
			handleTextToSpeech(`あなたは ${rank.system} です`);
		}, 6000);

		setTimeout(() => {
			setRankIsHidden(false);
		}, 6500);
	};

	/**
	 * 選択肢がクリックされたときのハンドラー
	 * @param {string} option - 選択されたオプション
	 */
	const handleOptionClick = (option) => {
		audioRef.current.pause();
		setSelectedOption(option);
		const isCorrect = option.name === currentQuestion.answer;
		setFeedbackMessage(isCorrect ? "正解です。" : "違います。");
		setButtonDisabled(true);
		clearInterval(intervalIdRef.current); // タイマーを止める
		if (isCorrect) {
			setCorrectCount((prevCount) => prevCount + 1);
			correctSoundPlay();
			setTimeout(() => {
				setImage(correctGif);
				yeahSoundPlay();
			}, 1500);

			setTimeout(() => {
				setSelectedOption(null);
				setFeedbackMessage("");
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
				setImage(parrot);
				setButtonDisabled(false);
				if (currentQuestionIndex < quizData.length - 1) {
					nextSoundPlay();
					setIsHidden(true);
					setTimer(5);
					setQuestionText(quizData[currentQuestionIndex + 1].question);
					handleTextToSpeech(quizData[currentQuestionIndex + 1].question);
				} else {
					const rank = getRank(correctCount, quizData.length);
					setRank(rank);
					endQuiz(
						"クイズ終了です。正解数はこちらです。",
						parrot,
						finishSoundPlay,
						rank,
					);
				}
			}, 3500);
		} else {
			wrongSoundPlay();
			setTimeout(() => {
				setImage(wrongGif);
				ahSoundPlay();
			}, 1500);

			const rank = getRank(correctCount, quizData.length);
			setRank(rank);

			setTimeout(() => {
				endQuiz(
					"クイズ終了です。正解数はこちらです。",
					parrot,
					finishSoundPlay,
					rank,
				);
			}, 4000);
		}
	};

	/**
	 * スタートボタンがクリックされたときのハンドラー
	 */
	const handleStartButtonClick = () => {
		setGameStarted(true);
		setFeedbackMessage(openingMessage);
		introSoundPlay();
		setTimeout(() => {
			okSoundPlay();

			setFeedbackMessage("");

			setTimeout(() => {
				setParrotsMessage1("OK");
			}, 0);

			setTimeout(() => {
				setParrotsMessage2("OK");
			}, 350);

			setTimeout(() => {
				setParrotsMessage3("OK");
			}, 700);

			setTimeout(() => {
				setParrotsMessage4("OK");
			}, 1050);
		}, introSoundInterval);
		setTimeout(() => {
			firstSoundPlay();
			setParrotsMessage1("");
			setParrotsMessage2("");
			setParrotsMessage3("");
			setParrotsMessage4("");
		}, introSoundInterval + 1500);
		setTimeout(() => {
			setQuestionText(currentQuestion.question);
			handleTextToSpeech(currentQuestion.question);
		}, introSoundInterval + 2500);
	};

	/**
	 * 時間切れ時のハンドラー
	 */
	const handleTimeUp = () => {
		const rank = getRank(correctCount, quizData.length);
		setRank(rank);
		setFeedbackMessage("時間切れです。");
		timeUpSoundPlay();
		setButtonDisabled(true);

		setTimeout(() => {
			setImage(timeUpGif);
			haSoundPlay();
			setSelectedOption(null);
		}, 1000);

		setTimeout(() => {
			endQuiz(
				"クイズ終了です。正解数はこちらです。",
				parrot,
				finishSoundPlay,
				rank,
			);
		}, 3000);
	};

	if (!currentQuestion) {
		return <div>クイズデータが読み込まれていません。</div>;
	}

	return (
		<div className="relative mt-12">
			<img src={kokuban} alt="Parrot" />
			<button
				className={`absolute top-16 md:top-40 left-1/2 transform -translate-x-1/2  w-[90%] text-white text-4xl md:text-6xl font-bold ${gameStarted ? "hidden" : ""}`}
				onClick={handleStartButtonClick}
			>
				START
			</button>
			<div className="absolute top-8 md:top-10 left-1/2 transform -translate-x-1/2 w-[90%]">
				{gameFinished ? (
					<div className="text-white text-3xl md:text-6xl font-bold leading-10 md:leading-relaxed mt-[-5%]">
						正解数: {correctCount}
						<br />
						<p className={rankIsHidden ? "hidden" : ""}>
							あなたは
							<br />
							<strong className="font-bold text-yellow-300">
								{rank.display}
							</strong>
							です
						</p>
					</div>
				) : (
					<QuizContent
						currentQuestion={currentQuestion}
						selectedOption={selectedOption}
						handleOptionClick={handleOptionClick}
						buttonDisabled={buttonDisabled}
						isHidden={isHidden}
						questionText={questionText}
						timer={timer}
					/>
				)}
			</div>
			<div className="absolute md:bottom-0 right-4 md:right-[-30%] transform">
				<img src={teacher} alt="Teacher" className="w-24 md:w-52 mb-8" />
				{feedbackMessage && (
					<div className="feedback absolute top-8 md:top-auto md:bottom-[-20%] left-[-8rem] md:left-1/2 transform -translate-x-1/2 font-bold text-lg md:text-3xl w-56 md:w-96 text-right md:text-center">
						{feedbackMessage}
					</div>
				)}
			</div>
		</div>
	);
};
