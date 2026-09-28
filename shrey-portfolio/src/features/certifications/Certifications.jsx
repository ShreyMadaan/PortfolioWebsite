import { useState } from "react";
import certificationCategories from "./certificationData";
import CertificationCard from "./components/CertificationCard";

function Certifications() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubject, setActiveSubject] = useState("All");
  const [direction, setDirection] = useState("right");

  const currentCategory = certificationCategories[activeCategory];

  const filteredCertificates =
    activeSubject === "All"
      ? currentCategory.certificates
      : currentCategory.certificates.filter(
          (certificate) => certificate.subject === activeSubject
        );

  const handleCategoryChange = (index) => {
    if (index === activeCategory) {
      return;
    }

    setDirection(index > activeCategory ? "right" : "left");
    setActiveCategory(index);
    setActiveSubject("All");
  };

  const handleSubjectChange = (subject) => {
    const currentIndex =
      currentCategory.subjects.indexOf(activeSubject);

    const newIndex =
      currentCategory.subjects.indexOf(subject);

    setDirection(newIndex > currentIndex ? "right" : "left");
    setActiveSubject(subject);
  };

  return (
    <section
      id="certifications"
      className="border-t border-zinc-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Certifications
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            Credentials & achievements.
          </h2>
        </div>

        {/* Primary Categories */}
        <div className="mb-8 flex gap-8 overflow-x-auto border-b border-zinc-800">
          {certificationCategories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              onClick={() => handleCategoryChange(index)}
              className={`shrink-0 pb-4 text-sm font-medium transition-colors ${
                activeCategory === index
                  ? "border-b border-zinc-100 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Subject Filters */}
        {currentCategory.subjects.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {currentCategory.subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => handleSubjectChange(subject)}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  activeSubject === subject
                    ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                    : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        )}

        {/* Certificates */}
        <div
          key={`${activeCategory}-${activeSubject}`}
          className={
            direction === "right"
              ? "animate-[slideInRight_350ms_ease-out]"
              : "animate-[slideInLeft_350ms_ease-out]"
          }
        >
          {filteredCertificates.length > 0 ? (
            <div className="space-y-4">
              {filteredCertificates.map((certificate) => (
                <CertificationCard
                  key={certificate.title}
                  certificate={certificate}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 px-6 py-12 text-center">
              <p className="text-sm text-zinc-500">
                More certificates coming soon.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Certifications;