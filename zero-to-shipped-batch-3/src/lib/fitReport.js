// Load the most recent saved fit reports, newest first.
// Resolves to { reports }; throws an Error with a readable message otherwise.
export async function fetchFitHistory() {
  const res = await fetch("/api/fit-reports");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `The report server returned ${res.status}.`);
  }
  return data;
}

// Ask the Express server for a written fit report. The server holds the labd key;
// the browser sends the resume text, the job description and the scorecard, which the
// server saves for the history list.
// Resolves to { report, percentLeft }; throws an Error with a readable message otherwise.
export async function requestFitReport(resumeText, jobDescription, scores) {
  const res = await fetch("/api/fit-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume: resumeText, jobDescription, scores }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `The report server returned ${res.status}.`);
  }
  return data;
}
