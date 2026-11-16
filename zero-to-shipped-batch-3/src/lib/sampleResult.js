// A fixed example of what scoreResume() returns, shown on the landing page so visitors
// can see the results screen before they upload anything. Not computed from a real resume.
//
// The numbers follow the rules in scoreResume.js:
// - match: named skills weigh 2, other words weigh 1. Matched 13 of 21 weight = 62.
// - structure: 4 of 5 section patterns found = 80.
// - impact: 3 metrics x 20 = 60.
// - overall: round(62 * 0.6 + 80 * 0.25 + 60 * 0.15) = round(66.2) = 66.
export const SAMPLE_RESULT = {
  overall: 66,
  breakdown: { match: 62, structure: 80, impact: 60 },
  matched: ["javascript", "react", "git", "rest", "testing", "agile", "communication"],
  missing: ["typescript", "docker", "graphql", "ci/cd"],
  strengths: [
    "Covers 7 of 11 key terms from the job.",
    "Has most of the standard sections.",
    "Uses numbers to show impact (3 found).",
    "Contact details are easy to find.",
  ],
  weaknesses: [
    "Named skills from the job are not mentioned: typescript, docker, graphql.",
    "Missing sections: projects.",
  ],
  keywordCount: 11,
};
