import { memo } from 'react';

import { isTrue } from '@busymango/is-esm';
import { dedup } from '@busymango/utils';

import { useControlState, useMemoFunc } from '@/hooks';
import { iPropsAreEqual } from '@/utils';

import { IFlex } from '../iflex';
import { IMotionPanel } from '../imotion-panel';
import { ISignLine } from '../isign';
import type {
  ICollapseGroupProps,
  ICollapsibleKey,
  ICollapsibleProps,
} from './models';

import styles from './index.scss';

const ICollapsible: React.FC<ICollapsibleProps> = ({
  open,
  name,
  title,
  extra,
  children,
  onArrowClick,
}) => (
  <div className={styles.wrap}>
    <IFlex align="center" className={styles.header} justify="space-between">
      <IFlex align="center" className={styles.title} gap={'var(--gap-2)'}>
        {title}
      </IFlex>
      <div>
        {extra ?? (
          <IFlex
            align="center"
            className={styles.trigger}
            justify="center"
            onTouchEnd={() => {
              onArrowClick?.(name, !open);
            }}
          >
            <ISignLine type={open ? 'arrow-top' : 'arrow-bottom'} />
          </IFlex>
        )}
      </div>
    </IFlex>
    <IMotionPanel visible={open}>
      <div className={styles.content}>{children}</div>
    </IMotionPanel>
  </div>
);

const IMemoCollapsible = memo(ICollapsible, iPropsAreEqual);

export const ICollapseGroup: React.FC<ICollapseGroupProps> = (props) => {
  const { items } = props;

  const [value, onChange] = useControlState(props);

  const onArrowClick = useMemoFunc((name: ICollapsibleKey, val?: boolean) => {
    const prev = value ?? [];
    onChange?.(
      dedup(
        isTrue(val) ? prev.concat(name) : prev.filter((key) => key !== name)
      )
    );
  });

  return (
    <IFlex vertical className={styles.group}>
      {items?.map((item) => (
        <IMemoCollapsible
          key={item.name}
          open={(value ?? []).includes(item.name)}
          onArrowClick={onArrowClick}
          {...item}
        />
      ))}
    </IFlex>
  );
};
