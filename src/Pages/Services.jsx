
import { motion } from "framer-motion";
import {
  Film,
  Palette,
  WandSparkles,
  Headphones,
  Smartphone,
  Check,
  ArrowRight,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

import SectionTitle from "../Components/SectionTitle";

function Services() {
  const services = [
    {
      icon: Film,
      title: "Video Editing",
      description:
        "Professional editing that turns raw footage into engaging and cinematic videos.",
      features: [
        "Professional cuts",
        "Smooth transitions",
        "Storytelling",
        "Background music",
      ],
    },
    {
      icon: Palette,
      title: "Color Grading",
      description:
        "Create the perfect mood and cinematic look with professional color correction.",
      features: [
        "Color correction",
        "Cinematic looks",
        "Skin tone correction",
        "Creative grading",
      ],
    },
    {
      icon: WandSparkles,
      title: "Motion Graphics",
      description:
        "Modern animations and visual effects to make your content more dynamic.",
      features: [
        "Logo animation",
        "Text animation",
        "Titles",
        "Visual effects",
      ],
    },
    {
      icon: Headphones,
      title: "Audio Mixing",
      description:
        "Clean and balanced audio that makes your videos sound professional.",
      features: [
        "Voice cleanup",
        "Music mixing",
        "Sound effects",
        "Audio balancing",
      ],
    },
    {
      icon: FaYoutube,
      title: "YouTube Editing",
      description:
        "Engaging YouTube videos designed to keep viewers watching.",
      features: [
        "Long-form editing",
        "Thumbnail integration",
        "Captions",
        "YouTube optimization",
      ],
    },
    {
      icon: Smartphone,
      title: "Reels & Shorts",
      description:
        "Fast-paced short-form content optimized for Instagram, YouTube and social media.",
      features: [
        "Instagram Reels",
        "YouTube Shorts",
        "Trending edits",
        "Captions & effects",
      ],
    },
  ];

  return (
    <div className="services-page">

      {/* HERO */}
      <section className="page-hero services-hero">
        <div className="page-hero-content">
          <span>WHAT WE OFFER</span>

          <h1>
            CREATIVE
            <strong> SERVICES.</strong>
          </h1>

          <p>
            From raw footage to the final frame,
            we provide everything needed to create
            professional video content.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-main">

        <SectionTitle
          subtitle="OUR SERVICES"
          title="Bring Your Vision To Life"
          description="Choose the creative service that fits your project."
        />

        <div className="services-grid">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                className="service-large-card"
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                whileHover={{ y: -8 }}
              >

                <div className="service-top">

                  <div className="large-service-icon">
                    <Icon size={28} />
                  </div>

                  <span className="service-number">
                    0{index + 1}
                  </span>

                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="service-feature-list">

                  {service.features.map((feature) => (
                    <div
                      className="service-feature"
                      key={feature}
                    >
                      <Check size={16} />
                      {feature}
                    </div>
                  ))}

                </div>

                <a
                  href="/contact"
                  className="service-action"
                >
                  Get Started
                  <ArrowRight size={17} />
                </a>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">

        <SectionTitle
          subtitle="OUR PROCESS"
          title="How We Work"
          description="A simple and transparent workflow from your first idea to the final video."
        />

        <div className="process-grid">

          <div className="process-item">
            <span>01</span>
            <h3>Discuss</h3>
            <p>
              We understand your project, goals,
              audience and creative requirements.
            </p>
          </div>

          <div className="process-item">
            <span>02</span>
            <h3>Plan</h3>
            <p>
              We create an editing direction,
              visual style and production plan.
            </p>
          </div>

          <div className="process-item">
            <span>03</span>
            <h3>Create</h3>
            <p>
              Our editing process brings your
              footage, sound, color and graphics together.
            </p>
          </div>

          <div className="process-item">
            <span>04</span>
            <h3>Deliver</h3>
            <p>
              After final revisions, your finished
              video is delivered in the required format.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">

        <div>

          <span>LET'S CREATE TOGETHER</span>

          <h2>
            HAVE A VIDEO
            <br />
            PROJECT?
          </h2>

          <a
            href="/contact"
            className="btn-primary"
          >
            Start Your Project
            <ArrowRight size={18} />
          </a>

        </div>

      </section>

    </div>
  );
}

export default Services;

