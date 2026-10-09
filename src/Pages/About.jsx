import { motion } from "framer-motion";
import {
  Film,
  Palette,
  WandSparkles,
  Headphones,
  CheckCircle,
} from "lucide-react";

import SectionTitle from "../Components/SectionTitle";

function About() {
  const skills = [
    "Professional Video Editing",
    "Cinematic Color Grading",
    "Motion Graphics",
    "Audio Mixing",
    "YouTube Video Editing",
    "Social Media Content",
  ];

  return (
    <div className="about-page">

      {/* ================= ABOUT HERO ================= */}

      <section className="page-hero">
        <div className="page-hero-content">

          <span>ABOUT OUR STUDIO</span>

          <h1>
            WE TURN
            <strong> IDEAS </strong>
            INTO STORIES.
          </h1>

          <p>
            Ankit Video Mixing Lab is a Professional Photography, Video Editing, Live Telecast, 
            YouTube Live, creative video production
            studio focused on editing, color, motion and sound.
          </p>

        </div>
      </section>


      {/* ================= ABOUT STORY ================= */}

      <section className="about-story">

        <div className="about-image">

          <div className="studio-card">

            <Film size={70} />

            <h3>ANKIT</h3>
            <span>VIDEO MIXING LAB</span>

          </div>

        </div>


        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="section-subtitle">
            OUR STORY
          </span>

          <h2>
            Every video deserves
            <span> a unique identity.</span>
          </h2>

          <p>
            We believe video editing is more than just cutting
            clips together. It is about creating emotion,
            maintaining rhythm and telling a story that people
            remember.
          </p>

          <p>
            From raw footage to the final export, we focus on
            every detail — editing, color, sound, transitions
            and visual effects.
          </p>

          <div className="about-checks">

            {skills.map((skill) => (
              <div className="check-item" key={skill}>
                <CheckCircle size={18} />
                <span>{skill}</span>
              </div>
            ))}

          </div>

        </motion.div>

      </section>


      {/* ================= WHAT WE DO ================= */}

      <section className="about-services">

        <SectionTitle
          subtitle="OUR EXPERTISE"
          title="Everything Your Video Needs"
          description="A complete creative workflow from raw footage to final delivery."
        />

        <div className="expertise-grid">

          <motion.div
            className="expertise-card"
            whileHover={{ y: -8 }}
          >
            <div className="expertise-icon">
              <Film />
            </div>

            <h3>Video Editing</h3>

            <p>
              Clean cuts, storytelling, transitions and
              professional pacing for engaging videos.
            </p>
          </motion.div>


          <motion.div
            className="expertise-card"
            whileHover={{ y: -8 }}
          >
            <div className="expertise-icon">
              <Palette />
            </div>

            <h3>Color Grading</h3>

            <p>
              Cinematic colors and professional correction
              to create the right mood for every scene.
            </p>
          </motion.div>


          <motion.div
            className="expertise-card"
            whileHover={{ y: -8 }}
          >
            <div className="expertise-icon">
              <WandSparkles />
            </div>

            <h3>Motion Graphics</h3>

            <p>
              Modern animations, titles and visual effects
              that make your content stand out.
            </p>
          </motion.div>


          <motion.div
            className="expertise-card"
            whileHover={{ y: -8 }}
          >
            <div className="expertise-icon">
              <Headphones />
            </div>

            <h3>Audio Mixing</h3>

            <p>
              Balanced dialogue, music and sound effects
              for a polished final production.
            </p>
          </motion.div>

        </div>

      </section>


      {/* ================= NUMBERS ================= */}

      <section className="about-numbers">

        <div className="number-card">
          <h2>15000+</h2>
          <p>Videos Edited</p>
        </div>

        <div className="number-card">
          <h2>50+</h2>
          <p>Clients</p>
        </div>

        <div className="number-card">
          <h2>100%</h2>
          <p>Creative Focus</p>
        </div>

        <div className="number-card">
          <h2>24/7</h2>
          <p>Support</p>
        </div>

      </section>

    </div>
  );
}

export default About;