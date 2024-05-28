/**
 * @description 首页
 */

import { useEffect } from 'react';

import { IMobilePage, IOverflow, NoData, snackbar } from '@/components';
import { AppEnv, env } from '@/init';

const isDev = env.name === AppEnv.Dev;

const text = `${'很长'.repeat(20)}的文字`;

const children = (
  <p>
    <strong>Notice:</strong> You are currently running React in development
    mode. Rendering performance will be slightly degraded until this application
    is build for production.
  </p>
);

const Welcome: React.FC = () => {
  useEffect(() => {
    isDev && snackbar.emit({ children, id: 'Welcome' });
  }, []);

  return (
    <IMobilePage>
      <NoData title={<IOverflow maxRow={3}>{text}</IOverflow>} />
    </IMobilePage>
  );
};

export default Welcome;
