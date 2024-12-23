import { Fragment } from 'react';
import classNames from 'classnames';
import type { HTMLMotionProps } from 'motion/react';
import { motion } from 'motion/react';

import type { OmitOf } from '@busymango/utils';

import { useToggle } from '@/hooks';
import type { ReactCFC } from '@/models';

import type { IFlexProps } from '../flex';
import { IFlex } from '../flex';
import { IFieldGrid } from '../form-field';
import { IMarker } from '../marker';
import { IMotionPanel } from '../motion-panel';
import { ISignLine } from '../sign';

import * as styles from './index.scss';

export interface IFormWrapProps extends HTMLMotionProps<'form'> {}

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

export interface IFormPartProps {
  name?: string;
  title?: React.ReactNode;
}

export const IFormPart: ReactCFC<IFormPartProps> = ({ title, children }) => (
  <Fragment>
    <IFlex align="center" className={styles.partTitle}>
      <IMarker part>{title}</IMarker>
    </IFlex>
    {children}
  </Fragment>
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
  className,
  ...others
}) => {
  const [visible, { toggle }] = useToggle(true);

  return (
    <IFlex vertical className={classNames(styles.card, className)} {...others}>
      {title && (
        <IFlex align="center" className={styles.header} justify="space-between">
          <div>{title}</div>
          <ISignLine
            type={visible ? 'arrowTop' : 'arrowBottom'}
            onClick={toggle}
          />
        </IFlex>
      )}
      <IMotionPanel visible={visible}>
        <IFlex vertical className={styles.content}>
          {parts?.map((section, index) => (
            <IFormPart {...section} key={index} />
          ))}
        </IFlex>
      </IMotionPanel>
      {children}
    </IFlex>
  );
};
