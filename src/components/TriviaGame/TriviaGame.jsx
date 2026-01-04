import React, { useState, useEffect } from "react";
import "./TriviaGame.css";

function TriviaGame() {
  // ✅ Sample Apipheny-style trivia data
  const sampleTriviaQuestions = [
    {
      question: "Which planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
    },
    {
      question: "What is the largest mammal in the world?",
      correct_answer: "Blue Whale",
      incorrect_answers: ["Elephant", "Giraffe", "Hippopotamus"],
    },
    {
      question: "Who painted the Mona Lisa?",
      correct_answer: "Leonardo da Vinci",
      incorrect_answers: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Michelangelo",
      ],
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      correct_answer: "Carbon Dioxide",
      incorrect_answers: ["Oxygen", "Nitrogen", "Helium"],
    },
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"],
    },
  ];

  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");

  // ✅ Load first question when component mounts
  useEffect(() => {
    loadRandomQuestion();
  }, []);

  // ✅ Pick a random question (mini-game logic)
  function loadRandomQuestion() {
    const randomIndex = Math.floor(
      Math.random() * sampleTriviaQuestions.length
    );
    setQuestionData(sampleTriviaQuestions[randomIndex]);
    setSelectedAnswer(null);
    setFeedback("");
  }

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);

    if (answer === questionData.correct_answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong answer!");
    }
  }

  // ✅ Prevent crash before data exists
  if (!questionData) {
    return <p>Loading trivia...</p>;
  }

  const answers = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="trivia-container">
      <h1>Trivia Game</h1>

      <p>{questionData.question}</p>

      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(answer)}
          disabled={selectedAnswer !== null}
        >
          {answer}
        </button>
      ))}

      {feedback && <p className="feedback">{feedback}</p>}

      <button onClick={loadRandomQuestion} style={{ marginTop: "20px" }}>
        Next Question
      </button>
    </div>
  );
}

export default TriviaGame;
