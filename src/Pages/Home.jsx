import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  Film,
  Palette,
  Music,
} from "lucide-react";

import SectionTitle from "../Components/SectionTitle";

function Home() {
  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-container">

          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={16} />
              Creative Video Production Studio
            </motion.div>

            <h1>
              MAKE EVERY
              <span> FRAME </span>
              FEEL ALIVE.
            </h1>

            <p>
              We transform your raw footage into powerful,
              cinematic and engaging visual stories.
            </p>

            <div className="hero-buttons">

              <Link to="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={18} />
              </Link>

              <Link to="/gallery" className="btn-outline">
                <Play size={18} />
                View Our Work
              </Link>

            </div>

          </motion.div>


          {/* HERO VISUAL */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >

            <div className="video-card">

              <div className="video-screen">

                <div className="screen-content">

                  <Film size={60} />

                  <span>ANKIT</span>
                  <strong>VIDEO MIXING LAB</strong>

                </div>

                <div className="play-button">
                  <Play fill="currentColor" size={25} />
                </div>

              </div>

              <div className="timeline">

                <div className="timeline-track">
                  <div className="timeline-progress"></div>
                </div>

                <span>01:24</span>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stats-container">

          <div className="stat">
            <h3>15000+</h3>
            <p>Projects Completed</p>
          </div>

          <div className="stat">
            <h3>250+</h3>
            <p>Happy Clients</p>
          </div>

          <div className="stat">
            <h3>25+</h3>
            <p>Years Experience</p>
          </div>

          <div className="stat">
            <h3>24/7</h3>
            <p>Creative Support</p>
          </div>

        </div>

      </section>


      {/* ================= SERVICES PREVIEW ================= */}

      <section className="services-preview">

        <SectionTitle
          subtitle="WHAT WE DO"
          title="Creative Services"
          description="Everything you need to turn your footage into professional visual content."
        />


        <div className="service-cards">

          <motion.div
            className="service-card"
            whileHover={{ y: -10 }}
          >

            <div className="service-icon">
              <Film />
            </div>

            <h3>Video Editing</h3>

            <p>
              Professional editing with smooth cuts,
              transitions and storytelling.
            </p>

            <Link to="/services">
              Explore Service <ArrowRight size={16} />
            </Link>

          </motion.div>


          <motion.div
            className="service-card"
            whileHover={{ y: -10 }}
          >

            <div className="service-icon">
              <Palette />
            </div>

            <h3>Color Grading</h3>

            <p>
              Give your videos a cinematic look with
              professional color correction.
            </p>

            <Link to="/services">
              Explore Service <ArrowRight size={16} />
            </Link>

          </motion.div>


          <motion.div
            className="service-card"
            whileHover={{ y: -10 }}
          >

            <div className="service-icon">
              <Music />
            </div>

            <h3>Audio Mixing</h3>

            <p>
              Clean, balanced and powerful audio
              for professional video content.
            </p>

            <Link to="/services">
              Explore Service <ArrowRight size={16} />
            </Link>

          </motion.div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div className="cta-content">

          <span>HAVE A PROJECT IN MIND?</span>

          <h2>
            LET'S CREATE
            <br />
            SOMETHING AMAZING.
          </h2>

          <Link to="/contact" className="btn-primary">
            Let's Work Together
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;