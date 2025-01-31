

// import { useEffect } from "react"
// import { motion } from "framer-motion"
// import confetti from "canvas-confetti"

// const Results = ({ score, totalQuestions, onRestart, correctAnswers, incorrectAnswers }) => {
//   useEffect(() => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     })
//   }, [])

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mt-10"
//     >
//       <h2 className="text-3xl font-bold text-center mb-6">Quiz Results</h2>
//       <p className="text-center text-2xl mb-8">
//         You scored <span className="font-bold text-purple-600">{score}</span> points!
//       </p>
//       <div className="grid grid-cols-2 gap-6 mb-8">
//         <div>
//           <p className="font-semibold">Total Questions:</p>
//           <p className="text-2xl font-bold">{totalQuestions}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Correct Answers:</p>
//           <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Incorrect Answers:</p>
//           <p className="text-2xl font-bold text-red-600">{incorrectAnswers}</p>
//         </div>
//       </div>

//       <div className="text-2xl font-bold text-center mb-8">
//         {score >= totalQuestions * 3 ? "Excellent!" : score >= totalQuestions * 2 ? "Great Job!" : "Keep Practicing!"}
//       </div>
//       <div className="space-y-4">
//         <button
//           onClick={onRestart}
//           className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300"
//         >
//           Play Again
//         </button>
//       </div>
//     </motion.div>
//   )
// }

// export default Results





import { useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

const Results = ({ score, totalQuestions, onRestart, correctAnswers, incorrectAnswers }) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-2xl mx-auto mt-10"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Quiz Results</h2>
      <p className="text-center text-xl md:text-2xl mb-8">
        You scored <span className="font-bold text-purple-600">{score}</span> points!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="font-semibold">Total Questions:</p>
          <p className="text-xl md:text-2xl font-bold">{totalQuestions}</p>
        </div>
        <div>
          <p className="font-semibold">Correct Answers:</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">{correctAnswers}</p>
        </div>
        <div>
          <p className="font-semibold">Incorrect Answers:</p>
          <p className="text-xl md:text-2xl font-bold text-red-600">{incorrectAnswers}</p>
        </div>
      </div>

      <div className="text-xl md:text-2xl font-bold text-center mb-8">
        {score >= totalQuestions * 3 ? "Excellent!" : score >= totalQuestions * 2 ? "Great Job!" : "Keep Practicing!"}
      </div>
      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full bg-purple-600 text-white font-bold py-2 md:py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
};

export default Results

