// Common words that carry no meaning for matching.
export const STOPWORDS = new Set([
  "and", "the", "for", "with", "you", "your", "will", "are", "our", "this", "that",
  "from", "have", "has", "who", "what", "about", "can", "must", "should", "etc",
  "not", "but", "all", "any", "job", "role", "team", "work", "working", "experience",
  "years", "year", "ability", "strong", "good", "great", "using", "such",
  "including", "plus", "preferred", "required", "requirements", "responsibilities",
]);

// Technical skills we look for by name, so "node.js" or "c#" are matched exactly.
export const SKILLS = [
  "javascript", "typescript", "python", "java", "c#", "c++", "go", "rust", "ruby",
  "php", "sql", "postgresql", "mysql", "mongodb", "react", "vue", "angular", "node.js",
  "express", "django", "flask", "spring", "html", "css", "tailwind", "git", "docker",
  "kubernetes", "aws", "azure", "gcp", "linux", "rest", "graphql", "ci/cd", "testing",
  "jest", "agile", "scrum", "figma",
];

// Sections a good resume usually has. Each name maps to the pattern that finds it.
export const SECTION_PATTERNS = {
  Experience: /\b(experience|work history|employment)\b/i,
  Education: /\beducation\b/i,
  Skills: /\bskills?\b/i,
  Projects: /\bprojects?\b/i,
  Summary: /\b(summary|profile|about me)\b/i,
};

export const ACCEPTED_TYPES = ".pdf,.docx";
export const MIN_JD_LENGTH = 50;
