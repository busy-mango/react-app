import { useMemo } from 'react';

import type { ControlPattern } from '../models';

export const useControlPatternAssert = (pattern: ControlPattern = 'editable') =>
  useMemo(
    () => ({
      isEditable: pattern === 'editable',
      isReadOnly: pattern === 'readOnly',
      isDisabled: pattern === 'disabled',
      isReadPretty: pattern === 'readPretty',
    }),
    [pattern]
  );
