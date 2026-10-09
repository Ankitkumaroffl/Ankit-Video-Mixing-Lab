
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

import SectionTitle from "../Components/SectionTitle";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Royal Wedding Video",
      category: "Wedding Video",
      video: "/videos/wedding-video.mp4",
    },
    {
      id: 2,
      title: "Birthday Celebration",
      category: "Birthday Video",
      video: "/videos/birthday-video.mp4",
    },
    {
      id: 3,
      title: "Cinematic Couple Film",
      category: "Cinematic Video",
      video: "/videos/cinematic-video.mp4",
    },
    {
      id: 4,
      title: "Premium Photo Album",
      category: "Photo Album",
      video: "/videos/photo-album.mp4",
    },
    {
      id: 5,
      title: "YouTube Creator Video",
      category: "YouTube Video",
      video: "/videos/youtube-video.mp4",
    },
    {
      id: 6,
      title: "Instagram Reels",
      category: "Reels",
      video: "/videos/reels-video.mp4",
    },
    {
      id: 7,
      title: "Wedding Highlights",
      category: "Wedding Video",
      video: "/videos/wedding-highlights.mp4",
    },
    {
      id: 8,
      title: "Birthday Memories",
      category: "Birthday Video",
      video: "/videos/birthday-memories.mp4",
    },
    {
      id: 9,
      title: "Cinematic Travel Film",
      category: "Cinematic Video",
      video: "/videos/travel-cinematic.mp4",
    },
    {
      id: 10,
      title: "Creative Photo Album",
      category: "Photo Album",
      video: "/videos/creative-album.mp4",
    },
    {
      id: 11,
      title: "Professional YouTube Content",
      category: "YouTube Video",
      video: "/videos/youtube-content.mp4",
    },
    {
      id: 12,
      title: "Short Form Reels",
      category: "Reels",
      video: "/videos/short-reels.mp4",
    },
  ];

  const categories = [
    "All",
    "Wedding Video",
    "Birthday Video",
    "Cinematic Video",
    "Album",
    "YouTube Video",
    "Reels",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  // ================= OPEN VIDEO =================

  const openVideo = (project) => {
    setSelectedVideo(project);
    document.body.style.overflow = "hidden";
  };

  // ================= CLOSE VIDEO =================

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // ================= PREVIOUS VIDEO =================

  const previousVideo = () => {
    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedVideo.id
    );

    const previousIndex =
      currentIndex === 0
        ? filteredProjects.length - 1
        : currentIndex - 1;

    setSelectedVideo(filteredProjects[previousIndex]);
  };

  // ================= NEXT VIDEO =================

  const nextVideo = () => {
    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedVideo.id
    );

    const nextIndex =
      currentIndex === filteredProjects.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedVideo(filteredProjects[nextIndex]);
  };

  return (
    <div className="gallery-page">

      {/* ================= PAGE HERO ================= */}

      <section className="page-hero gallery-hero">

        <div className="page-hero-content">

          <span>OUR PORTFOLIO</span>

          <h1>
            WORK THAT
            <strong> SPEAKS. </strong>
          </h1>

          <p>
            Explore our wedding videos, birthday videos,
            cinematic films, photo albums, YouTube videos
            and creative reels.
          </p>

        </div>

      </section>


      {/* ================= GALLERY ================= */}

      <section className="gallery-section">

        <SectionTitle
          subtitle="SELECTED WORK"
          title="Our Creative Portfolio"
          description="Click any project to watch the video."
        />


        {/* ================= FILTER ================= */}

        <div className="gallery-filters">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>


        {/* ================= VIDEO GRID ================= */}

        <motion.div
          layout
          className="gallery-grid"
        >

          <AnimatePresence mode="popLayout">

            {filteredProjects.map((project) => (

              <motion.div
                layout
                key={project.id}
                className="gallery-card"

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}

                transition={{
                  duration: 0.4,
                }}

                onClick={() => openVideo(project)}
              >

                {/* VIDEO PREVIEW */}

                <video
                  className="gallery-video"
                  src={project.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />


                {/* DARK OVERLAY */}

                <div className="gallery-card-overlay"></div>


                {/* PLAY BUTTON */}

                <div className="gallery-play">

                  <Play
                    size={28}
                    fill="currentColor"
                  />

                </div>


                {/* VIDEO INFO */}

                <div className="gallery-video-info">

                  <span>
                    {project.category}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </motion.div>

      </section>


      {/* ================= VIDEO MODAL ================= */}

      <AnimatePresence>

        {selectedVideo && (

          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={closeVideo}
          >

            <motion.div
              className="video-modal-content"

              initial={{
                opacity: 0,
                scale: 0.8,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                scale: 0.8,
              }}

              transition={{
                duration: 0.3,
              }}

              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE */}

              <button
                className="video-modal-close"
                onClick={closeVideo}
              >
                <X size={25} />
              </button>


              {/* PREVIOUS */}

              <button
                className="video-modal-prev"
                onClick={previousVideo}
              >
                <ChevronLeft size={30} />
              </button>


              {/* VIDEO */}

              <video
                key={selectedVideo.id}
                className="video-modal-player"
                src={selectedVideo.video}
                controls
                autoPlay
                playsInline
              />


              {/* NEXT */}

              <button
                className="video-modal-next"
                onClick={nextVideo}
              >
                <ChevronRight size={30} />
              </button>


              {/* VIDEO DETAILS */}

              <div className="video-modal-info">

                <span>
                  {selectedVideo.category}
                </span>

                <h2>
                  {selectedVideo.title}
                </h2>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ================= CTA ================= */}

      <section className="gallery-cta">

        <div>

          <span>READY TO CREATE?</span>

          <h2>
            YOUR PROJECT
            <br />
            COULD BE NEXT.
          </h2>

          <a
            href="/contact"
            className="btn-primary"
          >
            Start a Project
          </a>

        </div>

      </section>

    </div>
  );
}

export default Gallery;

