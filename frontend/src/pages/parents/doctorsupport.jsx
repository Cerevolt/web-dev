
import React from "react";
import ParentSidebar from "../../components/ParentSidebar";
import "./doctorsupport.css";

const supportServices = [
  {
    icon: "✚",
    title: "Consultation Support",
    description: "Explore options for connecting with a healthcare professional.",
    action: "Explore Support",
    color: "blue",
  },
  {
    icon: "▤",
    title: "Health Records",
    description: "Keep important consultation notes and records organised.",
    action: "View Records",
    color: "green",
  },
  {
    icon: "♡",
    title: "Parent Guidance",
    description: "Find general guidance for supporting your child's learning journey.",
    action: "View Guidance",
    color: "orange",
  },
];

function DoctorSupport() {
  return (
    <div className="parent-layout">
      <ParentSidebar />

      <main className="parent-main doctor-support-main">
        <header className="parent-topbar">
          <div>
            <p className="parent-breadcrumb">
              PARENT PORTAL / DOCTOR SUPPORT
            </p>
            <h1>Doctor Support</h1>
            <p className="parent-subtitle">
              Access support resources and manage consultation information.
            </p>
          </div>
        </header>

        <section className="doctor-support-banner">
          <div>
            <span>SUPPORT CENTRE</span>
            <h2>Your child's well-being matters.</h2>
            <p>
              Find support resources and keep consultation information
              organised in one place.
            </p>
          </div>
          <div className="doctor-banner-icon">✚</div>
        </section>

        <section className="doctor-support-section">
          <div className="doctor-section-heading">
            <h2>Support Services</h2>
            <p>Explore the available parent support options.</p>
          </div>

          <div className="doctor-service-grid">
            {supportServices.map((service) => (
              <article className="doctor-service-card" key={service.title}>
                <div className={`doctor-service-icon ${service.color}`}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  type="button"
                  className="doctor-service-button"
                  onClick={() =>
                    alert("This support feature will be available soon.")
                  }
                >
                  {service.action} <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-support-bottom">
          <article className="doctor-info-panel">
            <h3>Consultation Information</h3>
            <p>
              Consultation booking and professional support services can be
              connected here when the platform's backend is available.
            </p>
            <div className="doctor-info-note">
              <span>ⓘ</span>
              No consultation is booked through this demonstration page.
            </div>
          </article>

          <article className="doctor-emergency-panel">
            <div className="doctor-emergency-icon">!</div>
            <div>
              <h3>Need immediate medical help?</h3>
              <p>
                For an urgent medical concern, contact a qualified healthcare
                professional or your local emergency service.
              </p>
            </div>
          </article>
        </section>

        <footer className="parent-dashboard-footer">
          Cerevolt Parent Portal · Supporting every learning journey
        </footer>
      </main>
    </div>
  );
}

export default DoctorSupport;
