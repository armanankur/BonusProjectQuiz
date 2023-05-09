import styled from "./Admin.module.css";
import { useState, useRef } from "react";
const Admin = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState({});
  const imageRef = useRef(null);

  function addImages(event) {
    const files = Array.from(event.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...images
    ]);
  }

  const handleUpload = () => {
    const error = {};
    if (!question) {
      error.question = "Enter a question";
    }
    if (!option1 || !option2 || !option3 || !option4) {
      error.options = "Enter all four options";
    }
    if (!selectAnswer) {
      error.selectedOption = "Choose a right answer";
    }
    setError(error);
    if (Object.keys(error).length === 0) {
      let questions = JSON.parse(localStorage.getItem("question data"));
      if (!questions) {
        questions = [];
      }
      questions.push({
        Question: question,
        options: [option1, option2, option3, option4],
        Correct: selectAnswer,
        Images: selectedImages
      });
      localStorage.setItem("question data", JSON.stringify(questions));
      console.log(questions);
      window.alert("question uploaded");
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setSelectAnswer("");
    }
  };
  return (
    <div className={styled.container}>
      <div className={styled.upload}>
        <h3>Add Questions</h3>
        <div className={styled.questions}>
          <textarea
            type="text"
            placeholder="Enter Questions Here.."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {error.question && <span>{error.question}</span>}
        </div>
        <div className={styled.options}>
          <input
            type="text"
            placeholder="Enter option 1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter option 2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter option 3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter option 4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
          {error.options && <span>{error.options}</span>}
        </div>
      </div>
      <button
        className={styled.addImage}
        onClick={() => imageRef.current.click()}
      >
        Add Images
      </button>
      <input
        type="file"
        ref={imageRef}
        hidden
        placeholder="Add Image"
        onChange={addImages}
      />
      <div className={styled.allImages}>
        {selectedImages.map((image) => (
          <img
            className={styled.image}
            key={image}
            src={image}
            alt="Selected"
          />
        ))}
      </div>

      <h3>Add Correct Option</h3>
      <select
        className={styled.selectCorrect}
        value={selectAnswer}
        onChange={(e) => setSelectAnswer(e.target.value)}
      >
        <option>Choose correct answer</option>
        <option>{option1}</option>
        <option>{option2}</option>
        <option>{option3}</option>
        <option>{option4}</option>
      </select>
      {error.selectedOption && <span>{error.selectedOption}</span>}
      <button className={styled.uploadBtn} onClick={handleUpload}>
        Upload question
      </button>
    </div>
  );
};
export default Admin;
