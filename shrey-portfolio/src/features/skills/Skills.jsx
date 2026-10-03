import skillData from "./skillData";
import skillsBg from "../../assets/images/skills-bg.png";
import Reveal from "../../components/Reveal/Reveal";

function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-zinc-900 py-24"
    >
      {/* Skills Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${skillsBg})` }}
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
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            Tools I build with.
          </h2>
        </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {skillData.map((group, index) => (
            <div
              key={group.category}
              className={`rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900/40 ${index === skillData.length - 1 ? "md:col-span-2" : ""
                }`}
            >
              <h3 className="text-lg font-medium text-zinc-100">
                {group.category}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-zinc-600 hover:text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
