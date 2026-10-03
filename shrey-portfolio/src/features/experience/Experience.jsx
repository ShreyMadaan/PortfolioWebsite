import experienceBg from "../../assets/images/experience-bg.png";
import Reveal from "../../components/Reveal/Reveal";
import experienceData from "./experienceData";

function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-zinc-900 py-24"
    >
      {/* Experience Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${experienceBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Section Blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            The journey so far.
          </h2>
        </div>
        </Reveal>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 hidden h-full w-px bg-zinc-800 md:block" />

          <div className="space-y-10">
            {experienceData.map((experience) => (
              <article
                key={`${experience.period}-${experience.title}`}
                className="relative md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-zinc-700 bg-zinc-950 md:block" />

                <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-8">
                  {/* Period */}
                  <div>
                    <p className="text-sm font-medium text-zinc-500">
                      {experience.period}
                    </p>
                  </div>

                  {/* Experience content */}
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                      {experience.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {experience.organization}
                    </p>

                    {experience.progression && (
                      <p className="mt-4 text-sm font-medium text-zinc-400">
                        {experience.progression}
                      </p>
                    )}

                    {experience.description && (
                      <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;