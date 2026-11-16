// Labelled textarea for pasting the job description.
export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="jd" className="block font-display text-lg font-semibold mb-3">
        2. Job description
      </label>
      <textarea
        id="jd"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-64 bg-surface border-2 border-ink text-ink p-4 font-body text-base leading-relaxed placeholder:text-muted focus:outline-none focus:border-accent"
      />
    </div>
  );
}
