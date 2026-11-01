
import React, { useState } from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./dailygoals.css";

const initialGoals = [
  { id: 1, icon: "🧩", title: "Brain Puzzle", description: "Give your brain a fun workout!", stars: 10, color: "blue", link: "/child/games" },
  { id: 2, icon: "🃏", title: "Magic Flashcards", description: "Learn something new today.", stars: 10, color: "purple", link: "/child/flashcards" },
  { id: 3, icon: "🎬", title: "Learning Video", description: "Explore and discover!", stars: 10, color: "peach", link: "/child/videos" },
  { id: 4, icon: "🎨", title: "Creative Corner", description: "Let your imagination shine.", stars: 10, color: "green", link: "/child/goals" },
];

function DailyGoals() {
  const [goals, setGoals] = useState(initialGoals);
  const completed = goals.filter((goal) => goal.done).length;
  const stars = goals.filter((goal) => goal.done).reduce((sum, goal) => sum + goal.stars, 0);
  const progress = Math.round((completed / goals.length) * 100);

  const toggleGoal = (id) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal
      )
    );
  };

  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="daily-goals-page">
        <header className="daily-goals-header">
          <div>
            <p className="daily-eyebrow">YOUR LITTLE ADVENTURE 🌈</p>
            <h1>My Daily Goals 🎯</h1>
            <p>Small steps make big things happen!</p>
          </div>
          <div className="daily-header-icon">⭐</div>
        </header>

        <section className="goals-welcome">
          <div>
            <h2>You've got this, superstar! 🌟</h2>
            <p>Complete activities and collect stars along the way.</p>
          </div>
          <span className="goals-welcome-icon">🐻</span>
        </section>

        <section className="goal-stats-grid">
          <div className="goal-stat-tile stat-mint">
            <span>🌟</span>
            <div><strong>{stars}</strong><p>Stars earned</p></div>
          </div>
          <div className="goal-stat-tile stat-lavender">
            <span>🎯</span>
            <div><strong>{completed}/{goals.length}</strong><p>Goals done</p></div>
          </div>
          <div className="goal-stat-tile stat-yellow">
            <span>🚀</span>
            <div><strong>{goals.length - completed}</strong><p>Still to go</p></div>
          </div>
        </section>

        <section className="goal-progress-card">
          <div className="goal-progress-heading">
            <div>
              <h2>Today's progress</h2>
              <p>Look how far you've come!</p>
            </div>
            <strong>{progress}%</strong>
          </div>
          <div className="goal-progress-track">
            <div className="goal-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="goal-progress-message">
            {completed === goals.length
              ? "Amazing! You completed every goal today! 🎉"
              : "Keep going, you're doing great! 💪"}
          </p>
        </section>

        <section className="daily-activities">
          <div className="daily-section-heading">
            <h2>Today's activities ✨</h2>
            <span>{goals.length - completed} left to go</span>
          </div>

          <div className="daily-goal-grid">
            {goals.map((goal) => (
              <article
                className={`daily-goal-tile tile-${goal.color} ${goal.done ? "goal-done" : ""}`}
                key={goal.id}
              >
                <div className="goal-tile-top">
                  <div className="daily-goal-icon">{goal.icon}</div>
                  <span className="daily-goal-stars">⭐ {goal.stars}</span>
                </div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
                <button
                  className={`goal-check-button ${goal.done ? "checked" : ""}`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  {goal.done ? "✓ Completed!" : "Mark as done"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="daily-motivation">
          <span>🌻</span>
          <div>
            <h3>Every little step counts!</h3>
            <p>Do your best and enjoy the journey. You're doing great!</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DailyGoals;
