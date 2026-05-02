import { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { usePipelineStore } from '../store/usePipelineStore';
import { nodeTypes } from '../flow/nodeTypes';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setReactFlowInstance: state.setReactFlowInstance,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect, setReactFlowInstance } =
    usePipelineStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const wrapper = reactFlowWrapper.current;
      const instance = usePipelineStore.getState().reactFlowInstance;

      if (!wrapper || !instance) {
        return;
      }

      const rawPayload = event?.dataTransfer?.getData('application/reactflow');

      if (!rawPayload) {
        return;
      }

      const { nodeType } = JSON.parse(rawPayload);

      if (!nodeType) {
        return;
      }

      const bounds = wrapper.getBoundingClientRect();
      const position = instance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addNode(nodeType, position);
    },
    [addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <section className="panel-shell canvas-panel overflow-hidden p-0">
      <div className="canvas-panel-header">
        <div>
          <p className="section-kicker">Workspace</p>
          <h2 className="mt-1 text-xl font-semibold text-[hsl(var(--color-text-strong))]">Canvas</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-[hsl(var(--color-text-soft))]">
          Drop nodes directly into this area, connect handles, and inspect the graph structure with the
          analyzer.
        </p>
      </div>

      <div ref={reactFlowWrapper} className="h-[68vh] min-h-[620px] w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          fitView
        >
          <Background color="hsl(var(--color-grid))" gap={gridSize} />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
    </section>
  );
};
