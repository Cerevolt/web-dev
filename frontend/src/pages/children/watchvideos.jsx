
import React, { useState } from "react";
import ChildSidebar from "../../components/ChildSidebar";
import "./watchvideos.css";

const videos = [
  {
    id: 1,
    title: "The Solar System",
    subject: "Science",
    level: "Beginner",
    duration: "8 min",
    emoji: "🪐",
    description: "Explore the planets, stars and our amazing solar system.",
  },
  {
    id: 2,
    title: "Fun with Numbers",
    subject: "Maths",
    level: "Beginner",
    duration: "6 min",
    emoji: "🔢",
    description: "Learn basic number concepts through fun examples.",
  },
  {
    id: 3,
    title: "The Animal Kingdom",
    subject: "Science",
    level: "Beginner",
    duration: "10 min",
    emoji: "🦁",
    description: "Discover different animals and their habitats.",
  },
  {
    id: 4,
    title: "Learn English Grammar",
    subject: "English",
    level: "Intermediate",
    duration: "9 min",
    emoji: "📚",
    description: "Understand the basics of English grammar.",
  },
  {
    id: 5,
    title: "Amazing World Geography",
    subject: "Geography",
    level: "Intermediate",
    duration: "12 min",
    emoji: "🌍",
    description: "Discover continents, oceans and interesting places.",
  },
  {
    id: 6,
    title: "Introduction to Computers",
    subject: "Technology",
    level: "Beginner",
    duration: "7 min",
    emoji: "💻",
    description: "Learn about computers and how they work.",
  },
];

function WatchVideos() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const subjects = [
    "All",
    "Science",
    "Maths",
    "English",
    "Geography",
    "Technology",
  ];

  const filteredVideos =
    activeSubject === "All"
      ? videos
      : videos.filter((video) => video.subject === activeSubject);

  return (
    <div className="child-layout">
      <ChildSidebar />

      <main className="watch-page">
        <section className="watch-header">
          <div>
            <p className="watch-eyebrow">LEARN SOMETHING NEW</p>
            <h1>Watch & Learn 🎬</h1>
            <p>Explore fun videos and discover something amazing every day!</p>
          </div>
          <div className="watch-header-emoji">🎥</div>
        </section>

        <section className="watch-stats">
          <div className="watch-stat">
            <span>🎞️</span>
            <div>
              <h3>{videos.length}</h3>
              <p>Learning Videos</p>
            </div>
          </div>

          <div className="watch-stat">
            <span>📖</span>
            <div>
              <h3>{subjects.length - 1}</h3>
              <p>Subjects</p>
            </div>
          </div>

          <div className="watch-stat">
            <span>🌟</span>
            <div>
              <h3>Keep Going!</h3>
              <p>Every day is a new lesson</p>
            </div>
          </div>
        </section>

        <section className="watch-library">
          <div className="watch-section-heading">
            <div>
              <h2>Explore Videos</h2>
              <p>Choose a subject and start learning.</p>
            </div>
          </div>

          <div className="watch-filters">
            {subjects.map((subject) => (
              <button
                key={subject}
                className={activeSubject === subject ? "active" : ""}
                onClick={() => setActiveSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>

          <div className="watch-video-grid">
            {filteredVideos.map((video) => (
              <article className="watch-video-card" key={video.id}>
                <div className={`watch-video-thumbnail subject-${video.subject.toLowerCase()}`}>
                  <span>{video.emoji}</span>
                  <small>{video.duration}</small>
                </div>

                <div className="watch-video-info">
                  <div className="watch-video-meta">
                    <span>{video.subject}</span>
                    <span>{video.level}</span>
                  </div>

                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <button onClick={() => setSelectedVideo(video)}>
                    Watch Now <span>▶</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedVideo && (
          <div className="watch-modal-overlay" onClick={() => setSelectedVideo(null)}>
            <div
              className="watch-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="watch-modal-close"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>

              <div className="watch-modal-icon">{selectedVideo.emoji}</div>
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
              <div className="watch-coming-soon">
                🎬 Video content will be available soon!
              </div>
              <button
                className="watch-modal-done"
                onClick={() => setSelectedVideo(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default WatchVideos;
