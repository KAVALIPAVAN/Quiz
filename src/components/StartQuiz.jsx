// import { motion } from "framer-motion"

// const StartQuiz = ({ onStart }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mt-10"
//   >
//     <h1 className="text-3xl font-bold text-center mb-4 text-purple-600">Brain Blitz Quiz</h1>
//     <p className="text-center text-gray-600 mb-6">Challenge your knowledge and earn points!</p>
//     <p className="text-center mb-6">Topic: Genetics and Evolution</p>
//     <button
//       onClick={onStart}
//       className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mb-2"
//     >
//       Start Quiz
//     </button>
//   </motion.div>
// )

// export default StartQuiz

import { motion } from "framer-motion"

const StartQuiz = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-md mx-auto mt-10"
  >
    <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-purple-600">Brain Blitz Quiz</h1>
    <p className="text-center text-sm md:text-base text-gray-600 mb-6">Challenge your knowledge and earn points!</p>
    <p className="text-center mb-6">Topic: Genetics and Evolution</p>
    <button
      onClick={onStart}
      className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mb-2"
    >
      Start Quiz
    </button>
  </motion.div>
);

export default StartQuiz

