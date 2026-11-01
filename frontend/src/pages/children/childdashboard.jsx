
import React from "react";
import { Link } from "react-router-dom";
import ChildSidebar from "../../components/ChildSidebar";
import "./childdashboard.css";

const activities = [
  {
    icon: "🧩",
    title: "Brain Puzzles",
    description: "Solve fun little puzzles!",
    color: "blue",
    link: "/child/games",
  },
  {
    icon: "🃏",
    title: "Magic Flashcards",
    description: "Learn something new today.",
    color: "purple",
    link: "/child/flashcards",
  },
  {
    icon: "🎨",
    title: "Creative Corner",
    description: "Explore and have fun!",
    color: "pink",
    link: "/child/goals",
  },
];

function ChildDashboard() {
  return (
    <div className="child-dashboard-layout">
      <ChildSidebar />

      <main className="child-dashboard-main">
        <header className="child-topbar">
          <div>
            <span className="child-date">YOUR HAPPY LEARNING SPACE ✨</span>
            <h1>Hello, Little Explorer! 👋</h1>
            <p>Ready for another wonderful day of learning?</p>
          </div>

          <div className="child-avatar">🧒</div>
        </header>

        <section className="child-hero">
          <div className="child-hero-content">
            <span className="child-hero-tag">🌟 TODAY IS YOUR DAY!</span>
            <h2>Dream big, learn little by little!</h2>
            <p>
              Every activity you try makes you stronger.
              Let's make today amazing!
            </p>
            <Link to="/child/goals" className="child-hero-button">
              Explore Today's Goals →
            </Link>
          </div>

          <div className="child-hero-art" aria-hidden="true">
            <span className="hero-sun">☀️</span>
            <span className="hero-rainbow">🌈</span>
            <span className="hero-star">⭐</span>
            <span className="hero-character">🐻</span>
            <span className="hero-cloud">☁️</span>
          </div>
        </section>

        <section className="child-stats">
          <div className="child-stat-card stars">
            <span>⭐</span>
            <div>
              <strong>120</strong>
              <p>My Stars</p>
            </div>
          </div>

          <div className="child-stat-card activities">
            <span>🎯</span>
            <div>
              <strong>3</strong>
              <p>Goals Today</p>
            </div>
          </div>

          <div className="child-stat-card badges">
            <span>🏅</span>
            <div>
              <strong>5</strong>
              <p>My Badges</p>
            </div>
          </div>
        </section>

        <section className="child-section">
          <div className="child-section-heading">
            <div>
              <span className="child-section-kicker">PICK YOUR FAVOURITE</span>
              <h2>Let's Play & Learn! 🎮</h2>
            </div>
            <Link to="/child/games">See all →</Link>
          </div>

          <div className="child-activity-grid">
            {activities.map((activity) => (
              <Link
                to={activity.link}
                className={`child-activity-card ${activity.color}`}
                key={activity.title}
              >
                <span className="activity-emoji">{activity.icon}</span>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <span className="activity-arrow">Let's go →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="child-bottom-grid">
          <div className="child-progress-card">
            <div className="child-section-heading">
              <div>
                <span className="child-section-kicker">YOU'RE DOING GREAT!</span>
                <h2>Today's Progress 🌱</h2>
              </div>
              <span className="progress-emoji">🌻</span>
            </div>

            <div className="child-progress-track">
              <div className="child-progress-fill"></div>
            </div>
            <p className="child-progress-caption">
              2 out of 3 goals completed. One more to go!
            </p>
          </div>

          <div className="child-reward-card">
            <span className="reward-big-emoji">🎁</span>
            <div>
              <span className="child-section-kicker">A LITTLE SURPRISE</span>
              <h2>Rewards are waiting!</h2>
              <p>Complete activities and collect lovely rewards.</p>
              <Link to="/child/rewards">View my rewards →</Link>
            </div>
          </div>
        </section>

        <footer className="child-dashboard-footer">
          Made with 💜 for little explorers · Cerevolt
        </footer>
      </main>
    </div>
  );
}

export default ChildDashboard;
