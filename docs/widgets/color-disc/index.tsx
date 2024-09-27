import { Fragment } from 'react';
import { capitalCase } from 'change-case';

import { sizeOf } from '@busymango/utils';

import { IFlex } from '@/components';

import * as styles from './index.scss';

const colors = [
  { value: 'orange', label: '品牌橙' },
  { value: 'sunset', label: '日落黄' },
  { value: 'sunglow', label: '柠檬黄' },
  { value: 'shamrock', label: '草绿' },
  { value: 'green', label: '品牌绿' },
  { value: 'viking', label: '碧涛青' },
  { value: 'malibu', label: '蔚蓝' },
  { value: 'blue', label: '品牌蓝' },
  { value: 'dodger', label: '宝石蓝' },
  { value: 'heliotrope', label: '星空紫' },
  { value: 'violet', label: '罗兰紫' },
  { value: 'purple', label: '品牌紫' },
  { value: 'rosein', label: '品红' },
  { value: 'red', label: '红色' },
  { value: 'gray', label: '灰色' },
];

const scales = Array.from({ length: 10 }, (_, i) =>
  i === 0 ? '050' : (i * 100).toString()
);

export const ColorDisc: React.FC = () => (
  <div
    className={styles.wrap}
    style={{
      gridTemplateRows: `1.5em repeat(${sizeOf(colors)}, 3em)`,
      gridTemplateColumns: `repeat(${sizeOf(scales)}, 3em) 4em`,
    }}
  >
    {scales.map((scale) => (
      <IFlex key={scale} centered>
        {scale}
      </IFlex>
    ))}
    <div />
    {colors.map(({ value, label }) => (
      <Fragment key={value}>
        {scales.map((scale) => (
          <div
            key={scale}
            className={styles.scale}
            style={{
              backgroundColor: `rgb(var(--${value}-color-${scale}) / 1)`,
            }}
          />
        ))}
        <div className={styles.title}>
          {label}
          {'\n'}
          {capitalCase(value)}
        </div>
      </Fragment>
    ))}
  </div>
);
