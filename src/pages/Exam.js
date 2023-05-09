import { useState } from "react";
import style from "./Exam.module.css";
import { shuffleQuestion } from "../ShuffleQuestions";
let questionsData = JSON.parse(localStorage.getItem("question data"));
const shuffledQuestion = shuffleQuestion(questionsData);
const questions = shuffledQuestion.slice(0, 10);

export default function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [marks, setMarks] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleNextQuestion() {
    handleMarks();
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      window.alert("test completed");
      setShowResult(true);
    }
  }
  function handleClickedOption(index) {
    setClickedOption(index + 1);
  }
  function handleMarks() {
    if (clickedOption === questions[currentQuestion].Correct) {
      setMarks(marks + 2);
    }
  }
  return (
    <div className={style.testContainer}>
      <div className={style.questionContainer}>
        <span className={style.questionNumber}>{currentQuestion + 1}.</span>
        <span className={style.questionTxt}>
          {" "}
          {questions[currentQuestion].Question}
        </span>
      </div>
      <div>
        {questions[currentQuestion].Images &&
          questions[currentQuestion].Images.map((image, index) => (
            <img src={image} />
          ))}
      </div>
      <div className={style.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            className={style.option}
            key={index}
            onClick={() => handleClickedOption(index)}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestion === 9 ? (
        <button className={style.nextBtn} onClick={handleNextQuestion}>
          Submit
        </button>
      ) : (
        <button className={style.nextBtn} onClick={handleNextQuestion}>
          Next
        </button>
      )}
      {showResult && <h1>Your Score:- {marks}</h1>}
    </div>
  );
}
