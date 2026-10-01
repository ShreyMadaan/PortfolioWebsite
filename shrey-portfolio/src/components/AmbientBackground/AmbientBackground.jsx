import useScrollDirection from "../../hooks/useScrollDirection";

function AmbientBackground() {
  const scrollDirection = useScrollDirection();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${
        scrollDirection === "down"
          ? "ambient-scroll-down"
          : "ambient-scroll-up"
      }`}
    >
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />

      <div className="ambient-grid" />
    </div>
  );
}

export default AmbientBackground;