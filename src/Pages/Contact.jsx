import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

import SectionTitle from "../Components/SectionTitle";
import { submitContactForm } from "../api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await submitContactForm(formData);

      console.log("Contact Response:", result);

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

    } catch (error) {
      console.error("Contact Form Error:", error);

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* ================= HERO ================= */}

      <section className="page-hero contact-hero">

        <div className="page-hero-content">

          <span>GET IN TOUCH</span>

          <h1>
            LET'S CREATE
            <strong> TOGETHER. </strong>
          </h1>

          <p>
            Have a project in mind? Tell us about it and
            let's turn your idea into something memorable.
          </p>

        </div>

      </section>


      {/* ================= CONTACT SECTION ================= */}

      <section className="contact-section">

        <div className="contact-container">

          {/* ================= LEFT ================= */}

          <motion.div
            className="contact-info"

            initial={{
              opacity: 0,
              x: -40,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}
          >

            <span className="section-subtitle">
              CONTACT US
            </span>

            <h2>
              Let's talk about
              <span> your project.</span>
            </h2>

            <p>
              Whether you need a YouTube video, wedding film,
              social media reel or complete video production,
              we're ready to help.
            </p>


            {/* EMAIL */}

            <div className="contact-item">

              <div className="contact-icon">
                <Mail size={22} />
              </div>

              <div>
                <span>Email</span>
                <p>ankitraj6910@gmail.com</p>
              </div>

            </div>


            {/* PHONE */}

            <div className="contact-item">

              <div className="contact-icon">
                <Phone size={22} />
              </div>

              <div>
                <span>Phone</span>
                <p>+91 9122531069, +91 7484838936</p>
              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-item">

              <div className="contact-icon">
                <MapPin size={22} />
              </div>

              <div>
                <span>Location</span>
                <p>Manikpur, Muzaffarpur, Bihar, India</p>
              </div>

            </div>

          </motion.div>


          {/* ================= FORM ================= */}

          <motion.div
            className="contact-form-wrapper"

            initial={{
              opacity: 0,
              x: 40,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}
          >

            {/* SUCCESS MESSAGE */}

            {submitted && (
              <div className="success-message">

                <CheckCircle size={22} />

                <div>
                  <strong>Message Sent!</strong>

                  <p>
                    Thank you. We'll get back to you soon.
                  </p>
                </div>

              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL + PHONE */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* SERVICE */}

              <div className="form-group">

                <label htmlFor="service">
                  What do you need?
                </label>

                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a service
                  </option>

                  <option value="Video Editing">
                    Video Editing
                  </option>

                  <option value="Color Grading">
                    Color Grading
                  </option>

                  <option value="Motion Graphics">
                    Motion Graphics
                  </option>

                  <option value="Audio Mixing">
                    Audio Mixing
                  </option>

                  <option value="YouTube Editing">
                    YouTube Editing
                  </option>

                  <option value="Reels & Shorts">
                    Reels & Shorts
                  </option>

                </select>

              </div>


              {/* MESSAGE */}

              <div className="form-group">

                <label htmlFor="message">
                  Project Details
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >

                {loading
                  ? "Sending..."
                  : "Send Project Request"
                }

                {!loading && (
                  <Send size={18} />
                )}

              </button>

            </form>

          </motion.div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="contact-bottom">

        <SectionTitle
          subtitle="READY WHEN YOU ARE"
          title="Let's Make Something Great."
          description="Share your idea with us and let's start creating."
        />

      </section>

    </div>
  );
}

export default Contact;