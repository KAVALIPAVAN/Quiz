
import { motion } from "framer-motion"
import { Chart } from "react-google-charts";



const Sidebar = ({ correctAnswers, incorrectAnswers, totalQuestions, score, streak }) => {

  const dataChart = [
    ["status", "items"],
    ["correct", correctAnswers],
    ["incorrect", incorrectAnswers]
  ];
  // console.log(allPosts);
  const options = {
    pieHole: 1,
    is3D: false,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 9,
      },
    },
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-4 lg:p-6"
  >
    <div className="mb-4 lg:mb-8">
      <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">Quiz Progress</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${((correctAnswers + incorrectAnswers) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        Question {correctAnswers + incorrectAnswers} of {totalQuestions}
      </p>
    </div>
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Score</h3>
        <p className="text-2xl lg:text-3xl font-bold text-purple-600">{score}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Streak</h3>
        <p className="text-2xl lg:text-3xl font-bold text-green-600">{streak}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Correct</span>
        <span className="text-xl font-bold text-green-600">{correctAnswers}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Incorrect</span>
        <span className="text-xl font-bold text-red-600">{incorrectAnswers}</span>
      </div>

      <div className=" h-full w-full  overflow-hidden ">
                <Chart className='-mt-10 p-1'
                  chartType="PieChart"
                  data={dataChart}
                  options={options}
                />
              </div>
    </div>
  </motion.div>
  )
};

export default Sidebar


