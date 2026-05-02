export const DraggableNode = ({ type, label, category, accent }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.cursor = 'grabbing';
  };

  return (
    <div
      className="toolbar-chip"
      style={{ '--toolbar-accent': accent }}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="toolbar-chip-label">{label}</span>
          <span className="toolbar-chip-meta">{category}</span>
        </div>
        <span className="toolbar-chip-dot" />
      </div>
      <p className="toolbar-chip-hint">Drag into canvas</p>
    </div>
  );
};
