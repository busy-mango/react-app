import type { Target } from 'framer-motion';

import { capitalize } from '@busymango/utils';
import type { Padding, Placement } from '@floating-ui/react';
import {
  arrow,
  autoPlacement,
  hide,
  offset,
  shift,
  size,
} from '@floating-ui/react';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

import type { ApplyFloatingStyle, IPopoverProps } from '../models';

const GAP = 2;

export const ARROW_HEIGHT = 8;

export const ARROW_RADIUS = 2;

const OFFSET = ARROW_HEIGHT + GAP;

type MiddlewareOpts = {
  padding?: Padding;
  root?: ReactTargetType | undefined;
  iArrow: React.RefObject<SVGSVGElement>;
  onApplyFloatingStyle?: ApplyFloatingStyle;
};

const isVertical = (placement: Placement) => {
  switch (placement) {
    case 'top':
    case 'top-end':
    case 'top-start':
    case 'bottom':
    case 'bottom-end':
    case 'bottom-start':
      return true;
    case 'left':
    case 'left-end':
    case 'left-start':
    case 'right':
    case 'right-end':
    case 'right-start':
      return false;
    default:
      return false;
  }
};

export const iFill = (variant?: IPopoverProps['variant']) => {
  switch (variant) {
    case 'tooltip':
      return 'var(--bg-color-tip)';
    case 'confirm':
      return 'var(--bg-color-tip)';
    default:
      return 'var(--fill-color-warp)';
  }
};

export const iFloatingMaxSize = (
  params: Parameters<ApplyFloatingStyle>[0],
  root?: HTMLElement | null,
  mode: 'width' | 'height' = 'width'
) => {
  const name = capitalize(mode);
  const { elements, rects, placement } = params;

  const referenceSize = rects.reference[mode];
  const availableSize = params[`available${name}`];
  const rootSize = root?.[`client${name}`] ?? Infinity;
  const scrollSize = elements.floating[`scroll${name}`];
  const effectiveSize = Math.max(availableSize, referenceSize);

  const isMainAxis = isVertical(placement)
    ? mode === 'height'
    : mode === 'width';

  if (effectiveSize > 0) {
    if (!isMainAxis) {
      return Math.min(rootSize, effectiveSize);
    }
    if (isMainAxis) {
      if (effectiveSize < scrollSize) {
        return effectiveSize;
      }
    }
  }
  return Math.max(rootSize, effectiveSize);
};

export const middlewares = ({
  root,
  iArrow,
  padding,
  onApplyFloatingStyle,
}: MiddlewareOpts) => [
  offset({ mainAxis: OFFSET }),
  shift({ elementContext: 'reference' }),
  autoPlacement({
    padding,
    crossAxis: true,
    elementContext: 'reference',
  }),
  size({
    padding,
    elementContext: 'reference',
    apply(params) {
      const element = iFindElement(root);
      Object.assign(
        params.elements.floating.style,
        onApplyFloatingStyle?.(params) ?? {
          maxWidth: iFloatingMaxSize(params, element, 'width') + 'px',
          maxHeight: iFloatingMaxSize(params, element, 'height') + 'px',
        }
      );
    },
  }),
  arrow({ element: iArrow, padding }),
  hide({ strategy: 'escaped', padding, elementContext: 'reference' }),
];

export const iFloatingMotion = (floatingStyles: React.CSSProperties) => {
  const { left, top, ...style } = floatingStyles;
  const initial: Target = { opacity: 0, left, top, scale: 0 };
  return {
    style,
    initial,
    exit: initial,
    transition: { type: 'keyframes' },
    animate: { top, left, opacity: 1, scale: 1 },
  };
};
