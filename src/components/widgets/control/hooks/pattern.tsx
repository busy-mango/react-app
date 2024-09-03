import { useMemo } from 'react';

import type { ControlPattern } from '../models';

export const usePatternAssert = (pattern: ControlPattern = 'editable') =>
  useMemo(
    () => ({
      isEditable: pattern === 'editable',
      isReadOnly: pattern === 'readOnly',
      isDisabled: pattern === 'disabled',
      isReadPretty: pattern === 'readPretty',
    }),
    [pattern]
  );
