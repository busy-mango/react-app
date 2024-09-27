import type { Target, Transition } from 'framer-motion';

import type { PartialRecord } from '@busymango/utils';
import { assign } from '@busymango/utils';

import type { COLOR_DISC } from '@/constants';
import { iThemeVariable, size2px } from '@/utils';

import type { IChipProps } from '../models';

export const transition: Transition = { duration: 0.1 };

export const initial: Target = { opacity: 0, x: -size2px(4) };

type VariantCSS = PartialRecord<
  Exclude<IChipProps['variant'], undefined>,
  string
>;

const iColorHex = (color: (typeof COLOR_DISC)[number], scale = '600') =>
  `rgb(${iThemeVariable(`--${color}-color-${scale}`)} / 1)`;

export const iAnimate = ({
  color,
  variant,
  disabled,
}: Pick<IChipProps, 'color' | 'variant' | 'disabled'>) =>
  assign<Target>(
    {
      x: 0,
      opacity: 1,
    },
    color && variant && !disabled
      ? {
          color: (
            {
              filled: 'var(--font-color-b8)',
              bordered: iColorHex(color),
            } satisfies VariantCSS
          )[variant],
          borderColor: (
            {
              filled: 'transparent',
              bordered: iColorHex(color),
            } satisfies VariantCSS
          )[variant],
          backgroundColor: (
            {
              bordered: void 0,
              filled: iColorHex(color, '300'),
            } satisfies VariantCSS
          )[variant],
        }
      : {}
  );
