
import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

const audiences = [
  {
    number: "01",
    title: "Children",
    description:
      "An engaging environment with interactive games, videos, flashcards and learning activities.",
  },
  {
    number: "02",
    title: "Parents",
    description:
      "A way to follow activities, stay informed about progress and remain connected with professionals.",
  },
  {
    number: "03",
    title: "Doctors",
    description:
      "Tools to conduct assessments, review observations and monitor individual progress.",
  },
  {
    number: "04",
    title: "Teachers",
    description:
      "Resources to support learning, add educational content and record meaningful observations.",
  },
];

const features = [
  {
    number: "01",
    title: "Learning Activities",
    description:
      "Interactive games, flashcards and educational videos that encourage participation.",
  },
  {
    number: "02",
    title: "Assessments",
    description:
      "Structured assessments that help professionals understand individual learning needs.",
  },
  {
    number: "03",
    title: "Progress Reports",
    description:
      "Organized progress information that helps parents and professionals follow development.",
  },
  {
    number: "04",
    title: "Communication",
    description:
      "A shared platform designed to bring families and professionals into one connected experience.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Access",
    description: "Users access the platform through their assigned roles.",
  },
  {
    number: "02",
    title: "Participate",
    description:
      "Children engage with activities while professionals use relevant platform tools.",
  },
  {
    number: "03",
    title: "Monitor",
    description:
      "Assessments and reports help organize and review progress information.",
  },
  {
    number: "04",
    title: "Collaborate",
    description:
      "Relevant users stay connected through a shared platform.",
  },
];

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <Link to="/" className="about-brand" aria-label="Cerevolt home">
          <span className="about-brand-icon">C</span>
          <span>Cerevolt</span>
        </Link>

        <nav className="about-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about" className="about-nav-active">
            About
          </Link>
          <Link to="/login" className="about-login">
            Login
          </Link>
        </nav>
      </header>

      <main>
        {/* Introduction */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow">GET TO KNOW US</span>

            <h1>
              Understanding progress.
              <br />
              <span>Supporting potential.</span>
            </h1>

            <p>
              Cerevolt is a multi-role neurocognitive platform that brings
              learning activities, assessments, progress monitoring and
              professional collaboration together in one place.
            </p>

            <div className="about-hero-actions">
              <a href="#our-mission" className="about-primary-button">
                Our mission →
              </a>
              <a href="#contact-us" className="about-text-button">
                Contact the team
              </a>
            </div>
          </div>

          <div className="about-hero-visual">
            <span className="about-eyebrow">THE CEREVOLT PLATFORM</span>

            <div className="about-visual-symbol" aria-hidden="true">
              C
            </div>

            <h3>One connected experience.</h3>

            <p>
              Learning resources, assessments and progress information
              brought together through a shared platform.
            </p>

            <div className="about-visual-tags">
              <span>Learn</span>
              <span>Assess</span>
              <span>Monitor</span>
              <span>Connect</span>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="about-purpose" id="our-mission">
          <div>
            <span className="about-eyebrow">OUR MISSION</span>

            <h2>
              Making learning and support
              <br />
              more connected.
            </h2>
          </div>

          <p>
            Learning and development involve more than one person. Children,
            parents, teachers and doctors each bring valuable perspectives.
            Cerevolt aims to bring these roles together through a shared
            digital platform, making learning resources and progress
            information easier to access and organize.
          </p>
        </section>

        {/* Platform features */}
        <section className="about-features">
          <div className="about-section-heading">
            <span className="about-eyebrow">WHAT CEREVOLT OFFERS</span>

            <h2>Tools for different parts of the journey.</h2>

            <p>
              Platform features designed to support participation,
              assessment, progress monitoring and collaboration.
            </p>
          </div>

          <div className="about-feature-list">
            {features.map((feature) => (
              <article className="about-feature-item" key={feature.number}>
                <span className="about-feature-icon">{feature.number}</span>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Intended users */}
        <section className="about-audience">
          <div className="about-section-heading centered">
            <span className="about-eyebrow">WHO IS IT FOR?</span>

            <h2>Different roles. Shared progress.</h2>

            <p>
              Each user has a dedicated role and experience within Cerevolt.
            </p>
          </div>

          <div className="about-audience-grid">
            {audiences.map((item) => (
              <article className="about-audience-card" key={item.number}>
                <div className="about-card-top">
                  <span className="about-audience-icon">{item.number}</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="about-process">
          <div className="about-section-heading">
            <span className="about-eyebrow">HOW IT WORKS</span>
            <h2>A connected platform experience.</h2>
          </div>

          <div className="about-process-grid">
            {processSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="about-contact" id="contact-us">
          <div className="about-contact-copy">
            <span className="about-eyebrow">GET IN TOUCH</span>

            <h2>Have a question about Cerevolt?</h2>

            <p>
              For platform enquiries, collaboration opportunities or general
              questions, further contact information will be provided here.
            </p>
          </div>

          <div className="about-contact-details">
            <div className="about-contact-item">
              <span className="about-contact-icon" aria-hidden="true">
                ✉
              </span>
              <div>
                <small>EMAIL</small>
                <strong>Official contact details coming soon</strong>
              </div>
            </div>

            <div className="about-contact-item">
              <span className="about-contact-icon" aria-hidden="true">
                ⌖
              </span>
              <div>
                <small>ENQUIRIES</small>
                <strong>Platform and collaboration enquiries</strong>
              </div>
            </div>

            <div className="about-contact-item">
              <span className="about-contact-icon" aria-hidden="true">
                ↗
              </span>
              <div>
                <small>PLATFORM</small>
                <strong>Cerevolt – Neurocognitive Platform</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Closing section */}
        <section className="about-cta">
          <span className="about-eyebrow">CEREVOLT</span>

          <h2>Every step deserves attention.</h2>

          <p>
            Explore the platform and discover a more connected approach
            to learning and development.
          </p>

          <Link to="/" className="about-primary-button">
            Back to Home →
          </Link>
        </section>
      </main>

      <footer className="about-footer">
        <Link to="/" className="about-brand" aria-label="Cerevolt home">
          <span className="about-brand-icon">C</span>
          <span>Cerevolt</span>
        </Link>

        <span>Learning · Growth · Collaboration</span>

        <span>© {new Date().getFullYear()} Cerevolt</span>
      </footer>
    </div>
  );
};

export default About;
