export const transformPipelineForAPI = (nodes, edges) => ({
  nodes: nodes.map(({ id, type, data }) => ({
    id,
    type,
    data,
  })),
  edges: edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
  })),
});
