import React, { useState } from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./flashcards.css";

const flashcardData = [
  {
    category: "Science",
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    emoji: "🪐",
    color: "science-card",
  },
  {
    category: "Mathematics",
    question: "What is 8 × 7?",
    answer: "56",
    emoji: "🔢",
    color: "math-card",
  },
  {
    category: "English",
    question: "What is the opposite of 'Brave'?",
    answer: "Cowardly",
    emoji: "📖",
    color: "english-card",
  },
  {
    category: "Nature",
    question: "How many legs does a spider have?",
    answer: "8 legs",
    emoji: "🕷️",
    color: "nature-card",
  },
];

function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = flashcardData[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcardData.length);
    setFlipped(false);
  };

  const previousCard = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + flashcardData.length) % flashcardData.length
    );
    setFlipped(false);
  };

  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="flashcards-page">
        <header className="flashcards-header">
          <div>
            <p className="flashcards-eyebrow">LEARN SOMETHING NEW</p>
            <h1>My Flashcards 📚</h1>
            <p>Explore questions, discover answers, and grow your knowledge!</p>
          </div>
          <div className="flashcards-header-icon">💡</div>
        </header>

        <section className="flashcards-banner">
          <div>
            <span>✨ YOUR LEARNING CORNER</span>
            <h2>Little cards, big discoveries!</h2>
            <p>Tap a card to reveal its answer. Learning can be fun!</p>
          </div>
          <div className="flashcards-banner-emoji">🎓</div>
        </section>

        <section className="flashcards-content">
          <div className="flashcards-section-heading">
            <div>
              <h2>Practice Your Knowledge</h2>
              <p>Choose a card and test what you know.</p>
            </div>
            <span className="flashcards-counter">
              {currentIndex + 1} / {flashcardData.length}
            </span>
          </div>

          <div className="flashcard-container">
            <div
              className={`flashcard ${currentCard.color} ${
                flipped ? "is-flipped" : ""
              }`}
              onClick={() => setFlipped(!flipped)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped(!flipped);
                }
              }}
            >
              <span className="flashcard-category">
                {currentCard.category}
              </span>

              <div className="flashcard-emoji">{currentCard.emoji}</div>

              <span className="flashcard-label">
                {flipped ? "ANSWER" : "QUESTION"}
              </span>

              <h3>
                {flipped ? currentCard.answer : currentCard.question}
              </h3>

              <p className="flashcard-hint">
                {flipped
                  ? "Great job! Keep learning."
                  : "Tap this card to reveal the answer"}
              </p>
            </div>

            <div className="flashcard-controls">
              <button onClick={previousCard} className="flashcard-nav-button">
                ← Previous
              </button>

              <button
                onClick={() => setFlipped(!flipped)}
                className="flashcard-flip-button"
              >
                🔄 Flip Card
              </button>

              <button onClick={nextCard} className="flashcard-nav-button">
                Next →
              </button>
            </div>
          </div>
        </section>

        <footer className="flashcards-footer">
          <span>🌟</span>
          <p>Every question you explore makes you smarter!</p>
          <span>🌟</span>
        </footer>
      </main>
    </div>
  );
}

export default Flashcards;