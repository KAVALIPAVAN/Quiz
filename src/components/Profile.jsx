import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const Profile = ({ stats, onBack }) => {
  const chartData = stats.quizHistory.map((quiz, index) => ({
    name: `Quiz ${index + 1}`,
    score: quiz.score,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto overflow-y-auto max-h-[90vh]"
    >
      <h2 className="text-3xl font-bold text-center mb-2">User Profile</h2>
      <p className="text-center text-gray-600 mb-8">Your quiz performance and statistics</p>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Total Quizzes</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalQuizzes}</p>
            </div>
            <div>
              <p className="font-semibold">Average Score</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageScore.toFixed(2)}%</p>
            </div>
            <div>
              <p className="font-semibold">Highest Score</p>
              <p className="text-2xl font-bold text-purple-600">{stats.highestScore}</p>
            </div>
            <div>
              <p className="font-semibold">Total Points</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalPoints}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Accuracy by Difficulty</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats.accuracyByDifficulty).map(([difficulty, accuracy]) => (
              <div key={difficulty}>
                <p className="font-semibold capitalize">{difficulty}</p>
                <p className="text-2xl font-bold text-purple-600">{accuracy.toFixed(2)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Recent Quizzes</h3>
        <div className="space-y-4">
          {stats.quizHistory
            .slice(-5)
            .reverse()
            .map((quiz, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md">
                <p className="font-semibold">Quiz {stats.quizHistory.length - index}</p>
                <div className="grid grid-cols-2 gap-2">
                  <p>
                    Score: <span className="font-bold text-purple-600">{quiz.score}</span>
                  </p>
                  <p>
                    Difficulty: <span className="font-bold capitalize">{quiz.difficulty}</span>
                  </p>
                  <p>
                    Correct: <span className="font-bold text-green-600">{quiz.correctAnswers}</span>
                  </p>
                  <p>
                    Incorrect: <span className="font-bold text-red-600">{quiz.incorrectAnswers}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        onClick={onBack}
        className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 mt-8"
      >
        Back to Quiz
      </button>
    </motion.div>
  )
}

export default Profile

