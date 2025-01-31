
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Question = ({
  questionText,
  options,
  onAnswer,
  questionNumber,
  totalQuestions,
  answered,
  correctAnswer,
  explanation,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setShowExplanation(false);
    setSelectedAnswer(null);
  }, [questionNumber]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setShowExplanation(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 max-w-2xl mx-auto mt-4 lg:mt-10"
    >
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
        Question {questionNumber} of {totalQuestions}
      </h2>
      <p className="text-base md:text-lg lg:text-xl mb-4 lg:mb-6">{questionText}</p>
      <div className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => setSelectedAnswer(option)}
              disabled={answered}
              className="hidden"
            />
            <label
              htmlFor={`option-${index}`}
              className={`flex-grow p-2 lg:p-3 rounded-md cursor-pointer transition-colors duration-300 ${
                answered && option === correctAnswer
                  ? "bg-green-100 text-green-800 border-2 border-green-500"
                  : answered && option === selectedAnswer
                    ? "bg-red-100 text-red-800 border-2 border-red-500"
                    : selectedAnswer === option
                      ? "bg-purple-100 text-purple-800 border-2 border-purple-500"
                      : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || answered}
        className={`w-full py-2 px-4 rounded-md font-bold text-white transition duration-300 ${
          !selectedAnswer || answered ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        Submit Answer
      </button>
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-50 rounded-md"
        >
          <p className="font-bold mb-2">Explanation:</p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
export default Question

