import { useMemo } from 'react';
import type { Target } from 'framer-motion';

import { assign } from '@busymango/utils';
import type { Placement } from '@floating-ui/react';

const animate: Target = {
  opacity: 1,
  translateX: 0,
  translateY: 0,
};

type FloatingMotionOpts = {
  placement: Placement;
};

export const useFloatingMotion = ({ placement }: FloatingMotionOpts) => {
  return useMemo(() => {
    const initial = assign<Target>(
      { opacity: 0 },
      (() => {
        if (placement.startsWith('top')) {
          return { translateY: 5 };
        }
        if (placement.startsWith('left')) {
          return { translateX: 5 };
        }
        if (placement.startsWith('right')) {
          return { translateX: -5 };
        }
        if (placement.startsWith('bottom')) {
          return { translateY: -5 };
        }
        return {};
      })()
    );
    return { animate, initial, exit: initial };
  }, [placement]);
};
