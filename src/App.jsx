import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";
import Results from "./components/Results";
import Sidebar from "./components/Sidebar";
import quizData from "./data/quizData"; // Import the quizData


function App() {
  const [started, setStarted] = useState(() => JSON.parse(localStorage.getItem("started")) || false);
  const [currentQuestion, setCurrentQuestion] = useState(() => JSON.parse(localStorage.getItem("currentQuestion")) || 0);
  const [score, setScore] = useState(() => JSON.parse(localStorage.getItem("score")) || 0);
  const [showResults, setShowResults] = useState(() => JSON.parse(localStorage.getItem("showResults")) || false);
  const [timeLeft, setTimeLeft] = useState(() => JSON.parse(localStorage.getItem("timeLeft")) || 900); // 15 minutes in seconds
  const [quizQuestions, setQuizQuestions] = useState(() => JSON.parse(localStorage.getItem("quizQuestions")) || []);
  const [answered, setAnswered] = useState(() => JSON.parse(localStorage.getItem("answered")) || false);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    () => JSON.parse(localStorage.getItem("answeredQuestions")) || {}
  );
  const [correctAnswers, setCorrectAnswers] = useState(() => JSON.parse(localStorage.getItem("correctAnswers")) || 0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(() => JSON.parse(localStorage.getItem("incorrectAnswers")) || 0);
  const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || 0);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("started", JSON.stringify(started));
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("showResults", JSON.stringify(showResults));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));
    localStorage.setItem("answered", JSON.stringify(answered));
    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
    localStorage.setItem("incorrectAnswers", JSON.stringify(incorrectAnswers));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [started, currentQuestion, score, showResults, timeLeft, quizQuestions, answered, correctAnswers, incorrectAnswers, streak]);

  // Global timer for 15 minutes countdown
  useEffect(() => {
    if (started && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer); // Stop the timer when time is up
            setShowResults(true); // Show results when time is up
            return 0;
          }
          return prevTime - 1; // Decrease time every second
        });
      }, 1000);

      return () => clearInterval(timer); // Clean up timer on unmount or when quiz ends
    }
  }, [started, showResults]);

  const handleStart = () => {
    setQuizQuestions(quizData[0].questions); // Set quiz questions from quizData
    setStarted(true);
  };

  useEffect(() => {
    const storedAnsweredQuestions = JSON.parse(localStorage.getItem("answeredQuestions")) || {};
    const storedStarted = JSON.parse(localStorage.getItem("started"));
    const storedCurrentQuestion = JSON.parse(localStorage.getItem("currentQuestion")) || 0;

    if (storedStarted && quizQuestions.length > 0) {
      setStarted(storedStarted);

      // Determine the next unanswered question
      let nextUnansweredQuestion = storedCurrentQuestion;
      while (storedAnsweredQuestions[nextUnansweredQuestion] && nextUnansweredQuestion < quizQuestions.length) {
        nextUnansweredQuestion++;
      }

      setCurrentQuestion(nextUnansweredQuestion);

      // Check if all questions are answered
      if (nextUnansweredQuestion >= quizQuestions.length) {
        setShowResults(true);
      }

      setAnswered(false); // Ensure 'answered' resets on reload
    }
  }, [quizQuestions]); // Ensure quizQuestions are loaded before running this

  const handleAnswer = (answer, isTimeout = false) => {
    if (answered) return; // Prevent answering twice

    setAnswered(true); // Mark question as answered
    const currentQuizQuestion = quizQuestions[currentQuestion];

    let correct = false;
    if (answer !== null) {
      correct = currentQuizQuestion.options.find((option) => option.description === answer)?.is_correct || false;
    }

    // Handle correctness of answer or timeout
    if (correct) {
      setScore((prevScore) => prevScore + 4);
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      setStreak((prevStreak) => prevStreak + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      if (!isTimeout) {
        setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1); // Only increment if not timeout
      }
      setScore((prevScore) => prevScore - 1);
      setStreak(0); // Reset streak on incorrect answer or timeout
    }

    // Safely update localStorage for answered questions
    const answeredQuestions = JSON.parse(localStorage.getItem("answeredQuestions")) || {};
    if (currentQuestion !== undefined) {
      answeredQuestions[currentQuestion] = true; // Mark the current question as answered
      localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
    }

    // Wait for 3 seconds before moving to the next question or showing results
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1; // Increment by 1
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion); // Move to the next question
        setAnswered(false); // Allow the next question to be answered
      } else {
        setShowResults(true); // Show results after all questions are answered
      }
    }, 3000); // Delay for 3 seconds before moving forward
  };

  const handleRestart = () => {
    localStorage.clear();
    setStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(900); // Reset to 15 minutes
    setAnswered(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setStreak(0);
    setQuizQuestions([]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };



  return (
    // <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
    //   <div className="container mx-auto">
    //     {!started ? (
    //       <StartQuiz onStart={handleStart} />
    //     ) : (
    //       <div className="flex ">
    //         <Sidebar
    //           correctAnswers={correctAnswers}
    //           incorrectAnswers={incorrectAnswers}
    //           totalQuestions={quizQuestions.length}
    //           score={score}
    //           streak={streak}
    //         />
    //         <div className="flex-grow ml-64">
    //           <div className="text-center mb-4">
    //             <h3 className="text-xl font-semibold">Time Left: {formatTime(timeLeft)}</h3>
    //           </div>
    //           {showResults || currentQuestion >= quizQuestions.length ? ( // Check to show results
    //             <Results
    //               score={score}
    //               totalQuestions={quizQuestions.length}
    //               onRestart={handleRestart}
    //               correctAnswers={correctAnswers}
    //               incorrectAnswers={incorrectAnswers}
    //             />
    //           ) : (
    //             <Question
    //               questionText={quizQuestions[currentQuestion]?.description || ""} // Use description from quizData
    //               options={quizQuestions[currentQuestion]?.options.map((option) => option.description) || []} // Map options to descriptions
    //               onAnswer={handleAnswer}
    //               timeLeft={timeLeft}
    //               questionNumber={currentQuestion + 1}
    //               totalQuestions={quizQuestions.length}
    //               answered={answered}
    //               correctAnswer={quizQuestions[currentQuestion]?.options.find((option) => option.is_correct)?.description || ""} // Find correct answer
    //               explanation={quizQuestions[currentQuestion]?.detailed_solution || ""} // Use detailed_solution from quizData
    //             />
    //           )}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
    <div className="container mx-auto">
      {started ? (
         <div className="flex flex-col gap-8 lg:flex-row">
 
         {/* Main Content */}
         <div className="flex-grow">
           <div className="text-center mb-4">
             <h3 className="text-xl font-semibold">Time Left: {formatTime(timeLeft)}</h3>
           </div>
           {showResults || currentQuestion >= quizQuestions.length ? (
             <Results
               score={score}
               totalQuestions={quizQuestions.length}
               onRestart={handleRestart}
               correctAnswers={correctAnswers}
               incorrectAnswers={incorrectAnswers}
             />
           ) : (
             <Question
               questionText={quizQuestions[currentQuestion]?.description || ""}
               options={quizQuestions[currentQuestion]?.options.map((option) => option.description) || []}
               onAnswer={handleAnswer}
               timeLeft={timeLeft}
               questionNumber={currentQuestion + 1}
               totalQuestions={quizQuestions.length}
               answered={answered}
               correctAnswer={quizQuestions[currentQuestion]?.options.find((option) => option.is_correct)?.description || ""}
               explanation={quizQuestions[currentQuestion]?.detailed_solution || ""}
             />
           )}
         </div>

         {/* Sidebar */}
         <div className="w-full lg:w-64 mb-4 lg:mb-0 lg:mr-4">
           <Sidebar
             correctAnswers={correctAnswers}
             incorrectAnswers={incorrectAnswers}
             totalQuestions={quizQuestions.length}
             score={score}
             streak={streak}
           />
         </div>
       </div>
        
      ) : (
        <StartQuiz onStart={handleStart} />
      )}
    </div>
   
  </div>
  );
}

export default App;


