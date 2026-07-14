type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Render a JSON-LD script tag. Escapes `<` to prevent script injection. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
