import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './ui/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import { AnalysisModal } from './components/AnalysisModal';

function App() {
  return (
    <div className="app-shell">
      <AnalysisModal />
      <header className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 pb-4 pt-4 md:px-6">
        <div className="topbar-shell">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="status-pill">Registry-driven pipeline workspace</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[hsl(var(--color-text-strong))] md:text-[2.75rem]">
                Pipeline Builder
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-[hsl(var(--color-text-soft))] md:text-[15px]">
                A compact workspace for assembling nodes, testing text variables, and validating DAG
                structure without losing the canvas below the fold.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center self-start md:self-center">
            <SubmitButton />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 px-4 pb-6 md:px-6 xl:grid-cols-[320px,minmax(0,1fr)] xl:items-start">
        <PipelineToolbar />
        <PipelineUI />
      </main>
    </div>
  );
}

export default App;
