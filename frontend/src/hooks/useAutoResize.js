import { useLayoutEffect, useRef, useState } from 'react';

const MIN_WIDTH = 280;
const MAX_WIDTH = 520;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 420;
const FIELD_PADDING_X = 110;
const FIELD_CHROME_Y = 128;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const useAutoResize = (value) => {
  const textareaRef = useRef(null);
  const measurerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
  });

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    const measurer = measurerRef.current;

    if (!textarea || !measurer) {
      return;
    }

    textarea.style.height = 'auto';
    const contentHeight = textarea.scrollHeight;
    textarea.style.height = `${contentHeight}px`;

    const lines = (value ?? '').split('\n');
    const longestLine = lines.reduce(
      (currentLongest, line) => (line.length > currentLongest.length ? line : currentLongest),
      ''
    );

    measurer.textContent = longestLine || ' ';
    const measuredWidth = measurer.offsetWidth + FIELD_PADDING_X;

    setDimensions({
      width: clamp(measuredWidth, MIN_WIDTH, MAX_WIDTH),
      minHeight: clamp(contentHeight + FIELD_CHROME_Y, MIN_HEIGHT, MAX_HEIGHT),
    });
  }, [value]);

  return { textareaRef, measurerRef, dimensions };
};
