import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            ANKIT <span>VIDEO MIXING LAB</span>
          </h2>

          <p>
            Professional video editing,Professional Photo editing, color grading,
            motion graphics and creative video solutions.
          </p>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/Notice">Notice</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>
            <Mail size={18} />
            <span>ankitraj6910@gmail.com</span>
          </p>

          <p>
            <Phone size={18} />
            <span>+91 9122531069, +91 7484838936</span>
          </p>

          <p>
            <MapPin size={18} />
            <span>Manikpur, Muzaffarpur, Bihar, India</span>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Ankit Video Mixing Lab.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;