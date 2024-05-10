import { Fragment } from 'react/jsx-runtime';
import classNames from 'classnames';

import { isTrue } from '@busymango/is-esm';

import HelperSVG from '@/icons/helper.svg';
import NoteSVG from '@/icons/note.svg';
import type { ReactCFC } from '@/models';
import { isReactChildren, isReactNode } from '@/utils';

import { Feedback } from '../ifeedback';
import { IFlex } from '../iflex';
import { IMarker } from '../imarker';
import { IFieldGridProvider, useIFieldGridContext } from './hooks';
import type { IFieldCellProps, IFieldGridProps } from './models';

import styles from './index.scss';

export const IFieldGrid: ReactCFC<IFieldGridProps> = ({
  mode,
  children,
  className,
  ...others
}) => (
  <IFlex wrap className={classNames(styles.wrap, className)} {...others}>
    <IFieldGridProvider mode={mode}>{children}</IFieldGridProvider>
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
    colon = ':',
    column = 1,
    margin = true,
    align = 'start',
    forceRenderTitle,
    status = 'success',
    pattern = 'editable',
    mode = ctx?.mode ?? 'vertical',
    children,
    ...others
  } = props;

  const showTitle = isTrue(forceRenderTitle) || isReactNode(title);

  return (
    <Fragment>
      <div
        className={classNames(
          styles.cell,
          styles[status],
          {
            [styles.margin]: margin,
            [styles.showTitle]: showTitle,
            [styles.readPretty]: pattern === 'readPretty',
          },
          className
        )}
        data-address={address}
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
              align="flex-start"
              className={styles.title}
              justify={`flex-${align}`}
            >
              <IMarker required={required}>{title}</IMarker>
              {description && <HelperSVG />}
              {note && <NoteSVG />}
              {colon && <div className={styles.colon}>{colon}</div>}
            </IFlex>
          )}
          {isReactChildren(children) && (
            <IFlex vertical className={styles.control}>
              <div className={styles.wrapper}>{children}</div>
              <Feedback status={status}>{feedback}</Feedback>
            </IFlex>
          )}
        </div>
      </div>
    </Fragment>
  );
};
