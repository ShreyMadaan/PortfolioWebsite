const hobbies = [
  {
    title: "Sports",
    description:
      "Staying active, competing and enjoying the discipline that comes with sport.",
  },
  {
    title: "Travel",
    description:
      "Exploring new places, experiencing different environments and collecting new experiences.",
  },
  {
    title: "Fitness",
    description:
      "Training consistently, getting stronger and making fitness part of everyday life.",
  },
  {
    title: "Gaming",
    description:
      "Unwinding with games, enjoying competition and getting lost in a good challenge.",
  },
];

function BeyondCode() {
  return (
    <section
      id="beyond-code"
      className="border-t border-zinc-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Beyond Code
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            When I&apos;m not building software.
          </h2>
        </div>

        {/* Hobbies */}
        <div className="grid gap-5 sm:grid-cols-2">
          {hobbies.map((hobby) => (
            <article
              key={hobby.title}
              className="rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900/40"
            >
              <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                {hobby.title}
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                {hobby.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeyondCode;