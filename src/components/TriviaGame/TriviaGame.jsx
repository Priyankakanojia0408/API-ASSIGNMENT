import React, { useState, useEffect } from "react";
import "./TriviaGame.css";

function TriviaGame() {
  const [questionData, setQuestionData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrivia();
  }, []);

  async function fetchTrivia() {
    setLoading(true);
    setError("");
    setFeedback("");
    setSelectedAnswer(null);
    setQuestionData(null);

    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&type=multiple"
      );

      if (!response.ok) {
        throw new Error("API limit reached");
      }

      const data = await response.json();

      const question = data.results[0];
      setQuestionData(question);

      const shuffledAnswers = [
        question.correct_answer,
        ...question.incorrect_answers,
      ].sort(() => Math.random() - 0.5);

      setAnswers(shuffledAnswers);
    } catch (err) {
      setError(
        "Failed to fetch trivia question. Please wait a moment and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);

    if (answer === questionData.correct_answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong answer!");
    }
  }

  return (
    <div className="trivia-container">
      <h1>Trivia Game</h1>

      {loading && <p>Loading question...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && questionData && (
        <>
          <p
            dangerouslySetInnerHTML={{ __html: questionData.question }}
          />

          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer !== null}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}

          {feedback && <p className="feedback">{feedback}</p>}

          <button
            onClick={fetchTrivia}
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default TriviaGame;
