import classNames from 'classnames';

import type { ReactCFC, WrapperProps } from '@/models';

import styles from './index.scss';

export interface IMarkerProps extends WrapperProps {
  /** 必填标识 */
  required?: boolean;
}

export const IMarker: ReactCFC<IMarkerProps> = ({
  required,
  children,
  ...others
}) => (
  <div
    className={classNames(styles.wrap, required && styles.required)}
    {...others}
  >
    {children}
  </div>
);
