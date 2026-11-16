import { SECTION_PATTERNS, SKILLS, STOPWORDS } from "./constants.js";

// Does `term` appear in `text` as a whole word? The lookarounds stop "go" matching "good".
export function hasTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i").test(text);
}

// Pull out the terms the job description cares about, with a weight for each.
// Named skills count double; the most frequent other words count once.
export function jobKeywords(jobDescription) {
  const lower = jobDescription.toLowerCase();
  const weights = new Map();

  for (const skill of SKILLS) {
    if (hasTerm(lower, skill)) weights.set(skill, 2);
  }

  const counts = new Map();
  for (const word of lower.match(/[a-z][a-z0-9+#]*/g) || []) {
    if (word.length < 3 || STOPWORDS.has(word) || weights.has(word)) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  const topWords = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([word]) => word);
  for (const word of topWords) weights.set(word, 1);

  return weights;
}

// Score a resume against a job description. Pure: same inputs, same output.
export function scoreResume(resumeText, jobDescription) {
  const resume = resumeText.toLowerCase();
  const keywords = jobKeywords(jobDescription);

  // 1. Keyword match: weighted share of JD terms found in the resume.
  let totalWeight = 0;
  let matchedWeight = 0;
  const matched = [];
  const missing = [];
  for (const [term, weight] of keywords) {
    totalWeight += weight;
    if (hasTerm(resume, term)) {
      matchedWeight += weight;
      matched.push(term);
    } else {
      missing.push(term);
    }
  }
  const matchScore = totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0;

  // 2. Structure: does the resume have the usual sections?
  const sectionNames = Object.keys(SECTION_PATTERNS);
  const sectionsFound = sectionNames.filter((name) => SECTION_PATTERNS[name].test(resumeText));
  const structureScore = Math.round((sectionsFound.length / sectionNames.length) * 100);

  // 3. Impact: numbers such as "40%", "$2M", "3x" or "10 users".
  const metrics =
    resumeText.match(/\d+(\.\d+)?\s*(%|x\b|k\b|m\b|users|customers|ms|percent)|\$\s?\d/gi) || [];
  const impactScore = Math.min(100, metrics.length * 20);

  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(resumeText);
  const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(resumeText);
  const wordCount = (resumeText.match(/\S+/g) || []).length;

  const overall = Math.round(matchScore * 0.6 + structureScore * 0.25 + impactScore * 0.15);

  // Plain-language feedback built from the numbers above.
  const strengths = [];
  const weaknesses = [];

  if (matched.length) strengths.push(`Covers ${matched.length} of ${keywords.size} key terms from the job.`);
  if (sectionsFound.length >= 4) strengths.push("Has most of the standard sections.");
  if (metrics.length) strengths.push(`Uses numbers to show impact (${metrics.length} found).`);
  if (hasEmail && hasPhone) strengths.push("Contact details are easy to find.");
  if (wordCount >= 300 && wordCount <= 900) strengths.push("Length is in a good range.");

  const missingSkills = missing.filter((term) => SKILLS.includes(term));
  if (missingSkills.length) {
    weaknesses.push(`Named skills from the job are not mentioned: ${missingSkills.slice(0, 5).join(", ")}.`);
  }
  const absentSections = sectionNames.filter((name) => !sectionsFound.includes(name));
  if (absentSections.length) weaknesses.push(`Missing sections: ${absentSections.join(", ")}.`);
  if (!metrics.length) weaknesses.push("No measurable results. Add numbers such as percentages, counts or time saved.");
  if (!hasEmail || !hasPhone) weaknesses.push("Contact details (email or phone) are hard to find.");
  if (wordCount < 300) weaknesses.push("The resume is short. Add more detail about what you built.");
  if (wordCount > 900) weaknesses.push("The resume is long. Trim older or less relevant roles.");

  return {
    overall,
    breakdown: { match: matchScore, structure: structureScore, impact: impactScore },
    matched,
    missing,
    strengths,
    weaknesses,
    keywordCount: keywords.size,
  };
}
