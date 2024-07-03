import classNames from 'classnames';

import { isTrue } from '@busymango/is-esm';

import type { ReactCFC } from '@/models';
import { isReactChildren, isReactNode } from '@/utils';

import { IFlex } from '../iflex';
import { IMarker } from '../imarker';
import { IMotionPanel } from '../imotion-panel';
import { ISignLine } from '../isign';
import { IFieldGridProvider, useIFieldGridContext } from './hooks';
import type { IFieldCellProps, IFieldGridProps } from './models';

import styles from './index.scss';

export const IFieldGrid: ReactCFC<IFieldGridProps> = ({
  size,
  mode,
  colon,
  margin,
  children,
  className,
  forceRenderTitle,
  ...others
}) => (
  <IFlex
    vertical
    wrap
    className={classNames(styles.wrap, className)}
    data-ui-ifield-grid=""
    {...others}
  >
    <IFieldGridProvider
      colon={colon}
      forceRenderTitle={forceRenderTitle}
      margin={margin}
      mode={mode}
      size={size}
    >
      {children}
    </IFieldGridProvider>
  </IFlex>
);

export const IFieldCell: ReactCFC<IFieldCellProps> = (props) => {
  const ctx = useIFieldGridContext();

  const {
    note,
    title,
    offset,
    occupy,
    address,
    feedback,
    required,
    className,
    description,
    column = 1,
    align = 'start',
    status = 'success',
    pattern = 'editable',
    colon = ctx?.colon ?? ':',
    size = ctx?.size ?? 'medium',
    margin = ctx?.margin ?? true,
    mode = ctx?.mode ?? 'vertical',
    forceRenderTitle = ctx?.forceRenderTitle,
    children,
    ...others
  } = props;

  const showTitle = isTrue(forceRenderTitle) || isReactNode(title);

  return (
    <div
      className={classNames(
        styles.cell,
        styles[size],
        styles[status],
        {
          [styles.margin]: isTrue(margin),
          [styles.showTitle]: showTitle,
          [styles.readPretty]: pattern === 'readPretty',
        },
        className
      )}
      data-address={address}
      data-ui-ifield-cell=""
      {...others}
    >
      <div
        className={classNames(
          styles.grid,
          styles[mode],
          styles[`column${column}`]
        )}
      >
        {showTitle && (
          <IFlex
            align="center"
            className={styles.title}
            justify={`flex-${align}`}
          >
            <IMarker required={required}>{title}</IMarker>
            {description && <ISignLine type='helper' ring />}
            {note && <ISignLine ring type="info" />}
            {colon && <div className={styles.colon}>{colon}</div>}
          </IFlex>
        )}
        {isReactChildren(children) && (
          <IFlex vertical className={styles.control}>
            <IFlex
              vertical
              align={mode === 'between' ? 'flex-end' : 'flex-start'}
              className={styles.wrapper}
              justify="center"
            >
              {children}
            </IFlex>
            <IMotionPanel
              className={classNames(
                styles.feedback,
                margin === 'feedback' && styles.withMargin
              )}
              visible={isReactChildren(feedback)}
            >
              {feedback}
            </IMotionPanel>
          </IFlex>
        )}
      </div>
    </div>
  );
};
