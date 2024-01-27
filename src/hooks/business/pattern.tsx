import { useMemo } from 'react';

import type { ControlPatternType } from '@/models';

export function useControlPatternAssert(
  pattern: ControlPatternType = 'editable'
) {
  return useMemo(
    () => ({
      isEditable: pattern === 'editable',
      isReadOnly: pattern === 'readOnly',
      isDisabled: pattern === 'disabled',
      isReadPretty: pattern === 'readPretty',
    }),
    [pattern]
  );
}
