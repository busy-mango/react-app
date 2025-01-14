import type { FieldMeta } from '@tanstack/react-form';
import { isNonEmptyArray } from '@tanstack/react-form';

import type { IFieldCellProps } from '@/components';

export const iTanstackFieldCellAdapter = ({
  isValidating,
  isTouched,
  errors,
}: FieldMeta): Pick<IFieldCellProps, 'status' | 'feedback'> => {
  return {
    status: isValidating
      ? 'vaildating'
      : isNonEmptyArray(errors)
        ? 'danger'
        : 'success',
    feedback: isTouched && errors?.[0]?.toString(),
  };
};
