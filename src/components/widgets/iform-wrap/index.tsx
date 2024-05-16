import { motion } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';

import type { ReactCFC, WrapperProps } from '@/models';

import type { IFlexProps } from '../iflex';
import { IFlex } from '../iflex';
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
  <motion.form
    layout
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    initial={{ scale: 0.64, opacity: 0 }}
    {...others}
  >
    <IFieldGrid>{children}</IFieldGrid>
  </motion.form>
);

export interface IFormPartProps extends React.PropsWithChildren {
  name?: string;
  title?: React.ReactNode;
}

export const IFormPart: React.FC<IFormPartProps> = ({ title }) => (
  <IFlex vertical>
    <IFlex>
      <div>{title}</div>
    </IFlex>
    <IFlex vertical>
      <div></div>
    </IFlex>
  </IFlex>
);

export interface IFormCardProps
  extends OmitOf<IFlexProps, 'title' | 'children'> {
  title?: React.ReactNode;
  parts?: IFormPartProps[];
}

export const IFormCard: ReactCFC<IFormCardProps> = ({
  title,
  parts,
  children,
  ...others
}) => (
  <IFlex vertical {...others}>
    <IFlex>
      <div>{title}</div>
    </IFlex>
    <IFlex vertical>
      {parts?.map((section, index) => <IFormPart {...section} key={index} />)}
    </IFlex>
    {children}
  </IFlex>
);
