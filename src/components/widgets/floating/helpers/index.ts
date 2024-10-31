import type { Target } from 'framer-motion';

import type { ReferenceType } from '@floating-ui/react';

import { container } from '@/init';
import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

const offsetRect = (root?: DOMRect, reference?: DOMRect) => {
  if (root && reference) {
    return {
      top: reference.top - root.top + reference.height,
      left: reference.left - root.left,
    };
  }
};

export const iFloatingMotion = ({
  root = container,
  reference,
  floating,
  style,
  isTop,
}: {
  isTop?: boolean;
  root?: ReactTargetType;
  style?: React.CSSProperties;
  floating: React.MutableRefObject<HTMLElement | null>;
  reference: React.MutableRefObject<ReferenceType | null>;
}) => {
  const { left, top, ...others } = style ?? {};

  const element = iFindElement(root);

  const animate: Target = {
    top,
    left,
    opacity: 1,
  };

  console.log(top, left);

  const initial: Target = {
    top,
    left,
    opacity: 0.36,
    // ...offsetRect(
    //   element!.getBoundingClientRect(),
    //   reference.current?.getBoundingClientRect() as DOMRect
    // ),
  };

  return {
    animate,
    initial,
    style: others,
    exit: initial,
  };
};
