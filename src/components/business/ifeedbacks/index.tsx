/**
 * @description boundary error widgets
 */

import { Fragment } from 'react/jsx-runtime';
import type { TranslationProps } from 'react-i18next';
import { Translation } from 'react-i18next';

import { isTrue } from '@busymango/is-esm';

import { IFlex } from '@/components/widgets';
import type { ReactCFC } from '@/models';

import ErrorSVG from '@/icons/business/error.svg?react';
import NoConnectionSVG from '@/icons/business/no.connection.svg?react';
import NoDocumentsSVG from '@/icons/business/no.documents.svg?react';
import NoSearchResultSVG from '@/icons/business/no.search.result.svg?react';

import * as styles from './index.scss';

interface FeedbackProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const AnomalyShell: ReactCFC<{
  image: React.ReactNode;
  render: TranslationProps['children'];
}> = ({ image, render }) => (
  <IFlex centered vertical className={styles.wrap}>
    {isTrue(image) ? <ErrorSVG className={styles.img} /> : image}
    <Translation>{render}</Translation>
  </IFlex>
);

/** 找不到数据 */
export const NoData: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image={<NoSearchResultSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>{title ?? t('common:No data')}</h1>
        {children}
      </Fragment>
    )}
  />
);

/** 资源403 */
export const NoAuth: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>{title ?? t('common:No authority')}</h1>
        {children}
      </Fragment>
    )}
  />
);

/** 资源404 */
export const NotFound: ReactCFC<FeedbackProps> = ({ title, children }) => (
  <AnomalyShell
    image={<NoDocumentsSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>{title ?? t('common:Page not found')}</h1>
        {children}
      </Fragment>
    )}
  />
);

/** 服务端维护中 */
export const Maintained: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image={<NoConnectionSVG className={styles.img} />}
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>
          {title ?? t('common:Under maintenance')}
        </h1>
        {children}
      </Fragment>
    )}
  />
);

export const Unknown: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <AnomalyShell
    image
    render={(t) => (
      <Fragment>
        <h1 className={styles.title}>
          {title ?? t('common:Under abnormality')}
        </h1>
        {children}
      </Fragment>
    )}
  />
);
