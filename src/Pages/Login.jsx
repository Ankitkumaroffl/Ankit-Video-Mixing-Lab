
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ===============================
  // HANDLE LOGIN
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // ===============================
      // SAVE USER
      // ===============================

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      // ===============================
      // SAVE JWT TOKEN
      // ===============================

      localStorage.setItem(
        "token",
        result.token
      );

      // ===============================
      // UPDATE NAVBAR
      // ===============================

      window.dispatchEvent(
        new Event("userChanged")
      );

      // ===============================
      // GO TO DASHBOARD
      // ===============================

      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      {/* ===============================
          ANIMATED BACKGROUND
      =============================== */}

      <div className="login-orb login-orb-one"></div>
      <div className="login-orb login-orb-two"></div>

      <div className="login-grid"></div>

      <div className="login-container">

        {/* ===============================
            LEFT SIDE
        =============================== */}

        <motion.div
          className="login-showcase"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="login-brand">

            <div className="login-brand-icon">
              <Sparkles size={24} />
            </div>

            <span>
              ANKIT VIDEO MIXING LAB
            </span>

          </div>


          <h1>
            Create.
            <br />
            <span>Edit.</span>
            <br />
            Inspire.
          </h1>


          <p>
            Welcome back to your creative space.
            Manage your video projects and bring
            your ideas to life.
          </p>


          <div className="login-feature-list">

            <div className="login-feature">
              <span>01</span>
              Professional Video Editing
            </div>

            <div className="login-feature">
              <span>02</span>
              Cinematic Color Grading
            </div>

            <div className="login-feature">
              <span>03</span>
              Creative Motion Graphics
            </div>

          </div>

        </motion.div>


        {/* ===============================
            LOGIN CARD
        =============================== */}

        <motion.div
          className="login-card"
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >

          {/* ===============================
              HEADER
          =============================== */}

          <div className="login-card-header">

            <div className="login-icon">
              <LogIn size={26} />
            </div>

            <div>

              <h2>
                Welcome Back
              </h2>

              <p>
                Login to your account
              </p>

            </div>

          </div>


          {/* ===============================
              ERROR
          =============================== */}

          {error && (
            <motion.div
              className="login-error"
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {error}
            </motion.div>
          )}


          {/* ===============================
              LOGIN FORM
          =============================== */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="login-form-group">

              <label>
                Email Address
              </label>

              <div className="login-input-wrapper">

                <Mail size={19} />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label>
                Password
              </label>

              <div className="login-input-wrapper">

                <Lock size={19} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />


                <button
                  type="button"
                  className="login-eye"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <motion.button
              type="submit"
              className="login-submit"
              disabled={loading}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >

              {loading
                ? "Logging in..."
                : "Login to Dashboard"}

              {!loading && (
                <ArrowRight size={19} />
              )}

            </motion.button>

          </form>


          {/* ===============================
              REGISTER
          =============================== */}

          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">

              Create Account

              <ArrowRight size={15} />

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Login;
