import homeBg from "../../assets/images/home-bg.png";

import { useEffect, useState } from "react";

function Home() {
  const fullName = "Hi, I'm Shrey Madaan";

  const roles = [
    "Java Developer",
    "Backend Developer",
    "Web Developer",
    "Software Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Problem Solver",
    "Lifelong Learner",
  ];

  const [displayedName, setDisplayedName] = useState("");
  const [displayedRole, setDisplayedRole] = useState("");
  const [isNameComplete, setIsNameComplete] = useState(false);

  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  // Name typing animation
  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayedName(fullName.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === fullName.length) {
        clearInterval(typingInterval);
        setIsNameComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // Role typing/deleting animation
  useEffect(() => {
    if (!isNameComplete) {
      return;
    }

    const currentRole = roles[roleIndex];

    if (isWaiting) {
      const pauseTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 1500);

      return () => clearTimeout(pauseTimer);
    }

    const typingSpeed = isDeleting ? 40 : 80;

    const roleTimer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));

        if (displayedRole.length + 1 === currentRole.length) {
          setIsWaiting(true);
        }
      } else {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));

        if (displayedRole.length - 1 === 0) {
          setIsDeleting(false);

          setRoleIndex((currentIndex) => {
            return (currentIndex + 1) % roles.length;
          });
        }
      }
    }, typingSpeed);

    return () => clearTimeout(roleTimer);
  }, [displayedRole, isDeleting, isWaiting, roleIndex, isNameComplete]);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-5rem)] overflow-hidden"
    >
      {/* Hero Background */}
      <div
        className="
        absolute inset-0
        bg-cover bg-no-repeat
        bg-[position:68%_center]
        sm:bg-[position:65%_center]
        lg:bg-center
  "
        style={{ backgroundImage: `url(${homeBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75 sm:bg-black/70 lg:bg-black/65" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
              {displayedName}
            </h1>

            <div className="mt-6">
              <p className="text-lg text-zinc-500">I am a</p>

              <h2 className="mt-1 min-h-[1.5em] text-2xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                {displayedRole}
                <span className="ml-1 animate-pulse text-zinc-500">|</span>
              </h2>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              I build reliable, scalable and production-oriented software across
              backend and full-stack applications.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-300"
              >
                View Projects
              </a>

              <a
                href="https://github.com/ShreyMadaan"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
