import experienceData from "./experienceData";

function Experience() {
  return (
    <section id="experience" className="border-t border-zinc-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            My journey so far.
          </h2>
        </div>

        <div className="max-w-4xl">
          {experienceData.map((item, index) => (
            <div
              key={`${item.organization}-${item.period}`}
              className="grid gap-4 border-t border-zinc-800 py-8 md:grid-cols-[180px_1fr]"
            >
              <p className="text-sm text-zinc-500">
                {item.period}
              </p>

              <div>
                <h3 className="text-lg font-medium text-zinc-100">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  {item.organization}
                </p>

                <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;