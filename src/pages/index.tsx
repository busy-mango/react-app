/**
 * @description 首页
 */

import { useEffect } from 'react';
import { Trans } from 'react-i18next';

import {
  BoundaryFallbackCard,
  BoundaryFallbackPage,
  IButton,
  IChip,
  ISafeArea,
  QueryBoundary,
  snackbar,
} from '@/components';
import { useEffectOnce, useToggle } from '@/hooks';

import * as styles from './index.scss';

const HalloWorld: React.FC = () => (
  <span>
    <Trans
      components={{
        italic: <i />,
        bold: <strong />,
        code: <IChip size="mini" variant="filled" />,
      }}
      i18nKey="common:Hallo world"
    />
  </span>
);

const Danger: React.FC<{ depth?: number }> = ({ depth }) => {
  const [isError, { on }] = useToggle();

  useEffect(() => {
    if (isError) console.info(`Danger depth 2`);
  });

  return <IButton onClick={on}>Throw Error {depth}</IButton>;
};

const Welcome: React.FC = () => {
  useEffectOnce(() => {
    snackbar.warn({ children: <HalloWorld /> });
  });

  return (
    <ISafeArea className={styles.page}>
      <QueryBoundary fallback={<BoundaryFallbackPage />}>
        <Danger depth={1} />
        <QueryBoundary fallback={<BoundaryFallbackCard />}>
          {/* <div className={styles.area}>{t('common:Confirm')}</div> */}
          <Danger depth={2} />
        </QueryBoundary>
      </QueryBoundary>
    </ISafeArea>
  );
};

export default Welcome;
