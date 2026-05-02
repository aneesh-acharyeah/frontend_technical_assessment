import { NODE_REGISTRY } from '../config/nodeRegistry';
import { DraggableNode } from './DraggableNode';

const toolbarNodes = Object.values(NODE_REGISTRY);

export const PipelineToolbar = () => (
  <aside className="panel-shell toolbar-panel">
    <div className="mb-5 flex flex-col gap-2">
      <p className="section-kicker">Node Library</p>
      <h2 className="text-xl font-semibold text-[hsl(var(--color-text-strong))]">Drag nodes into the canvas</h2>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
      {toolbarNodes.map((node) => (
        <DraggableNode
          key={node.type}
          type={node.type}
          label={node.label}
          category={node.category}
          accent={node.theme.accent}
        />
      ))}
    </div>
  </aside>
);
