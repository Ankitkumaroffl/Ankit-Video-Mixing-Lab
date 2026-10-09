import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notice() {
  const navigate = useNavigate();

  return (
    <section className="notice-page">

      {/* Background */}
      <div className="notice-bg-orb notice-bg-orb-one"></div>
      <div className="notice-bg-orb notice-bg-orb-two"></div>

      <div className="notice-container">

        {/* =========================
            HEADER
        ========================== */}

        <motion.div
          className="notice-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="notice-icon">
            <Bell size={28} />
          </div>

          <span className="notice-label">
            IMPORTANT NOTICE
          </span>

          <h1>
            Latest <span>Updates</span>
          </h1>

          <p>
            Stay updated with the latest news,
            bookings and professional services
            from Ankit Video Mixing Lab.
          </p>
        </motion.div>


        {/* =========================
            MAIN NOTICE CARD
        ========================== */}

        <motion.div
          className="notice-main-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
        >

          {/* Booking Badge */}

          <div className="notice-badge">
            <Sparkles size={16} />
            BOOKING OPENED
          </div>


          {/* Title */}

          <h2>
            Booking is Now Open! 🎬
          </h2>

          <p>
            We are now accepting bookings for
            professional video production,
            video editing, photography,
            live events and creative services.
          </p>


          {/* Information */}

          <div className="notice-info">

            <div>
              <Calendar size={18} />

              <span>
                Bookings Available Now
              </span>
            </div>


            <div>
              <Clock size={18} />

              <span>
                Advance Booking Recommended
              </span>
            </div>

          </div>


          {/* =========================
              SERVICES
          ========================== */}

          <div className="notice-services">

            <div>
              HD Video Camera
            </div>

            <div>
              4K Video Camera
            </div>

            <div>
              Drone Videography
            </div>

            <div>
              5D / 6D Camera
            </div>

            <div>
              Live Telecast
            </div>

            <div>
              Photo Editing
            </div>

            <div>
              Album Design
            </div>
            <div>
              Video Editing
            </div>
            <div>
              Cinematic Video Editing
            </div>
          </div>


          {/* =========================
              BOOKING BUTTON
          ========================== */}

          <motion.button
            className="notice-book-btn"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate("/contact")}
          >
            Book Your Service

            <ArrowRight size={19} />
          </motion.button>

        </motion.div>


        {/* =========================
            BOTTOM MESSAGE
        ========================== */}

        <motion.div
          className="notice-bottom-message"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
        >
          <Sparkles size={18} />

          <span>
            Let's create something amazing together.
          </span>
        </motion.div>

      </div>
    </section>
  );
}

export default Notice;