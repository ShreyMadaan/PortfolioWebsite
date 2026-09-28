function CertificationCard({ certificate }) {
  return (
    <article className="border border-zinc-800 p-6 transition-colors hover:border-zinc-700">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {certificate.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {certificate.type}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
            {certificate.issuer && (
              <span>{certificate.issuer}</span>
            )}

            {certificate.date && (
              <span>{certificate.date}</span>
            )}
          </div>
        </div>

        <a
          href={certificate.url}
          className="shrink-0 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
        >
          View Certificate ↗
        </a>
      </div>
    </article>
  );
}

export default CertificationCard;