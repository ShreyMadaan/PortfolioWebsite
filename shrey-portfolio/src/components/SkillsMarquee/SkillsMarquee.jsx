import { useEffect, useRef } from "react";

const skills = [
  "Java",
  "Spring Boot",
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "SQL",
  "MySQL",
  "REST APIs",
  "Git",
  "GitHub",
  "Docker",
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "System Design",
];

function SkillsMarquee({ direction = "down" }) {
  const trackRef = useRef(null);

  const positionRef = useRef(0);
  const velocityRef = useRef(-0.5);
  const targetVelocityRef = useRef(-0.5);

  useEffect(() => {
    targetVelocityRef.current =
      direction === "down" ? -0.5 : 0.5;
  }, [direction]);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      const track = trackRef.current;

      if (!track) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      // Smoothly move current velocity toward target velocity
      velocityRef.current +=
        (targetVelocityRef.current - velocityRef.current) * 0.04;

      positionRef.current += velocityRef.current;

      const halfWidth = track.scrollWidth / 2;

      // Infinite loop
      if (positionRef.current <= -halfWidth) {
        positionRef.current += halfWidth;
      }

      if (positionRef.current >= 0) {
        positionRef.current -= halfWidth;
      }

      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="skills-marquee">
      <div
        ref={trackRef}
        className="skills-marquee-track"
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex shrink-0 items-center gap-8"
          >
            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
              {skill}
            </span>

            <span className="text-xs text-zinc-700">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsMarquee;