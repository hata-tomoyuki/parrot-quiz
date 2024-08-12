export const QuizContent = ({ currentQuestion, selectedOption, handleOptionClick, buttonDisabled, isHidden, questionText, timer }) => {
    if (!currentQuestion) {
        return <div>クイズデータが読み込まれていません。</div>;
    }

    return (
        <div className="quiz text-center">
            <span className={`text-white text-3xl font-bold mb-4 ${isHidden ? "hidden" : ""}`}>{timer}</span>
            <h2 className="text-3xl font-bold mb-4 text-white">{questionText}</h2>
            <div className={`options ${isHidden ? "hidden" : ""}`}>
                {currentQuestion.options.map((option, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                            className={`w-36 h-36 bg-gray-200 mx-2 border-2 border-gray-400 rounded-md hover:bg-red-300 ${option === selectedOption ? "selected" : ""} ${buttonDisabled ? "disabled" : ""}`}

                        >
                            <img src={option.default} alt="Option" className="w-full h-full block object-cover" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
