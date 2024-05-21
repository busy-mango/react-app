/**
 * @description boundary error widgets
 */

import { IFlex } from '@/components/widgets';
import MaintainedSVG from '@/icons/business/maintained.svg';
import NoAuthSVG from '@/icons/business/no.auth.svg';
import NoDataSVG from '@/icons/business/no.data.svg';
import NotFoundSVG from '@/icons/business/not.found.svg';
import type { ReactCFC } from '@/models';

import styles from './index.scss';

interface FeedbackProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

/** 找不到数据 */
export const NoData: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoDataSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '暂无数据'}</h1>
  </IFlex>
);

/** 资源403 */
export const NoAuth: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NoAuthSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '暂无权限'}</h1>
  </IFlex>
);

/** 资源404 */
export const NotFound: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <NotFoundSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '页面不存在'}</h1>
  </IFlex>
);

/** 服务端维护中 */
export const Maintained: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <MaintainedSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '服务端维护中'}</h1>
  </IFlex>
);

export const Unknown: ReactCFC<FeedbackProps> = ({ title }) => (
  <IFlex centered vertical className={styles.wrap}>
    <MaintainedSVG className={styles.img} />
    <h1 className={styles.title}>{title ?? '系统异常'}</h1>
  </IFlex>
);
