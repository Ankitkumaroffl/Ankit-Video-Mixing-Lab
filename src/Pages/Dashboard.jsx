import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  LogOut,
  Film,
  Video,
  Palette,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Projects",
      value: "12",
      icon: <Film size={24} />,
    },
    {
      title: "Completed",
      value: "08",
      icon: <CheckCircle size={24} />,
    },
    {
      title: "In Progress",
      value: "04",
      icon: <Clock size={24} />,
    },
    {
      title: "Services",
      value: "06",
      icon: <Sparkles size={24} />,
    },
  ];

  const services = [
    {
      title: "Video Editing",
      description:
        "Professional editing for YouTube, reels, weddings and events.",
      icon: <Video size={28} />,
    },
    {
      title: "Color Grading",
      description:
        "Give your videos a cinematic and professional look.",
      icon: <Palette size={28} />,
    },
    {
      title: "Motion Graphics",
      description:
        "Creative animations, titles and visual effects.",
      icon: <Sparkles size={28} />,
    },
     
  ];

  return (
    <section className="dashboard">

      {/* Background Effects */}
      <div className="dashboard-glow glow-one"></div>
      <div className="dashboard-glow glow-two"></div>

      <div className="dashboard-container">

        {/* ================= HERO ================= */}
        <motion.div
          className="dashboard-hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-content">

            <div className="welcome-badge">
              <Sparkles size={16} />
              Welcome Back
            </div>

            <h1>
              Hello,{" "}
              <span>{user.name}</span>
              👋
            </h1>

            <p>
              Welcome to your Ankit Video Mixing Lab dashboard.
              Manage your creative projects and explore our services.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-dashboard-btn"
                onClick={() => navigate("/services")}
              >
                Explore Services
                <ArrowRight size={18} />
              </button>

              <button
                className="secondary-dashboard-btn"
                onClick={() => navigate("/gallery")}
              >
                <Play size={18} />
                View Gallery
              </button>
            </div>

          </div>

          {/* Profile */}
          <motion.div
            className="dashboard-profile"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <div className="profile-email">
              <Mail size={15} />
              {user.email}
            </div>

            <div className="profile-status">
              <span></span>
              Active Account
            </div>
          </motion.div>

        </motion.div>


        {/* ================= STATS ================= */}
        <div className="dashboard-stats">

          {stats.map((stat, index) => (
            <motion.div
              className="stat-card"
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <div className="stat-icon">
                {stat.icon}
              </div>

              <div>
                <h2>{stat.value}</h2>
                <p>{stat.title}</p>
              </div>
            </motion.div>
          ))}

        </div>


        {/* ================= SERVICES ================= */}
        <motion.div
          className="dashboard-section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <span>WHAT WE OFFER</span>
            <h2>Creative Services</h2>
          </div>

          <button
            onClick={() => navigate("/services")}
          >
            View All
            <ArrowRight size={17} />
          </button>
        </motion.div>


        <div className="dashboard-services">

          {services.map((service, index) => (
            <motion.div
              className="dashboard-service-card"
              key={service.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
              }}
            >
              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button
                onClick={() => navigate("/services")}
              >
                Explore
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}

        </div>


        {/* ================= ACCOUNT ================= */}
        <motion.div
          className="account-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <div className="account-left">

            <div className="account-icon">
              <User size={24} />
            </div>

            <div>
              <span>ACCOUNT</span>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </motion.div>

      </div>
    </section>
  );
}

export default Dashboard;