import { forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { isTrue, type PlainObject } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';
import type { UseFloatingReturn } from '@floating-ui/react';
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { container } from '@/init';
import type { WrapperProps } from '@/models';

import { IButton } from '../button';
import { IFlex } from '../flex';
import { IOverlay } from '../overlay';

import styles from './index.scss';

export type IModalRef = UseFloatingReturn['refs'] & {
  getReferenceProps: (props?: React.HTMLProps<Element>) => PlainObject;
};

interface IModalProps
  extends React.PropsWithChildren<OmitOf<WrapperProps, 'title'>> {
  open?: boolean;
  isLoading?: boolean;
  initialOpen?: boolean;
  icon?: React.ReactNode;
  close?: React.ReactNode;
  title?: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onOpenChange?: (open: boolean) => void;
}

const iDismissProps = { outsidePressEvent: 'mousedown' } as const;

export const IModal = forwardRef<IModalRef, IModalProps>(
  function DialogContent(props, ref) {
    const {
      icon,
      close,
      title,
      style,
      initialOpen,
      children,
      className,
      cancelText,
      confirmText,
      onConfirm,
      onCancel,
      ...others
    } = props;

    const isControl = 'open' in others;

    const { refs, context } = useFloating({
      onOpenChange: others.onOpenChange,
      open: isControl ? others.open : initialOpen,
    });

    const click = useClick(context);

    const dismiss = useDismiss(context, iDismissProps);

    const { getFloatingProps, getReferenceProps } = useInteractions([
      click,
      dismiss,
    ]);

    useImperativeHandle(ref, () => ({ ...refs, getReferenceProps }), [
      refs,
      getReferenceProps,
    ]);

    return (
      <FloatingPortal root={container}>
        <AnimatePresence>
          {context.open && (
            <IOverlay className={styles.overlay}>
              <FloatingFocusManager context={context}>
                <div
                  ref={refs.setFloating}
                  className={classNames(styles.wrap, className)}
                  {...getFloatingProps({ style })}
                >
                  {(icon || title) && (
                    <h2 className={styles.header}>
                      <IFlex align="center" justify="flex-start">
                        <span>{icon}</span>
                        <span>{title}</span>
                      </IFlex>
                    </h2>
                  )}
                  <div className={styles.close}>
                    {isTrue(close) ? 'close' : close}
                  </div>
                  <div className={styles.content}>{children}</div>
                  <IFlex
                    align="center"
                    className={styles.footer}
                    justify="flex-end"
                  >
                    <IButton
                      variant="bordered"
                      onClick={(event) => {
                        const { nativeEvent } = event;
                        onCancel?.(event);
                        context.onOpenChange?.(false, nativeEvent, 'click');
                      }}
                    >
                      {cancelText ?? '取消'}
                    </IButton>
                    <IButton variant="filled" onClick={onConfirm}>
                      {confirmText ?? '确认'}
                    </IButton>
                  </IFlex>
                </div>
              </FloatingFocusManager>
            </IOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    );
  }
);
