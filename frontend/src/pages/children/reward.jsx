
import React, { useState } from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./reward.css";

const rewards = [
  {
    id: 1,
    title: "Super Learner",
    description: "Complete your first learning activity.",
    icon: "🌟",
    points: 20,
    unlocked: true,
  },
  {
    id: 2,
    title: "Goal Getter",
    description: "Complete 5 daily goals.",
    icon: "🎯",
    points: 50,
    unlocked: true,
  },
  {
    id: 3,
    title: "Book Explorer",
    description: "Explore 3 learning topics.",
    icon: "📚",
    points: 30,
    unlocked: false,
  },
  {
    id: 4,
    title: "Math Champion",
    description: "Complete a maths assessment.",
    icon: "🧮",
    points: 40,
    unlocked: false,
  },
  {
    id: 5,
    title: "Brain Booster",
    description: "Play 5 learning games.",
    icon: "🧠",
    points: 50,
    unlocked: false,
  },
  {
    id: 6,
    title: "Learning Streak",
    description: "Learn for 7 days in a row.",
    icon: "🔥",
    points: 100,
    unlocked: false,
  },
];

function Reward() {
  const [activeFilter, setActiveFilter] = useState("All");

  const unlockedCount = rewards.filter((reward) => reward.unlocked).length;
  const totalPoints = rewards
    .filter((reward) => reward.unlocked)
    .reduce((total, reward) => total + reward.points, 0);

  const filteredRewards =
    activeFilter === "All"
      ? rewards
      : rewards.filter((reward) =>
          activeFilter === "Unlocked" ? reward.unlocked : !reward.unlocked
        );

  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="reward-page">
        <section className="reward-header">
          <div>
            <p className="reward-eyebrow">CELEBRATE YOUR PROGRESS</p>
            <h1>My Rewards 🏆</h1>
            <p>Every little effort deserves a celebration!</p>
          </div>
          <div className="reward-header-icon">🎁</div>
        </section>

        <section className="reward-summary">
          <div className="reward-summary-card points-card">
            <div className="reward-summary-icon">⭐</div>
            <div>
              <h2>{totalPoints}</h2>
              <p>Points Earned</p>
            </div>
          </div>

          <div className="reward-summary-card">
            <div className="reward-summary-icon">🏅</div>
            <div>
              <h2>{unlockedCount} / {rewards.length}</h2>
              <p>Badges Unlocked</p>
            </div>
          </div>

          <div className="reward-summary-card">
            <div className="reward-summary-icon">🌱</div>
            <div>
              <h2>Keep Growing!</h2>
              <p>Your next reward awaits</p>
            </div>
          </div>
        </section>

        <section className="reward-collection">
          <div className="reward-section-heading">
            <div>
              <h2>My Badge Collection</h2>
              <p>Unlock badges by completing learning activities.</p>
            </div>
          </div>

          <div className="reward-filters">
            {["All", "Unlocked", "Locked"].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="reward-grid">
            {filteredRewards.map((reward) => (
              <article
                key={reward.id}
                className={`reward-badge-card ${
                  reward.unlocked ? "unlocked" : "locked"
                }`}
              >
                <div className="reward-badge-icon">
                  <span>{reward.icon}</span>
                  {!reward.unlocked && <span className="reward-lock">🔒</span>}
                </div>

                <h3>{reward.title}</h3>
                <p>{reward.description}</p>

                <div className="reward-points">
                  ⭐ {reward.points} points
                </div>

                <span className={`reward-status ${reward.unlocked ? "earned" : ""}`}>
                  {reward.unlocked ? "Unlocked" : "Keep Going"}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="reward-encouragement">
          <span>🌈</span>
          <div>
            <h3>Every step makes you stronger!</h3>
            <p>Keep learning, keep trying, and watch your collection grow.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reward;
