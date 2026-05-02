import { memo, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { NODE_REGISTRY } from '../config/nodeRegistry';
import { useAutoResize } from '../hooks/useAutoResize';
import { useTextVariables } from '../hooks/useTextVariables';

export const TextNode = memo(({ id, data, type = 'text' }) => {
  const config = NODE_REGISTRY[type];
  const text = data?.text ?? config.defaults.text;
  const variables = useTextVariables(text);
  const { textareaRef, measurerRef, dimensions } = useAutoResize(text);

  const handles = useMemo(
    () => ({
      inputs: variables.map((variableName) => ({
        key: variableName,
        label: variableName,
        side: 'left',
      })),
      outputs: config.handles.outputs,
    }),
    [config.handles.outputs, variables]
  );

  const fields = useMemo(
    () => [
      {
        ...config.fields[0],
        inputRef: textareaRef,
        className: 'node-textarea',
      },
    ],
    [config.fields, textareaRef]
  );

  return (
    <BaseNode id={id} data={data} type={type} fields={fields} handles={handles} containerStyle={dimensions}>
      <span ref={measurerRef} className="node-text-measurer" aria-hidden="true" />
    </BaseNode>
  );
});
