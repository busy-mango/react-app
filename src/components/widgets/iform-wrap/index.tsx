import { motion } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type { ReactCFC, WrapperProps } from '@/models';

import { IFieldGrid } from '../iform-field';

export interface IFormWrapProps
  extends OmitOf<
    WrapperProps<HTMLFormElement>,
    'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
  > {}

export const IFormWrap: ReactCFC<IFormWrapProps> = ({
  children,
  ...others
}) => (
  <motion.form {...others}>
    <IFieldGrid>{children}</IFieldGrid>
  </motion.form>
);
