import { create } from 'zustand';
import { addEdge, applyEdgeChanges, applyNodeChanges, MarkerType } from 'reactflow';
import { NODE_REGISTRY } from '../config/nodeRegistry';

export const usePipelineStore = create((set, get) => ({
  nodes: [],
  edges: [],
  reactFlowInstance: null,
  nodeIDs: {},
  analysisResult: null,
  setReactFlowInstance: (instance) => set({ reactFlowInstance: instance }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  clearAnalysisResult: () => set({ analysisResult: null }),
  getNodeID: (type) => {
    const nextIDs = { ...get().nodeIDs };
    nextIDs[type] = (nextIDs[type] ?? 0) + 1;
    set({ nodeIDs: nextIDs });
    return `${type}-${nextIDs[type]}`;
  },
  addNode: (type, position) => {
    const config = NODE_REGISTRY[type];
    const id = get().getNodeID(type);

    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id,
          type,
          position,
          data: {
            id,
            nodeType: type,
            ...config.defaults,
          },
        },
      ],
    }));
  },
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        state.edges
      ),
    })),
  updateNodeField: (id, key, value) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                [key]: value,
              },
            }
          : node
      ),
    })),
}));
