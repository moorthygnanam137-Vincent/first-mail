import { useCallback, useState } from "react";
import { extractText } from "../lib/extractText.js";
import { scoreResume } from "../lib/scoreResume.js";
import { requestFitReport } from "../lib/fitReport.js";

// Custom hook: owns the status of one analysis run (idle, loading, done, error).
// Components call `run(file, jobDescription)` and read the state; they never touch the parsing code.
// The local scorecard is always produced; the server's written report is an extra that can fail alone.
export function useAnalysis() {
  const [state, setState] = useState({
    status: "idle",
    result: null,
    error: "",
    report: null,
    reportError: "",
    reportLoading: false,
  });

  const run = useCallback(async (file, jobDescription) => {
    setState({ status: "loading", result: null, error: "", report: null, reportError: "", reportLoading: false });
    let text;
    let result;
    try {
      text = await extractText(file);
      if (!text.trim()) {
        throw new Error("No text found. Is the PDF a scanned image?");
      }
      result = scoreResume(text, jobDescription);
      setState((s) => ({ ...s, status: "done", result, reportLoading: true }));
    } catch (err) {
      setState((s) => ({ ...s, status: "error", result: null, error: err.message }));
      return;
    }

    try {
      const { report } = await requestFitReport(text, jobDescription, result);
      setState((s) => ({ ...s, report, reportLoading: false }));
    } catch (err) {
      setState((s) => ({ ...s, reportError: err.message, reportLoading: false }));
    }
  }, []);

  return {
    ...state,
    isLoading: state.status === "loading",
    run,
  };
}
