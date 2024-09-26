import { Fragment } from 'react';
import { capitalCase } from 'change-case';

import { sizeOf } from '@busymango/utils';

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

const steps = Array.from({ length: 10 }, (_, i) =>
  i === 0 ? '050' : (i * 100).toString()
);

export const ColorDisc: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gap: '1em',
        gridTemplateRows: `2em repeat(${sizeOf(colors)}, 4em)`,
        gridTemplateColumns: `4em repeat(${sizeOf(steps)}, 4em)`,
      }}
    >
      <div />
      {steps.map((step) => (
        <div key={step}>{step}</div>
      ))}
      {colors.map(({ value, label }) => (
        <Fragment key={value}>
          <div
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {label}
            {'\n'}
            {capitalCase(value)}
          </div>
          {steps.map((step) => (
            <div
              key={step}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: `rgb(var(--${value}-color-${step}) / 1)`,
              }}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
