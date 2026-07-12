type CatalogueSeoCopyProps = {
  paragraphs: string[];
  heading?: string;
};

export function CatalogueSeoCopy({
  paragraphs,
  heading = "About this category",
}: CatalogueSeoCopyProps) {
  if (paragraphs.length === 0) return null;

  const headingId = "catalogue-seo-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-border bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id={headingId} className="type-h3 text-neutral-dark">
          {heading}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="type-body text-pretty text-neutral-mid"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
