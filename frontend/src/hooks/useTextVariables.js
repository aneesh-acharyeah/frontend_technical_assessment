import { useMemo } from 'react';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

export const useTextVariables = (text) =>
  useMemo(() => {
    const source = text ?? '';
    const seen = new Set();
    const variables = [];

    for (const match of source.matchAll(VARIABLE_REGEX)) {
      const variableName = match[1];

      if (!seen.has(variableName)) {
        seen.add(variableName);
        variables.push(variableName);
      }
    }

    return variables;
  }, [text]);
