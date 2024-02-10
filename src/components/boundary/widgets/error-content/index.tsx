/**
 * @description boundary error widgets
 */

import { ifnot } from '@busymango/utils';

import type { ReactCFC } from '@/models';

/** 资源404 */
export const NotFound: React.FC = () => <h1>你来到了没有知识的荒原</h1>;

/** 模块异常信息 */
export const ErrorAlert: ReactCFC = ({ children }) => (
  <h2>
    {ifnot(
      children && (
        <pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{children}</pre>
      )
    )}
  </h2>
);
