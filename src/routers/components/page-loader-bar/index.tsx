/**
 * @author 徐子梁
 * @description 页面加载进度条, 悬挂在画轴下
 */

import { Fragment, useEffect, useState } from 'react';

import classnames from 'classnames';

import { useContextComplete, useContextLoadable, useLoadableDispatch } from '@routers/hooks';

import styles from './index.scss';

export const PageLoaderBar: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  const isLoadable = useContextLoadable();
  const isComplete = useContextComplete();
  const setLoadable = useLoadableDispatch();

  const [progress, setProgress] = useState(0);
  const [isFadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoadable) {
      setTimeout(() => {
        setProgress((v) => Math.max(v, 0.4));
      }, 640);

      setTimeout(() => {
        setProgress((v) => Math.max(v, 0.9));
      }, 1280);
    }
  }, [isLoadable, progress]);

  useEffect(() => {
    isComplete && setProgress(1);
  }, [isComplete]);

  return (
    <Fragment>
      <div className={classnames(styles.hanging)}>
        {isLoadable && (
          <div
            className={classnames(
              'fade-in',
              styles.wrapper,
              {
                'fade-out': isFadeOut,
              },
            )}
            onAnimationEnd={(event) => {
              const { animationName } = event;
              if (animationName === 'fade-out') {
                setLoadable?.(false);
              }
            }}
          >
            <div className={styles.dot}>
              <div className={styles.animate} />
              {isComplete && (
                <div
                  className={classnames(styles.complete, 'fade-in')}
                  onAnimationEnd={() => setFadeOut(true)}
                />
              )}
            </div>
            <div
              className={classnames('transition', styles.bar)}
              style={{
                transform: `scaleX(${progress})`,
              }}
            />
          </div>
        )}
      </div>
      {children}
    </Fragment>
  );
};
