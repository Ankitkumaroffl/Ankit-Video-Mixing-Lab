import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { registerUser } from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(result.message);

      navigate("/login");

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">

      {/* Background */}

      <div className="register-orb register-orb-one"></div>
      <div className="register-orb register-orb-two"></div>

      <div className="register-grid"></div>

      <div className="register-container">

        {/* ================= LEFT ================= */}

        <motion.div
          className="register-showcase"
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

          <div className="register-brand">

            <div className="register-brand-icon">
              <Sparkles size={24} />
            </div>

            <span>
              ANKIT VIDEO Mixing LAB
            </span>

          </div>

          <h1>
            Start Your
            <br />
            <span>Creative</span>
            <br />
            Journey.
          </h1>

          <p>
            Create your account and enter a
            world of professional video editing,
            cinematic color grading and creative
            motion graphics.
          </p>

          <div className="register-benefits">

            <div>
              <span>✦</span>
              Manage your creative projects
            </div>

            <div>
              <span>✦</span>
              Explore professional services
            </div>

            <div>
              <span>✦</span>
              Keep your account secure
            </div>

          </div>

        </motion.div>


        {/* ================= CARD ================= */}

        <motion.div
          className="register-card"
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

          <div className="register-card-header">

            <div className="register-icon">
              <UserPlus size={26} />
            </div>

            <div>
              <h2>
                Create Account
              </h2>

              <p>
                Join Ankit Video Mixing Lab
              </p>
            </div>

          </div>


          {/* Error */}

          {error && (
            <motion.div
              className="register-error"
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


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="register-form-group">

              <label>
                Full Name
              </label>

              <div className="register-input-wrapper">

                <User size={19} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Email */}

            <div className="register-form-group">

              <label>
                Email Address
              </label>

              <div className="register-input-wrapper">

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


            {/* Password */}

            <div className="register-form-group">

              <label>
                Password
              </label>

              <div className="register-input-wrapper">

                <Lock size={19} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-eye"
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


            {/* Confirm Password */}

            <div className="register-form-group">

              <label>
                Confirm Password
              </label>

              <div className="register-input-wrapper">

                <Lock size={19} />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-eye"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* Button */}

            <motion.button
              type="submit"
              className="register-submit"
              disabled={loading}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

              {!loading && (
                <ArrowRight size={19} />
              )}

            </motion.button>

          </form>


          {/* Login */}

          <div className="register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
              <ArrowRight size={15} />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Register;