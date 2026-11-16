import Card from "./Card.jsx";
import FeedbackList from "./FeedbackList.jsx";
import ScoreBar from "./ScoreBar.jsx";
import TagList from "./TagList.jsx";

// The results panel. It only composes smaller components and receives the scoring result as a prop.
export default function ScoreCard({ result }) {
  const { overall, breakdown, matched, missing, strengths, weaknesses, keywordCount } = result;

  return (
    <section className="space-y-14">
      <div className="grid gap-10 md:grid-cols-[minmax(0,auto)_1fr] items-end border-t-2 border-ink pt-6">
        <p className="font-display font-bold leading-none tracking-tighter text-[clamp(7rem,18vw,13rem)] text-accent-ink [font-stretch:75%]">
          {overall}
        </p>
        <div className="space-y-5 pb-2">
          <p className="font-display text-xl font-semibold">Overall match</p>
          <ScoreBar label="Keyword match (60%)" value={breakdown.match} />
          <ScoreBar label="Structure (25%)" value={breakdown.structure} />
          <ScoreBar label="Impact (15%)" value={breakdown.impact} />
          <p className="text-sm text-muted">{keywordCount} key terms read from the job description.</p>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        <Card title="Found in your resume">
          <TagList items={matched} tone="match" />
        </Card>
        <Card title="Missing from your resume">
          <TagList items={missing} tone="miss" />
        </Card>
        <Card title="Strengths">
          <FeedbackList items={strengths} emptyText="No clear strengths found yet." />
        </Card>
        <Card title="Weaknesses">
          <FeedbackList items={weaknesses} emptyText="No major weaknesses found." />
        </Card>
      </div>
    </section>
  );
}
