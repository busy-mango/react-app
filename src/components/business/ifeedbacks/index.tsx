/**
 * @description boundary error widgets
 */

import { IFlex } from '@/components/widgets';
import type { ReactCFC } from '@/models';

import ErrorSVG from '@/icons/business/error.svg';
import NoConnectionSVG from '@/icons/business/no.connection.svg';
import NoDocumentsSVG from '@/icons/business/no.documents.svg';
import NoSearchResultSVG from '@/icons/business/no.search.result.svg';

import styles from './index.scss';

interface FeedbackProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

/** 找不到数据 */
export const NoData: ReactCFC<FeedbackProps> = ({ children, title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoSearchResultSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '暂无数据'}</h1>
    {children}
  </IFlex>
);

/** 资源403 */
export const NoAuth: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <ErrorSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '暂无权限'}</h1>
  </IFlex>
);

/** 资源404 */
export const NotFound: ReactCFC<FeedbackProps> = ({ title, children }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoDocumentsSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '页面不存在'}</h1>
    {children}
  </IFlex>
);

/** 服务端维护中 */
export const Maintained: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoConnectionSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '服务端维护中'}</h1>
  </IFlex>
);

export const Unknown: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <ErrorSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '系统异常'}</h1>
  </IFlex>
);
