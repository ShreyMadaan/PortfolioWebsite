function About() {
  return (
    <section id="about" className="border-t border-zinc-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              About
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
              Building with purpose.
            </h2>
          </div>

          <div className="max-w-3xl space-y-6 text-lg leading-8 text-zinc-400">
            <p>
              I'm a Computer Science graduate focused on becoming a strong
              software engineer, with a particular interest in backend and
              full-stack development. I enjoy working on problems where
              understanding the underlying system is just as important as
              writing the code.
            </p>

            <p>
              My technical foundation spans data structures and algorithms,
              Java, object-oriented programming, SQL, system design and
              software engineering principles. I'm particularly interested in
              writing code that is clean, maintainable and designed with
              scalability in mind.
            </p>

            <p>
              I'm currently pursuing an MS in Computer Science while continuing
              my software engineering journey through hands-on development.
              Alongside structured learning, I regularly build projects that
              allow me to apply concepts across backend systems, full-stack
              applications and modern development workflows.
            </p>

            <p>
              I believe good software is built through a combination of strong
              fundamentals and thoughtful engineering decisions. Whether I'm
              designing an API, working through a data structure problem or
              structuring a larger application, I try to understand the
              trade-offs behind each decision rather than simply making
              something that works.
            </p>

            <p>
              My goal is to keep growing into an engineer who can take a
              problem from understanding the requirements to designing,
              building, testing and delivering a reliable solution. I'm
              especially interested in backend engineering, distributed
              systems and full-stack development, and I'm constantly looking
              for opportunities to build and learn along the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;