// Reusable bulleted list for strengths and weaknesses.
export default function FeedbackList({ items, emptyText }) {
  const shown = items.length ? items : [emptyText];
  return (
    <ul className="space-y-3 text-ink">
      {shown.map((item) => (
        <li
          key={item}
          className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:bg-accent before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
