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
      {/* Project Preview */}
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="text-3xl font-semibold tracking-tight text-zinc-700">
              {project.title.charAt(0).toUpperCase()}
            </div>

            <p className="mt-3 text-sm font-medium text-zinc-400">
              {project.title}
            </p>

            {project.technologies.length > 0 && (
              <p className="mt-2 text-xs text-zinc-600">
                {project.technologies.slice(0, 3).join(" • ")}
              </p>
            )}
          </div>
        )}

        {/* subtle image gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
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