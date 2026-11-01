
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const features = [
    {
      icon: "✳",
      title: "Interactive Learning",
      description:
        "Engaging games, videos and activities that make learning enjoyable.",
    },
    {
      icon: "↗",
      title: "Progress Monitoring",
      description:
        "Track learning journeys through organized assessments and reports.",
    },
    {
      icon: "✚",
      title: "Professional Guidance",
      description:
        "Connect families, teachers and professionals through one platform.",
    },
    {
      icon: "⌘",
      title: "Personalized Experience",
      description:
        "A supportive experience designed around individual learning needs.",
    },
  ];

  const roles = [
    ["01", "Children", "Discover activities, games and interactive learning experiences.", "✳"],
    ["02", "Parents", "Stay informed and follow your child's learning journey.", "⌂"],
    ["03", "Doctors", "Access assessments and monitor individual progress.", "✚"],
    ["04", "Teachers", "Support learning with educational content and observations.", "▤"],
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <Link to="/" className="home-brand">
          <span className="home-brand-icon">C</span>
          Cerevolt
        </Link>

        <nav className="home-nav">
          <Link to="/" className="home-active-link">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="home-login">Login</Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-eyebrow">
              LEARNING · GROWTH · COLLABORATION
            </span>

            <h1>
              A brighter way
              <br />
              to <span>learn and grow.</span>
            </h1>

            <p>
              A connected neurocognitive platform bringing children,
              families and professionals together through learning,
              meaningful activities and progress monitoring.
            </p>

            <div className="home-hero-actions">
              <a href="#platform-features" className="home-primary-button">
                Discover Cerevolt <span>→</span>
              </a>
              <Link to="/about" className="home-secondary-button">
                Learn about us
              </Link>
            </div>

            <div className="home-trust-note">
              <span>●</span> One platform. Multiple possibilities.
            </div>
          </div>

          <div className="home-hero-art">
            <div className="home-art-circle circle-one"></div>
            <div className="home-art-circle circle-two"></div>

            <div className="home-art-card">
              <div className="home-art-logo">C</div>
              <span className="home-art-label">YOUR LEARNING JOURNEY</span>
              <h3>Every step counts.</h3>
              <p>Explore. Learn. Discover your potential.</p>

              <div className="home-art-activities">
                <div>
                  <span className="activity-icon activity-blue">✳</span>
                  <small>Learn</small>
                </div>
                <div>
                  <span className="activity-icon activity-green">↗</span>
                  <small>Progress</small>
                </div>
                <div>
                  <span className="activity-icon activity-purple">⌘</span>
                  <small>Connect</small>
                </div>
              </div>

              <div className="home-art-bottom">
                <span>Growing at your own pace</span>
                <span>✦</span>
              </div>
            </div>

            <div className="home-art-floating floating-top">
              <span>✦</span> Discover something new
            </div>

            <div className="home-art-floating floating-bottom">
              <span>✓</span> Every milestone matters
            </div>
          </div>
        </section>

        <section className="home-intro">
          <span className="home-eyebrow">WELCOME TO CEREVOLT</span>
          <h2>
            Bringing the right people
            <br />
            and tools together.
          </h2>
          <p>
            Learning and development are journeys that deserve understanding,
            encouragement and the right support. Cerevolt creates a shared
            space where children, parents, doctors and teachers can work
            together.
          </p>
        </section>

        <section className="home-features" id="platform-features">
          <div className="home-section-heading">
            <span className="home-eyebrow">EXPLORE THE PLATFORM</span>
            <h2>Everything connected in one place.</h2>
            <p>
              Useful tools and experiences designed to support learning
              and meaningful progress.
            </p>
          </div>

          <div className="home-feature-grid">
            {features.map((feature, index) => (
              <article className="home-feature-card" key={feature.title}>
                <div className="home-feature-top">
                  <span className="home-feature-icon">{feature.icon}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="home-feature-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-roles">
          <div className="home-section-heading">
            <span className="home-eyebrow">BUILT FOR COLLABORATION</span>
            <h2>Different roles. One shared purpose.</h2>
            <p>
              Cerevolt brings together the people who contribute to
              a child's learning and development.
            </p>
          </div>

          <div className="home-role-grid">
            {roles.map(([number, title, description, icon]) => (
              <article className="home-role-card" key={number}>
                <div className="home-role-top">
                  <span className="home-role-icon">{icon}</span>
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-journey">
          <div>
            <span className="home-eyebrow">THE CEREVOLT APPROACH</span>
            <h2>
              Progress is not a race.
              <br />
              Every step matters.
            </h2>
            <p>
              Through engaging experiences, organized insights and
              collaboration, Cerevolt aims to make every learning journey
              more connected and meaningful.
            </p>
            <Link to="/about" className="home-journey-link">
              Discover our approach →
            </Link>
          </div>

          <div className="home-journey-steps">
            <div><span>01</span><strong>Explore</strong><small>Discover learning opportunities</small></div>
            <div><span>02</span><strong>Engage</strong><small>Participate in meaningful activities</small></div>
            <div><span>03</span><strong>Grow</strong><small>Recognize progress over time</small></div>
          </div>
        </section>

        <section className="home-cta">
          <span className="home-eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>Let's make every step count.</h2>
          <p>
            Discover a connected approach to learning, development and support.
          </p>
          <Link to="/about" className="home-cta-button">
            Explore Cerevolt →
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <Link to="/" className="home-brand">
          <span className="home-brand-icon">C</span>
          Cerevolt
        </Link>
        <span>Learning · Growth · Collaboration</span>
        <span>© {new Date().getFullYear()} Cerevolt</span>
      </footer>
    </div>
  );
};

export default Home;
