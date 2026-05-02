export const NODE_REGISTRY = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    description: 'Entry point for raw pipeline data.',
    category: 'Sources',
    theme: { accent: 'var(--node-input-accent)' },
    defaults: {
      inputName: 'input_1',
      inputType: 'Text',
    },
    layout: { minWidth: 260, minHeight: 180 },
    handles: {
      inputs: [],
      outputs: [{ key: 'value', label: 'Value', side: 'right' }],
    },
    fields: [
      { key: 'inputName', label: 'Name', control: 'text', placeholder: 'customer_prompt' },
      {
        key: 'inputType',
        label: 'Type',
        control: 'select',
        options: ['Text', 'File'],
      },
    ],
  },
  llm: {
    type: 'llm',
    label: 'LLM',
    description: 'Prompt an LLM with system and user context.',
    category: 'AI',
    theme: { accent: 'var(--node-llm-accent)' },
    defaults: {
      provider: 'OpenAI',
      model: 'gpt-4.1-mini',
    },
    layout: { minWidth: 280, minHeight: 190 },
    handles: {
      inputs: [
        { key: 'system', label: 'System', side: 'left' },
        { key: 'prompt', label: 'Prompt', side: 'left' },
      ],
      outputs: [{ key: 'response', label: 'Response', side: 'right' }],
    },
    fields: [
      {
        key: 'provider',
        label: 'Provider',
        control: 'select',
        options: ['OpenAI', 'Anthropic', 'Gemini'],
      },
      { key: 'model', label: 'Model', control: 'text', placeholder: 'gpt-4.1-mini' },
    ],
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    description: 'Terminal sink for pipeline results.',
    category: 'Sinks',
    theme: { accent: 'var(--node-output-accent)' },
    defaults: {
      outputName: 'output_1',
      outputType: 'Text',
    },
    layout: { minWidth: 260, minHeight: 180 },
    handles: {
      inputs: [{ key: 'value', label: 'Value', side: 'left' }],
      outputs: [],
    },
    fields: [
      { key: 'outputName', label: 'Name', control: 'text', placeholder: 'final_answer' },
      {
        key: 'outputType',
        label: 'Type',
        control: 'select',
        options: ['Text', 'Image'],
      },
    ],
  },
  text: {
    type: 'text',
    label: 'Text',
    description: 'Template text with variable-driven input handles.',
    category: 'Transform',
    theme: { accent: 'var(--node-text-accent)' },
    defaults: {
      text: '{{input}}',
    },
    layout: { minWidth: 280, minHeight: 200 },
    handles: {
      inputs: [],
      outputs: [{ key: 'output', label: 'Output', side: 'right' }],
    },
    fields: [
      { key: 'text', label: 'Text', control: 'textarea', rows: 4, placeholder: 'Hello {{name}}' },
    ],
  },
  apiRequest: {
    type: 'apiRequest',
    label: 'API Request',
    description: 'Call an external endpoint.',
    category: 'Integration',
    theme: { accent: 'var(--node-api-accent)' },
    defaults: {
      url: 'https://api.example.com',
      method: 'GET',
      requiresAuth: false,
    },
    layout: { minWidth: 300, minHeight: 220 },
    handles: {
      inputs: [
        { key: 'trigger', label: 'Trigger', side: 'left' },
        { key: 'body', label: 'Body', side: 'left' },
      ],
      outputs: [
        { key: 'response', label: 'Response', side: 'right' },
        { key: 'error', label: 'Error', side: 'right' },
      ],
    },
    fields: [
      { key: 'url', label: 'URL', control: 'text', placeholder: 'https://api.example.com' },
      {
        key: 'method',
        label: 'Method',
        control: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      { key: 'requiresAuth', label: 'Auth', control: 'toggle' },
    ],
  },
  condition: {
    type: 'condition',
    label: 'Condition',
    description: 'Branch based on a comparison.',
    category: 'Logic',
    theme: { accent: 'var(--node-condition-accent)' },
    defaults: {
      operator: 'equals',
      compareValue: '',
    },
    layout: { minWidth: 280, minHeight: 210 },
    handles: {
      inputs: [{ key: 'value', label: 'Value', side: 'left' }],
      outputs: [
        { key: 'true', label: 'True', side: 'right' },
        { key: 'false', label: 'False', side: 'right' },
      ],
    },
    fields: [
      {
        key: 'operator',
        label: 'Operator',
        control: 'select',
        options: ['equals', 'contains', 'gt', 'lt'],
      },
      { key: 'compareValue', label: 'Compare', control: 'text', placeholder: 'premium' },
    ],
  },
  merge: {
    type: 'merge',
    label: 'Merge',
    description: 'Join multiple streams into one.',
    category: 'Transform',
    theme: { accent: 'var(--node-merge-accent)' },
    defaults: {
      strategy: 'append',
    },
    layout: { minWidth: 260, minHeight: 210 },
    handles: {
      inputs: [
        { key: 'a', label: 'A', side: 'left' },
        { key: 'b', label: 'B', side: 'left' },
        { key: 'c', label: 'C', side: 'left' },
      ],
      outputs: [{ key: 'merged', label: 'Merged', side: 'right' }],
    },
    fields: [
      {
        key: 'strategy',
        label: 'Strategy',
        control: 'select',
        options: ['append', 'zip', 'latest'],
      },
    ],
  },
  delay: {
    type: 'delay',
    label: 'Delay',
    description: 'Pause an item before continuing.',
    category: 'Control',
    theme: { accent: 'var(--node-delay-accent)' },
    defaults: {
      amount: 5,
      unit: 'seconds',
    },
    layout: { minWidth: 260, minHeight: 210 },
    handles: {
      inputs: [{ key: 'input', label: 'Input', side: 'left' }],
      outputs: [{ key: 'delayed', label: 'Delayed', side: 'right' }],
    },
    fields: [
      { key: 'amount', label: 'Amount', control: 'number', min: 0, step: 1 },
      { key: 'unit', label: 'Unit', control: 'select', options: ['seconds', 'minutes', 'hours'] },
    ],
  },
  notification: {
    type: 'notification',
    label: 'Notification',
    description: 'Send a user-facing message.',
    category: 'Actions',
    theme: { accent: 'var(--node-notification-accent)' },
    defaults: {
      channel: 'Email',
      recipient: '',
      urgent: false,
    },
    layout: { minWidth: 300, minHeight: 230 },
    handles: {
      inputs: [
        { key: 'message', label: 'Message', side: 'left' },
        { key: 'metadata', label: 'Metadata', side: 'left' },
      ],
      outputs: [{ key: 'sent', label: 'Sent', side: 'right' }],
    },
    fields: [
      { key: 'channel', label: 'Channel', control: 'select', options: ['Email', 'Slack', 'SMS'] },
      { key: 'recipient', label: 'Recipient', control: 'text', placeholder: 'team@company.com' },
      { key: 'urgent', label: 'Urgent', control: 'toggle' },
    ],
  },
};
