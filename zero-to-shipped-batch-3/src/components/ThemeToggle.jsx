// Switches between dark and light. It shows the theme you would switch TO.
export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      className="font-display text-sm font-semibold underline decoration-2 underline-offset-4 decoration-accent hover:text-accent-ink"
    >
      Use {next} theme
    </button>
  );
}
