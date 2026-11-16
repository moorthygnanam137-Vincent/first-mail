import { useEffect, useState } from "react";
import { fetchFitHistory } from "../lib/fitReport.js";

// Lists earlier saved runs in a table, newest first. Reloads whenever `refreshKey` changes,
// so a new run appears once the server has saved it.
// Only scores and counts are shown; the written report stays out of the table.
export default function History({ refreshKey }) {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchFitHistory()
      .then(({ reports }) => {
        if (!cancelled) {
          setReports(reports);
          setStatus("done");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (status === "loading") return <p className="text-muted">Loading your history…</p>;
  if (status === "error") return <p className="text-accent-ink">{error}</p>;
  if (reports.length === 0) return <p className="text-muted">No saved runs yet. Your runs will appear here.</p>;

  return (
    <div className="overflow-x-auto border-t-2 border-ink">
      <table className="w-full text-left text-sm">
        <thead className="border-b-2 border-ink font-display uppercase tracking-wider text-muted">
          <tr>
            <th className="py-3 pr-4 font-semibold">Date</th>
            <th className="py-3 pr-4 font-semibold">Overall</th>
            <th className="py-3 pr-4 font-semibold">Keyword</th>
            <th className="py-3 pr-4 font-semibold">Structure</th>
            <th className="py-3 pr-4 font-semibold">Impact</th>
            <th className="py-3 pr-4 font-semibold">Matched</th>
            <th className="py-3 pr-4 font-semibold">Missing</th>
            <th className="py-3 font-semibold">Changes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink">
          {reports.map((r) => (
            <tr key={r._id}>
              <td className="py-3 pr-4 whitespace-nowrap text-muted">
                <time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleString()}</time>
              </td>
              <td className="py-3 pr-4 font-display text-xl font-bold text-accent-ink">{r.overallScore}</td>
              <td className="py-3 pr-4">{r.breakdown.match}</td>
              <td className="py-3 pr-4">{r.breakdown.structure}</td>
              <td className="py-3 pr-4">{r.breakdown.impact}</td>
              <td className="py-3 pr-4">{r.matchedTerms.length}</td>
              <td className="py-3 pr-4">{r.missingTerms.length}</td>
              <td className="py-3">{r.weaknesses.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
