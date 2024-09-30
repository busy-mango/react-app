import { useRef, useState } from 'react';

import { useResizeObserver } from '@/hooks';

import { iTextSize } from '../helpers';

export const useWidth = ({
  width,
  shadow,
  target,
  isReadPretty,
}: {
  target: React.RefObject<HTMLInputElement>;
  shadow: React.RefObject<HTMLInputElement>;
  width?: React.CSSProperties['width'];
  isReadPretty?: boolean;
}) => {
  const record = useRef<number | null>(null);

  const [auto, setAuto] = useState<number>();

  const iWidth = width ?? (isReadPretty ? 'auto' : 'default');

  const enabled = iWidth === 'auto';

  useResizeObserver(
    shadow,
    () => {
      const { current: iInput } = target;
      const { current: iShadow } = shadow;

      if (iInput && iShadow) {
        const width = iTextSize(iInput, iShadow);
        if (record.current !== width) setAuto(width);
        if (record.current !== width) record.current = width;
      }
    },
    { enabled }
  );

  return enabled ? auto : iWidth;
};
