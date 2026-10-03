import { useState } from "react";

function Navbar({ scrollDirection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "BeyondCode", href: "#beyond-code" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const difference = currentScrollY - previousScrollY;

  if (Math.abs(difference) < 8) {
    return;
  }

  if (difference > 0 && currentScrollY > 100) {
    setScrollDirection("down");
  } else if (difference < 0) {
    setScrollDirection("up");
  }

  previousScrollY = currentScrollY;
};

  return (
    <header
      className={`
    sticky top-0 z-50
    border-b border-zinc-800/80
    bg-zinc-950/95 backdrop-blur-md
    transition-transform duration-500 ease-out
    ${scrollDirection === "down" && !isMenuOpen
          ? "-translate-y-full"
          : "translate-y-0"
        }
  `}
    >
      <nav className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-xs font-semibold tracking-tight text-zinc-100">
              SM
            </span>

            <span className="text-lg font-semibold tracking-tight text-zinc-100">
              SHREY MADAAN
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 xl:flex">
            <a
              href="#contact"
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Contact
            </a>

            <a
              href="/resume.pdf"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100 xl:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-zinc-800 py-5 xl:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="border-b border-zinc-900 py-3 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#contact"
                onClick={closeMenu}
                className="border-b border-zinc-900 py-3 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Contact
              </a>

              <a
                href="/resume.pdf"
                className="mt-4 inline-flex w-fit rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                Resume ↗
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;