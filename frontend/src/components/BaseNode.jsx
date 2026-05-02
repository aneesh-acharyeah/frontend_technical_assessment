import { memo, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { usePipelineStore } from '../store/usePipelineStore';
import { NODE_REGISTRY } from '../config/nodeRegistry';

const POSITION_BY_SIDE = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const getHandleOffsets = (handles = []) =>
  handles.map((handle, index) => ({
    ...handle,
    offset: `${((index + 1) / (handles.length + 1)) * 100}%`,
  }));

const FieldControl = ({ field, value, onChange }) => {
  switch (field.control) {
    case 'select':
      return (
        <select className="node-select" value={value} onChange={(event) => onChange(event.target.value)}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case 'number':
      return (
        <input
          className="node-input"
          type="number"
          value={value}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          onChange={(event) =>
            onChange(event.target.value === '' ? '' : Number(event.target.value))
          }
        />
      );
    case 'toggle':
      return (
        <label className="node-toggle">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
          <span>{value ? 'On' : 'Off'}</span>
        </label>
      );
    case 'textarea':
      return (
        <textarea
          ref={field.inputRef}
          rows={field.rows ?? 4}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={field.className ?? 'node-textarea'}
        />
      );
    default:
      return (
        <input
          className="node-input"
          type={field.control === 'text' ? 'text' : field.control}
          value={value}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
};

export const BaseNode = memo(({ id, data, type, fields, handles, containerStyle, children }) => {
  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const config = NODE_REGISTRY[type];

  const resolvedHandles = useMemo(
    () => ({
      inputs: getHandleOffsets(handles?.inputs ?? config.handles.inputs),
      outputs: getHandleOffsets(handles?.outputs ?? config.handles.outputs),
    }),
    [config.handles.inputs, config.handles.outputs, handles]
  );

  const resolvedFields = fields ?? config.fields;

  return (
    <div
      className="node-shell"
      style={{
        '--node-accent': config.theme.accent,
        minWidth: config.layout.minWidth,
        minHeight: config.layout.minHeight,
        ...containerStyle,
      }}
    >
      {resolvedHandles.inputs.map((handle) => (
        <Handle
          key={`${id}-${handle.key}`}
          id={`${id}-${handle.key}`}
          type="target"
          position={POSITION_BY_SIDE[handle.side]}
          className="node-handle"
          style={handle.side === 'left' || handle.side === 'right' ? { top: handle.offset } : undefined}
        />
      ))}

      <div className="node-header">
        <p className="node-kicker">{config.category}</p>
        <h3 className="node-title">{config.label}</h3>
        <p className="node-description">{config.description}</p>
      </div>

      <div className="node-fields">
        {resolvedFields.map((field) => {
          const value = data?.[field.key] ?? config.defaults?.[field.key] ?? '';
          return (
            <label key={field.key} className="node-field">
              <span className="node-field-label">{field.label}</span>
              <FieldControl
                field={field}
                value={value}
                onChange={(nextValue) => updateNodeField(id, field.key, nextValue)}
              />
            </label>
          );
        })}
      </div>

      {children}

      {resolvedHandles.outputs.map((handle) => (
        <Handle
          key={`${id}-${handle.key}`}
          id={`${id}-${handle.key}`}
          type="source"
          position={POSITION_BY_SIDE[handle.side]}
          className="node-handle"
          style={handle.side === 'left' || handle.side === 'right' ? { top: handle.offset } : undefined}
        />
      ))}
    </div>
  );
});
