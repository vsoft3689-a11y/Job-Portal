import { Link } from "react-router-dom";
import "../App.css";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>
          Find. Connect. Grow with <span>JobHire</span>
        </h1>
        <p>
          Bridging the gap between educational institutions and passionate educators.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/jobs" className="btn-secondary">
            Explore Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose JobHire?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/university.png" alt="Institution" />
            <h3>For Institutions</h3>
            <p>Post job vacancies, manage applicants, and hire top talent efficiently.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/teacher.png" alt="Faculty" />
            <h3>For Faculty</h3>
            <p>Search and apply for jobs in top colleges and universities.</p>
          </div>
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/briefcase.png" alt="Career" />
            <h3>Career Growth</h3>
            <p>Enhance your career by finding opportunities that match your skills.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our platform and find your next great opportunity today.</p>
        <Link to="/register" className="btn-cta">
          Join Now →
        </Link>
      </section>
    </>
  );
};

export default LandingPage;
