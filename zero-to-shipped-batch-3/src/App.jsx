import { useState } from "react";
import Button from "./components/Button.jsx";
import DropZone from "./components/DropZone.jsx";
import History from "./components/History.jsx";
import JobDescriptionInput from "./components/JobDescriptionInput.jsx";
import ScoreCard from "./components/ScoreCard.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { useAnalysis } from "./hooks/useAnalysis.js";
import { useTheme } from "./hooks/useTheme.js";
import { MIN_JD_LENGTH } from "./lib/constants.js";
import { SAMPLE_RESULT } from "./lib/sampleResult.js";

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [inputError, setInputError] = useState("");
  const [showExample, setShowExample] = useState(false);
  const { status, result, error, isLoading, run, report, reportError, reportLoading } = useAnalysis();
  const { theme, toggle } = useTheme();

  // Check the inputs first, then hand the work to the hook.
  const handleCompare = () => {
    setInputError("");
    if (!file) return setInputError("Add your resume first.");
    if (jobDescription.trim().length < MIN_JD_LENGTH) {
      return setInputError("Paste a fuller job description (at least a few sentences).");
    }
    run(file, jobDescription);
  };

  const message = inputError || (status === "error" ? error : "");

  return (
    <main className="min-h-screen bg-page text-ink">
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-16">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <p className="font-display text-xl font-bold tracking-tight">Resume Parser</p>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        <header className="space-y-6 max-w-3xl">
          <h1 className="font-display font-bold text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-tight [font-stretch:75%]">
            See how well your resume fits the job
          </h1>
          <p className="text-lg leading-relaxed text-muted max-w-[65ch]">
            Drop in your resume (PDF or Word) and paste a job description. You get a scorecard showing
            what matches, what is missing, and where your resume is strong or weak.
          </p>
        </header>

        <section className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start">
          {/* Left: the inputs */}
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="font-display text-lg font-semibold">1. Your resume</p>
              <DropZone file={file} onFile={setFile} />
            </div>

            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

            <div className="flex flex-col items-start gap-3">
              <Button onClick={handleCompare} loading={isLoading}>
                Compare resume to job
              </Button>
              <p className="text-sm text-accent-ink min-h-[1.25rem]">{message}</p>
            </div>
          </div>

          {/* Right: the results. Nothing is shown here until a run starts or the example is requested. */}
          <div className="space-y-6 md:sticky md:top-8">
            <p className="font-display text-lg font-semibold">2. Your results</p>

            {status === "loading" && (
              <p className="text-muted">Reading your resume and scoring it…</p>
            )}

            {status === "done" && result && (
              <>
                <ScoreCard result={result} />
                <div className="space-y-3 border-t-2 border-ink pt-6">
                  <p className="font-display text-lg font-semibold">Written fit report</p>
                  {reportLoading && <p className="text-muted">Writing your report…</p>}
                  {reportError && <p className="text-accent-ink">{reportError}</p>}
                  {report && (
                    <pre className="whitespace-pre-wrap font-sans leading-relaxed text-ink">{report}</pre>
                  )}
                </div>
              </>
            )}

            {status !== "loading" && status !== "done" && !showExample && (
              <p className="text-muted">Add your resume and a job description, then compare them to see your scorecard here.</p>
            )}

            {status !== "done" && showExample && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-widest text-accent">Example report</p>
                  <p className="text-sm text-muted">This is a sample, not a real resume.</p>
                </div>
                <ScoreCard result={SAMPLE_RESULT} />
              </div>
            )}

            {status !== "loading" && status !== "done" && (
              <Button onClick={() => setShowExample((on) => !on)}>
                {showExample ? "Hide example report" : "Show an example report"}
              </Button>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <p className="font-display text-lg font-semibold">Recent runs</p>
          <History refreshKey={report} />
        </section>
      </div>
    </main>
  );
}
