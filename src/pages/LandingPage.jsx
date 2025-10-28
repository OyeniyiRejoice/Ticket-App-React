/*function LandingPage() {
  return <h1>Welcome to TicketApp</h1>;
}

export default LandingPage;*/

import Layout from "../components/Layout";
import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Layout>
    <main className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>TicketApp</span> 🎟️</h1>
          <p>
            Simplify ticket management — create, track, and resolve tickets with ease.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/signup" className="btn-outline">Get Started</Link>
          </div>
        </div>


        {/* Decorative Circle */}
        <div className="circle-deco"></div>

        {/* Wavy SVG Background */}
        <svg className="wave" viewBox="0 0 1440 320">
          <path fill="#0d1b2a" fillOpacity="1" 
            d="M0,224L40,208C80,192,160,160,240,144C320,128,400,128,480,154.7C560,181,640,235,720,240C800,245,880,203,960,170.7C1040,139,1120,117,1200,106.7C1280,96,1360,96,1400,96L1440,96L1440,320L0,320Z">
          </path>
        </svg>
      </section>
    </main>
</Layout>
  );
}
