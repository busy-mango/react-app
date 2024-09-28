import { capitalize } from '@busymango/utils';
import type { Padding } from '@floating-ui/react';
import {
  arrow,
  autoPlacement,
  hide,
  offset,
  shift,
  size,
} from '@floating-ui/react';

import { size2px } from '@/utils';

import type { ApplyFloatingStyle, IPopoverProps } from '../models';

const GAP = 2;

export const ARROW_HEIGHT = 8;

export const ARROW_RADIUS = 2;

const OFFSET = ARROW_HEIGHT + GAP;

type MiddlewareOpts = {
  padding?: Padding;
  iArrow: React.RefObject<SVGSVGElement>;
  onApplyFloatingStyle?: ApplyFloatingStyle;
};

export const iFill = (mode?: IPopoverProps['mode']) => {
  switch (mode) {
    case 'tip':
      return 'var(--bg-color-tip)';
    case 'confirm':
      return 'var(--bg-color-tip)';
    default:
      return 'var(--bg-color-card)';
  }
};

export const iFloatingMaxSize = (
  params: Parameters<ApplyFloatingStyle>[0],
  mode: 'width' | 'height' = 'width'
) => {
  const { elements } = params;
  const size = capitalize(mode);
  const availableSize = params[`available${size}`];
  const scrollSize = elements.floating[`scroll${size}`];
  if (availableSize < scrollSize && availableSize > 0) {
    return `${Math.max(size2px(16), availableSize)}px`;
  }
};

export const middlewares = ({
  iArrow,
  padding,
  onApplyFloatingStyle,
}: MiddlewareOpts) => [
  offset({
    mainAxis: OFFSET,
    crossAxis: OFFSET,
  }),
  shift({
    elementContext: 'reference',
  }),
  autoPlacement({
    padding,
    crossAxis: true,
    elementContext: 'reference',
  }),
  size({
    padding,
    elementContext: 'reference',
    apply(params) {
      console.log(iFloatingMaxSize(params, 'height'));
      Object.assign(
        params.elements.floating.style,
        onApplyFloatingStyle?.(params) ?? {
          maxWidth: iFloatingMaxSize(params, 'width'),
          maxHeight: iFloatingMaxSize(params, 'height'),
        }
      );
    },
  }),
  arrow({ element: iArrow, padding }),
  hide({ strategy: 'escaped', padding, elementContext: 'reference' }),
];
