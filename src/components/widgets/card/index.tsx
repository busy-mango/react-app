import { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';

import { IFlex } from '../flex';
import type { ICardProps, ICardRootRender } from './models';

import * as styles from './index.scss';

const iRootRender: ICardRootRender = ({
  ref,
  header,
  footer,
  children,
  ...others
}) => (
  <motion.div ref={ref} className={styles.wrap} {...others}>
    {header}
    {children}
    {footer}
  </motion.div>
);
export const ICard: React.FC<ICardProps> = forwardRef<
  HTMLDivElement,
  ICardProps
>(function ICard(props, iForwardRef) {
  const { title, extra, children, footer, render, ...others } = props;

  const ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(iForwardRef, () => ref.current!);

  return (render?.root ?? iRootRender)(
    {
      ref,
      footer,
      children,
      className: styles.wrap,
      header: (
        <IFlex align="center" justify="space-between">
          {title}
          <i>{extra}</i>
        </IFlex>
      ),
      ...others,
    },
    {}
  );
});
