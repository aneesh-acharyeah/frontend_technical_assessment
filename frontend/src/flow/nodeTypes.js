import React from 'react';
import { BaseNode } from '../components/BaseNode';
import { TextNode } from '../components/TextNode';
import { NODE_REGISTRY } from '../config/nodeRegistry';

export const nodeTypes = Object.fromEntries(
  Object.keys(NODE_REGISTRY).map((type) => [
    type,
    type === 'text' ? TextNode : (props) => <BaseNode {...props} type={type} />,
  ])
);
