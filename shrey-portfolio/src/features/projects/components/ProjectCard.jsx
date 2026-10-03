const handleMouseMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  card.style.setProperty(
    "--mouse-x",
    `${event.clientX - rect.left}px`
  );

  card.style.setProperty(
    "--mouse-y",
    `${event.clientY - rect.top}px`
  );
};

function ProjectCard({ project }) {
  return (
    <article
      onMouseMove={handleMouseMove}
      className="project-card group overflow-hidden border border-zinc-800 transition-colors hover:border-zinc-700"
    >
      {/* Project Image Placeholder */}
      <div className="flex aspect-video items-center justify-center bg-zinc-900">
        <span className="text-sm text-zinc-600">
          Project Preview
        </span>
      </div>

      {/* Project Content */}
      <div className="flex h-full flex-col p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
            {project.title}
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-5 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 transition-colors hover:text-zinc-100"
          >
            GitHub ↗
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Live Demo ↗
            </a>
          ) : (
            <span className="cursor-not-allowed text-zinc-700">
              Live Demo ↗
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;