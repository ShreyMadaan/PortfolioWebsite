import contactBg from "../../assets/images/contact-bg.png";

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-zinc-900 py-24">
      {/* Contact Background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${contactBg})` }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/80" />

  {/* Section Blending */}
  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
            Let&apos;s build something.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            I&apos;m always open to discussing software engineering, interesting
            projects, and opportunities to build meaningful products. If
            you&apos;d like to connect, feel free to reach out.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shreymadaan31@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Email ↗
            </a>

            <a
              href="https://github.com/ShreyMadaan"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/shrey-madaan-bb3167137"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              LinkedIn ↗
            </a>

            <a
              href="/resume.pdf"
              className="inline-flex items-center border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;