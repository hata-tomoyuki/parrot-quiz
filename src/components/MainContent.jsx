import React, { useEffect, useRef, useState } from 'react'
import { QuizContent } from './QuizContent'
import { generateQuizData, ranks } from '../const/data'

import useSound from 'use-sound';
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';
import ahSound from '../assets/sounds/ah.mp3';
import yeahSound from '../assets/sounds/yeah.mp3';
import firstSound from '../assets/sounds/first.mp3';
import nextSound from '../assets/sounds/next.mp3';
import introSound from '../assets/sounds/intro.mp3'
import okSound from '../assets/sounds/ok.mp3'
import finishSound from '../assets/sounds/finish.mp3'

import wrongGif from '../assets/images/background/60fpsparrot.gif';
import correctGif from '../assets/images/background/ultrafastparrot.gif';
import kokuban from '../assets/images/background/bunbougu_kokuban.png'
import teacher from '../assets/images/background/teacher.png'
import parrot from '../assets/images/background/parrot.png';
import { extractTextFromUrl } from '../utils/util';
import useTextToSpeech from '../hooks/useTextToSpeech';

export const MainContent = ({ setImage, setParrotsMessage1, setParrotsMessage2, setParrotsMessage3, setParrotsMessage4 }) => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);

    const [correctSoundPlay] = useSound(correctSound);
    const [wrongSoundPlay] = useSound(wrongSound);
    const [ahSoundPlay] = useSound(ahSound);
    const [yeahSoundPlay] = useSound(yeahSound);
    const [firstSoundPlay] = useSound(firstSound);
    const [nextSoundPlay] = useSound(nextSound);
    const [introSoundPlay] = useSound(introSound);
    const [okSoundPlay] = useSound(okSound);
    const [finishSoundPlay] = useSound(finishSound);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isHidden, setIsHidden] = useState(true)
    const [rankIsHidden, setRankIsHidden] = useState(true)

    const [audioUrl, setAudioUrl] = useState('');

    const audioRef = useRef(new Audio());
    const { handleTextToSpeech } = useTextToSpeech();


    useEffect(() => {
        setQuizData(generateQuizData());
    }, []);

    const currentQuestion = quizData[currentQuestionIndex];

    /**
     * クイズが終了したときのハンドラー
     */
    useEffect(() => {
        if (currentQuestionIndex >= 10) {
            setFeedbackMessage("クイズ終了です。正解数はこちらです。");
            finishSoundPlay();
            setGameFinished(true);
            setTimeout(() => {
                setRankIsHidden(false)
            }, 3000)
            setTimeout(() => {
                handleTextToSpeech(`あなたの称号は、、、${ranks[correctCount]}です。`);
            }, 6500);
        }
    }, [currentQuestionIndex, finishSoundPlay]);

    /**
     * 選択肢がクリックされたときのハンドラー
     * @param {string} option - 選択されたオプション
     */
    const handleOptionClick = (option) => {
        audioRef.current.pause();
        setSelectedOption(option);
        const isCorrect = extractTextFromUrl(option) === currentQuestion.answer;
        setFeedbackMessage(isCorrect ? "正解です。" : "違います。");
        setButtonDisabled(true);
        if (isCorrect) {
            setCorrectCount(prevCount => prevCount + 1);
            correctSoundPlay();
            setTimeout(() => {
                setImage(correctGif);
                yeahSoundPlay();
            }, 1500);
        } else {
            wrongSoundPlay();
            setTimeout(() => {
                setImage(wrongGif);
                ahSoundPlay();
            }, 1500);
        }
        setTimeout(() => {
            if (currentQuestionIndex < 9) {
                handleTextToSpeech(quizData[currentQuestionIndex + 1].question);
            }
        }, 3200);
        setTimeout(() => {
            setSelectedOption(null);
            setFeedbackMessage("");
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setImage(parrot);
            setButtonDisabled(false);
            if (currentQuestionIndex < 9) {
                nextSoundPlay();
            }
        }, 3500);
    };

    /**
     * スタートボタンがクリックされたときのハンドラー
     */
    const handleStartButtonClick = () => {
        setGameStarted(true);
        setFeedbackMessage("今日は様々な Party Parrot について学びましょう。");
        introSoundPlay();
        setTimeout(() => {
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    okSoundPlay();
                }, i * 350);
            }
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

        }, 5000);
        setTimeout(() => {
            handleTextToSpeech(currentQuestion.question);
        }, 6500);
        setTimeout(() => {
            setIsHidden(false);
            firstSoundPlay();
            setParrotsMessage1("");
            setParrotsMessage2("");
            setParrotsMessage3("");
            setParrotsMessage4("");
            setAudioUrl("")
        }, 7000);
    }

    if (!currentQuestion) {
        return <div>クイズデータが読み込まれていません。</div>;
    }

    return (
        <div className="relative ">
            <img src={kokuban} alt="Parrot" />
            <button className={`absolute top-40 left-1/2 transform -translate-x-1/2  w-[90%] text-white text-6xl font-bold ${gameStarted ? "hidden" : ""}`} onClick={handleStartButtonClick}>START</button>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[90%]">
                {gameFinished ? (
                    <div className="text-white text-6xl font-bold leading-relaxed mt-[-5%]">正解数: {correctCount} / 10<br /><p className={rankIsHidden ? "hidden" : ""}>あなたの称号は<br /><strong className='font-bold text-yellow-300'>{ranks[correctCount]}</strong></p></div>
                ) : (
                    <QuizContent
                        currentQuestion={currentQuestion}
                        selectedOption={selectedOption}
                        handleOptionClick={handleOptionClick}
                        buttonDisabled={buttonDisabled}
                        isHidden={isHidden}
                    />
                )}
            </div>
            <div className="absolute bottom-0 right-[-30%] transform">
                <img src={teacher} alt="Teacher" className="w-52 mb-8" />
                {feedbackMessage && <div className="feedback absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 font-bold text-3xl w-96 text-center">{feedbackMessage}</div>}
            </div>
        </div>
    );
}
