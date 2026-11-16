// Reusable section: a ruled block with an optional heading. It is not a boxed card.
// The default top padding is pt-5. Passing your own className replaces it.
export default function Card({ title, titleClassName = "text-ink", className = "pt-5", children }) {
  return (
    <section className={`border-t border-ink ${className}`}>
      {title && <h2 className={`font-display text-xl font-semibold tracking-tight mb-4 ${titleClassName}`}>{title}</h2>}
      {children}
    </section>
  );
}
