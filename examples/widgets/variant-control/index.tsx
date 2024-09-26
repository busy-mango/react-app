import { useState } from 'react';

import { isNonEmptyArray } from '@busymango/is-esm';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
} from '@/components';
import { IFlex, IRadioGroup } from '@/components';

interface Props<T extends string = never> {
  variants?: T[];
  sizeable?: boolean;
  statusable?: boolean;
  patternable?: boolean;
  children: (props: {
    size?: ControlUISize;
    status?: ControlUIStatus;
    pattern?: ControlPattern;
    variant?: T;
  }) => React.ReactNode;
}

export function VariantControl<T extends string = never>(
  props: Props<T>
): React.ReactNode {
  const {
    variants,
    sizeable = false,
    statusable = false,
    patternable = false,
    children,
  } = props;

  const [variant, setVariant] = useState(variants?.[0]);

  const [size, setSize] = useState<ControlUISize>('medium');

  const [status, setStatus] = useState<ControlUIStatus>('success');

  const [pattern, setPattern] = useState<ControlPattern>('editable');

  return (
    <IFlex vertical gap={16}>
      {sizeable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(['mini', 'medium', 'huge'] satisfies ControlUISize[]).map(
              (value) => ({ value })
            )}
            value={size}
            onChange={(value) => {
              setSize(value as ControlUISize);
            }}
          />
        </IFlex>
      )}
      {isNonEmptyArray(variants) && (
        <IFlex gap={8}>
          <IRadioGroup
            options={variants.map((value) => ({ value }))}
            value={variant}
            onChange={(value) => {
              setVariant(value as T);
            }}
          />
        </IFlex>
      )}
      {statusable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              [
                'error',
                'success',
                'warning',
                'vaildating',
              ] satisfies ControlUIStatus[]
            ).map((value) => ({ value }))}
            value={status}
            onChange={(value) => {
              setStatus(value as ControlUIStatus);
            }}
          />
        </IFlex>
      )}
      {patternable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              [
                'editable',
                'disabled',
                'readOnly',
                'readPretty',
              ] satisfies ControlPattern[]
            ).map((value) => ({ value }))}
            value={pattern}
            onChange={(value) => {
              setPattern(value as ControlPattern);
            }}
          />
        </IFlex>
      )}
      {children({ size, pattern, variant, status })}
    </IFlex>
  );
}
