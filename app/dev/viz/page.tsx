// Local-only "Storybook" for visualization primitives.
// Built in Phase 1 — Receipt, ScopeTree, CBSChart, DeliverableMatrix, SteelForm.

export default function DevVizPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 space-y-12">
      <div className="flex items-center gap-3">
        <span className="label-spec text-[var(--color-copper)]">§DEV</span>
        <span className="hairline-l h-3" />
        <span className="label-spec">Visualization primitives</span>
      </div>
      <h1 className="text-display-lg text-steel-100 font-display">
        Design language sandbox
      </h1>
      <p className="text-steel-400 max-w-2xl text-sm font-spec">
        // ReceiptPanel · ScopeTree · CBSChart · DeliverableMatrix · SteelForm
        <br />// populated in Phase 1
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
        <DemoCard title="Brushed steel">
          <div className="material-steel h-32 rounded-[var(--radius-card)]" />
        </DemoCard>
        <DemoCard title="Light mill finish">
          <div className="material-steel-light h-32 rounded-[var(--radius-card)]" />
        </DemoCard>
        <DemoCard title="Glass panel">
          <div className="material-glass h-32 rounded-[var(--radius-card)] flex items-center justify-center">
            <span className="label-spec text-steel-200">backdrop-blur(24px)</span>
          </div>
        </DemoCard>
        <DemoCard title="Chrome edge">
          <div className="material-glass-strong chrome-edge h-32 rounded-[var(--radius-card)] flex items-center justify-center">
            <span className="label-spec text-steel-200">gradient-border mask</span>
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="label-spec">{title}</p>
      {children}
    </div>
  );
}
