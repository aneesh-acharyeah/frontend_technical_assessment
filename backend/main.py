from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodePayload(BaseModel):
    id: str
    type: str | None = None
    data: dict[str, Any] = Field(default_factory=dict)


class EdgePayload(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: list[NodePayload]
    edges: list[EdgePayload]


def is_dag(nodes: list[NodePayload], edges: list[EdgePayload]) -> bool:
    node_ids = [node.id for node in nodes]
    adjacency = {node_id: [] for node_id in node_ids}

    for edge in edges:
        if edge.source == edge.target:
            return False
        if edge.source not in adjacency or edge.target not in adjacency:
            return False
        adjacency[edge.source].append(edge.target)

    visited: set[str] = set()
    in_stack: set[str] = set()

    for start_node in node_ids:
        if start_node in visited:
            continue

        stack: list[tuple[str, int]] = [(start_node, 0)]
        in_stack.add(start_node)

        while stack:
            current_node, neighbor_index = stack[-1]
            neighbors = adjacency[current_node]

            if neighbor_index >= len(neighbors):
                stack.pop()
                in_stack.discard(current_node)
                visited.add(current_node)
                continue

            next_node = neighbors[neighbor_index]
            stack[-1] = (current_node, neighbor_index + 1)

            if next_node in in_stack:
                return False

            if next_node not in visited:
                in_stack.add(next_node)
                stack.append((next_node, 0))

    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    return {
        'num_nodes': len(payload.nodes),
        'num_edges': len(payload.edges),
        'is_dag': is_dag(payload.nodes, payload.edges),
    }
