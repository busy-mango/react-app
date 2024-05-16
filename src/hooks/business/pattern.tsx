import { useMemo } from 'react';

import type { ControlUIPattern } from '@/components';

export const useControlPatternAssert = (
  pattern: ControlUIPattern = 'editable'
) =>
  useMemo(
    () => ({
      isEditable: pattern === 'editable',
      isReadOnly: pattern === 'readOnly',
      isDisabled: pattern === 'disabled',
      isReadPretty: pattern === 'readPretty',
    }),
    [pattern]
  );
