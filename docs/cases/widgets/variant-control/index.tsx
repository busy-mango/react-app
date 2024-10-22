import { useState } from 'react';

import { isNonEmptyArray } from '@busymango/is-esm';

import type {
  ControlAlign,
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
} from '@/components';
import { IFlex, IRadioGroup } from '@/components';

interface Props<T extends string = never> {
  variants?: T[];
  sizeable?: boolean;
  alignable?: boolean;
  statusable?: boolean;
  patternable?: boolean;
  children: (props: {
    size?: ControlUISize;
    align?: ControlAlign;
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
    alignable = false,
    sizeable = false,
    statusable = false,
    patternable = false,
    children,
  } = props;

  const [variant, setVariant] = useState(variants?.[0]);

  const [size, setSize] = useState<ControlUISize>('medium');

  const [align, setAlign] = useState<ControlAlign>('center');

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
      {alignable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(['start', 'center', 'end'] satisfies ControlAlign[]).map(
              (value) => ({ value })
            )}
            value={align}
            onChange={(value) => {
              setAlign(value as ControlAlign);
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
                'danger',
                'success',
                'warn',
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
      {children({ align, size, pattern, variant, status })}
    </IFlex>
  );
}
