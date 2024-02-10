import React from 'react';
import classNames from 'classnames';

import Loader from '@/icons/loader.svg';

import styles from './index.scss';

const fallback = (
  <Loader className={classNames(styles.loader, 'animate-spin')} />
);

export const SuspenseFallbackWidget: React.FC = () => fallback;

export const SuspenseFallbackModule: React.FC = () => fallback;
