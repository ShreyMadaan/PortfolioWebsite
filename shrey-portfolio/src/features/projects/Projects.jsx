import projectsBg from "../../assets/images/projects-bg.png";

import { useEffect, useState } from "react";
import projects from "../../data/projects.json";
import { projectCategories } from "./projectData";
import ProjectCard from "./components/ProjectCard";
import Reveal from "../../components/Reveal/Reveal";

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectStartIndex, setProjectStartIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [projectsPerPage, setProjectsPerPage] = useState(3);

  // Update number of visible projects based on screen size
  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth < 768) {
        setProjectsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(3);
      }
    };

    updateProjectsPerPage();

    window.addEventListener("resize", updateProjectsPerPage);

    return () => {
      window.removeEventListener("resize", updateProjectsPerPage);
    };
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
        project.categories.includes(activeCategory)
      );

  const maxStartIndex = Math.max(
    filteredProjects.length - projectsPerPage,
    0
  );

  const visibleProjects = filteredProjects.slice(
    projectStartIndex,
    projectStartIndex + projectsPerPage
  );

  const hasMultiplePages =
    filteredProjects.length > projectsPerPage;

  const handleCategoryChange = (category) => {
    if (category === activeCategory) {
      return;
    }

    const currentCategoryIndex =
      projectCategories.indexOf(activeCategory);

    const newCategoryIndex =
      projectCategories.indexOf(category);

    setDirection(
      newCategoryIndex > currentCategoryIndex
        ? "right"
        : "left"
    );

    setActiveCategory(category);
    setProjectStartIndex(0);
  };

  const handlePrevious = () => {
    if (projectStartIndex === 0) {
      return;
    }

    setDirection("left");

    setProjectStartIndex(
      (currentIndex) => currentIndex - 1
    );
  };

  const handleNext = () => {
    if (projectStartIndex >= maxStartIndex) {
      return;
    }

    setDirection("right");

    setProjectStartIndex(
      (currentIndex) => currentIndex + 1
    );
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-zinc-900 py-24"
    >
      {/* Projects Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${projectsBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Section Blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <Reveal>

        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Projects
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            Things I&apos;ve built.
          </h2>
        </div>
        </Reveal>

        {/* Category Navigation */}
        <div className="mb-10 flex gap-8 overflow-x-auto border-b border-zinc-800">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`shrink-0 pb-4 text-sm font-medium transition-colors ${activeCategory === category
                  ? "border-b border-zinc-100 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Controls */}
        {hasMultiplePages && (
          <div className="mb-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={projectStartIndex === 0}
              aria-label="Previous projects"
              className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                projectStartIndex >= maxStartIndex
              }
              aria-label="Next projects"
              className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}

        {/* Projects */}
        <div
          key={`${activeCategory}-${projectStartIndex}-${projectsPerPage}`}
          className={
            direction === "right"
              ? "animate-[slideInRight_350ms_ease-out]"
              : "animate-[slideInLeft_350ms_ease-out]"
          }
        >
          {visibleProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 px-6 py-12 text-center">
              <p className="text-sm text-zinc-500">
                More projects coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;