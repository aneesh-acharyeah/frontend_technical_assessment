import { usePipelineStore } from '../store/usePipelineStore';

export const AnalysisModal = () => {
  const analysisResult = usePipelineStore((state) => state.analysisResult);
  const clearAnalysisResult = usePipelineStore((state) => state.clearAnalysisResult);

  if (!analysisResult) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={clearAnalysisResult}>
      <div
        className="modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="analysis-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="section-kicker">Pipeline Analysis</p>
            <h2 id="analysis-modal-title" className="text-2xl font-semibold text-[hsl(var(--color-text-strong))]">
              Graph inspection complete
            </h2>
            <p className="max-w-md text-sm leading-6 text-[hsl(var(--color-text-soft))]">
              Here’s the parsed structure of your current pipeline.
            </p>
          </div>

          <button type="button" className="modal-close" onClick={clearAnalysisResult} aria-label="Close analysis modal">
            Close
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="result-card">
            <span className="result-card-label">Nodes</span>
            <strong className="result-card-value">{analysisResult.num_nodes}</strong>
          </div>
          <div className="result-card">
            <span className="result-card-label">Edges</span>
            <strong className="result-card-value">{analysisResult.num_edges}</strong>
          </div>
          <div className="result-card">
            <span className="result-card-label">Is DAG</span>
            <strong className="result-card-value">{analysisResult.is_dag ? 'Yes' : 'No'}</strong>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[hsl(var(--color-text-soft))]">
          {analysisResult.is_dag
            ? 'This pipeline is acyclic, so its execution order can be resolved safely.'
            : 'This pipeline contains a cycle or invalid loop, so it is not a DAG.'}
        </div>

        <div className="flex justify-end">
          <button type="button" className="submit-button" onClick={clearAnalysisResult}>
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
};
