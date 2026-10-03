import educationBg from "../../assets/images/education-bg.png";
import Reveal from "../../components/Reveal/Reveal";
import educationData from "./educationData";

function Education() {
  return (
    <section id="education" className="relative overflow-hidden border-t border-zinc-900 py-24">
      {/* Education Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${educationBg})` }}
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
            Education
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            My academic journey.
          </h2>
        </div>
        </Reveal>
        {/* Education List */}
        <div className="space-y-6">
          {educationData.map((education) => (
            <article
              key={`${education.title}-${education.period}`}
              className="border border-zinc-800 p-6 transition-colors hover:border-zinc-700 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[180px_1fr_auto] lg:items-start">
                {/* Period */}
                <p className="text-sm font-medium text-zinc-500">
                  {education.period}
                </p>

                {/* Main Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                      {education.title}
                    </h3>

                    <span className="rounded-md border border-zinc-800 px-2.5 py-1 text-xs text-zinc-500">
                      {education.type}
                    </span>
                  </div>

                  <p className="mt-3 text-base text-zinc-300">
                    {education.institution}
                  </p>

                  {education.college && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {education.college}
                    </p>
                  )}

                  {education.details && (
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500">
                      {education.details.map((detail) => (
                        <span key={detail}>{detail}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                {education.actions && (
                  <div className="flex flex-wrap gap-4 lg:pt-1">
                    {education.actions.map((action) => (
                      <a
                        key={action.label}
                        href={action.url}
                        className="inline-flex text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;