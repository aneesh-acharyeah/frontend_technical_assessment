# Pipeline Builder Architecture

All node types render through a single `BaseNode` component driven by `NODE_REGISTRY`. Adding a new node type requires only a new config entry, with no new React component and no copy-paste layout work. This applies the Registry + Strategy pattern to the UI layer by keeping node behavior declarative and centralized.

`TextNode` is the only specialized component because it has unique dynamic behavior: it derives input handles from template variables and resizes as content changes. Even there, it still delegates the visual shell to `BaseNode`, so the styling and structural system stay consistent across every node.
