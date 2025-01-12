import { Fragment } from 'react';
import classNames from 'classnames';
import { motion } from 'motion/react';

import type { OmitOf } from '@busymango/utils';

import { useToggle } from '@/hooks';
import type { ReactCFC, ReactWrapProps } from '@/models';
import { iPressEvent } from '@/utils';

import type { IFlexProps } from '../flex';
import { IFlex } from '../flex';
import type { IFieldCellContextVal } from '../form-field/models';
import { IMarker } from '../marker';
import { IPanel } from '../panel';
import { ISignLine } from '../sign';

import * as styles from './index.scss';

export interface IFormWrapProps extends ReactWrapProps<HTMLFormElement> {
  cell?: IFieldCellContextVal;
}

export const IFormWrap: ReactCFC<IFormWrapProps> = ({
  cell,
  children,
  onKeyDown,
  onSubmit,
  ...others
}) => (
  <motion.form
    onKeyDown={iPressEvent(onSubmit, onKeyDown)}
    onSubmit={onSubmit}
    {...others}
  >
    {children}
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
      <IPanel visible={visible}>
        <IFlex vertical className={styles.content}>
          {parts?.map((section, index) => (
            <IFormPart {...section} key={index} />
          ))}
        </IFlex>
      </IPanel>
      {children}
    </IFlex>
  );
};
