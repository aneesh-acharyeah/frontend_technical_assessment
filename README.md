# Pipeline Builder

A registry-driven pipeline builder built for the VectorShift frontend technical assessment.

The project improves the starter application in four areas:
- scalable node abstraction
- polished UI and workspace design
- dynamic Text node behavior
- frontend/backend pipeline analysis integration

## What It Does

Users can:
- drag node types into a React Flow canvas
- connect nodes into pipelines
- use a Text node with dynamic `{{variable}}` parsing
- see the Text node auto-resize as content grows
- submit the current graph for backend analysis
- view node count, edge count, and DAG status in a custom modal

## Tech Stack

- Frontend: React, React Flow, Zustand, Tailwind CSS
- Backend: FastAPI, Pydantic

## Run Locally

### 1. Start the backend

```powershell
cd C:\frontend_technical_assessment\backend
uvicorn main:app --reload
```

Backend runs on:
- `http://127.0.0.1:8000`

### 2. Start the frontend

```powershell
cd C:\frontend_technical_assessment\frontend
npm start
```

Frontend runs on:
- `http://localhost:3000`

## Key Features

### Registry-driven node system

The node system is driven by `frontend/src/config/nodeRegistry.js`.

Each node type defines:
- label and description
- category
- default values
- field definitions
- handle definitions
- layout settings
- theme accent

Most nodes render through one shared component:
- `frontend/src/components/BaseNode.jsx`

This makes adding a new node mostly a configuration task instead of creating a new duplicated component.

### Specialized Text node

The Text node is the only specialized node because it has dynamic behavior:
- parses valid `{{variable}}` placeholders
- creates input handles from extracted variables
- deduplicates repeated variables
- ignores invalid placeholders like `{{123}}`
- auto-resizes in width and height based on content

Relevant files:
- `frontend/src/components/TextNode.jsx`
- `frontend/src/hooks/useTextVariables.js`
- `frontend/src/hooks/useAutoResize.js`

### State management

Zustand is used as the single source of truth for:
- nodes
- edges
- React Flow instance
- analysis modal state

Relevant file:
- `frontend/src/store/usePipelineStore.js`

### Backend analysis

The frontend submits a cleaned pipeline payload through:
- `frontend/src/lib/transformPipelineForAPI.js`

The backend endpoint:
- accepts `{ nodes, edges }`
- returns `num_nodes`, `num_edges`, and `is_dag`
- checks DAG validity using iterative DFS

Relevant file:
- `backend/main.py`

## Project Structure

```text
frontend/
  public/
  src/
    components/
    config/
    flow/
    hooks/
    lib/
    store/
    ui/

backend/
  main.py
```

## Example Test Cases

### Simple valid pipeline

Nodes:
- Input
- LLM
- Output

Connections:
- Input -> LLM
- LLM -> Output

Expected result:
- Nodes: 3
- Edges: 2
- Is DAG: Yes

### Text node variables

Input:
```text
{{name}} {{email}}
```

Expected result:
- two input handles appear on the left side

Duplicate case:
```text
{{name}} {{name}}
```

Expected result:
- only one handle for `name`

Invalid case:
```text
{{123}}
```

Expected result:
- no variable handle

### Cycle detection

Example:
- Input -> LLM
- LLM -> Text
- Text -> Input

Expected result:
- Is DAG: No

## Design Notes

The UI was refactored to improve usability and presentation:
- cleaner top bar
- better visual hierarchy
- more usable canvas-first workspace
- sticky node library on larger screens
- token-based styling for consistent colors, spacing, radius, and shadows
- custom analysis modal instead of browser alerts

## Build Check

Production build was verified with:

```powershell
cd C:\frontend_technical_assessment\frontend
npm run build
```

## Submission Notes

Recommended demo flow for the screen recording:
1. Show a simple valid pipeline.
2. Show dynamic Text node handles.
3. Show Text node auto-resize.
4. Show a second pipeline using different node types like Condition or Merge.
5. Show a cycle case returning `Is DAG: No`.
