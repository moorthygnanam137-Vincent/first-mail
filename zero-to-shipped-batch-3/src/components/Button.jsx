// Reusable button. Disabled while `loading` so a second click cannot start a second run.
export default function Button({ loading = false, children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="px-7 py-3 bg-accent text-on-accent font-display text-lg font-semibold hover:bg-ink hover:text-page transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Reading resume..." : children}
    </button>
  );
}
