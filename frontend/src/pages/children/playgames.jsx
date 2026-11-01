import React from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./playgames.css";

const games = [
  {
    id: 1,
    title: "Word Puzzle",
    description: "Solve words and discover new ones!",
    emoji: "🔤",
    color: "word-game",
    tag: "Brain Booster",
    route: "/child/games/word-puzzle",
  },
  {
    id: 2,
    title: "Math Magic",
    description: "Make numbers your superpower!",
    emoji: "🔢",
    color: "math-game",
    tag: "Number Fun",
    route: "/child/games/math-magic",
  },
  {
    id: 3,
    title: "Memory Match",
    description: "Find matching cards and train your memory.",
    emoji: "🧠",
    color: "memory-game",
    tag: "Memory Challenge",
    route: "/child/games/memory-match",
  },
  {
    id: 4,
    title: "Science Explorer",
    description: "Explore amazing science facts!",
    emoji: "🔬",
    color: "science-game",
    tag: "Explore & Learn",
    route: "/child/games/science-explorer",
  },
];

function PlayGames() {
  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="play-games-page">
        <header className="games-header">
          <div>
            <p className="games-eyebrow">LEARN • PLAY • GROW</p>
            <h1>Play Games <span>🎮</span></h1>
            <p>Ready for some fun? Pick a game and start your adventure!</p>
          </div>

          <div className="games-header-art">🕹️</div>
        </header>

        <section className="games-feature">
          <div>
            <span className="feature-label">✨ GAME TIME</span>
            <h2>Let the fun begin!</h2>
            <p>
              Play exciting games, sharpen your skills, and collect stars
              along the way.
            </p>
          </div>
          <div className="feature-emoji">🚀</div>
        </section>

        <section className="games-section">
          <div className="games-section-heading">
            <div>
              <h2>Choose Your Game</h2>
              <p>Which adventure will you try today?</p>
            </div>
            <span className="games-count">4 games</span>
          </div>

          <div className="games-grid">
            {games.map((game) => (
              <article className={`game-card ${game.color}`} key={game.id}>
                <div className="game-card-top">
                  <span className="game-tag">{game.tag}</span>
                  <span className="game-number">
                    {String(game.id).padStart(2, "0")}
                  </span>
                </div>

                <div className="game-emoji">{game.emoji}</div>

                <h3>{game.title}</h3>
                <p>{game.description}</p>

                <button
                  className="play-game-button"
                  onClick={() => alert(`${game.title} is coming soon!`)}
                >
                  Play Now <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <footer className="games-footer">
          <span>🌟</span>
          <p>Every game is a chance to learn something new!</p>
          <span>🌟</span>
        </footer>
      </main>
    </div>
  );
}

export default PlayGames;