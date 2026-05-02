import { usePipelineStore } from '../store/usePipelineStore';
import { transformPipelineForAPI } from '../lib/transformPipelineForAPI';

export const SubmitButton = () => {
  const reactFlowInstance = usePipelineStore((state) => state.reactFlowInstance);
  const setAnalysisResult = usePipelineStore((state) => state.setAnalysisResult);

  const handleSubmit = async () => {
    if (!reactFlowInstance) {
      alert('The pipeline canvas is still loading. Please try again in a moment.');
      return;
    }

    try {
      const payload = transformPipelineForAPI(
        reactFlowInstance.getNodes(),
        reactFlowInstance.getEdges()
      );

      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      alert(`Unable to analyze pipeline: ${error.message}`);
    }
  };

  return (
    <button type="button" className="submit-button" onClick={handleSubmit}>
      Analyze Pipeline
    </button>
  );
};
