import { Fragment } from 'react';

import { ISignLine } from '@/components';
import { ISVGWrap } from '@/components/widgets/svg-wrap';
import type { ReactCFC } from '@/models';

import * as styles from './index.scss';

const verticals: React.CSSProperties['verticalAlign'][] = [
  'top',
  'text-top',
  'cap',
  'super',
  'middle',
  'baseline',
  'text-bottom',
  'bottom',
];

const color = [
  '#D1A20D',
  '#2499FF',
  '#0DD153',
  '#BD0DD1',
  '#9210FF',
  '#FF5C7D',
  '#0DC5D1',
  '#00EFD8',
];

const BaseLineWrap: ReactCFC = ({ children }) => (
  <div className={styles.wrap}>
    {verticals.map((key, index) => (
      <span
        key={key}
        className={styles.vertical}
        style={{
          borderColor: color[index],
          verticalAlign: key === 'cap' ? '0.7em' : key,
        }}
        {...{
          [`data-vertical-${key}`]: '',
        }}
      />
    ))}
    {children}
  </div>
);

const App: React.FC = () => {
  return (
    <Fragment>
      <BaseLineWrap>
        <ISVGWrap>
          <ISignLine type="magnifier" />
          <ISignLine type="dollar" />
          <ISignLine type="tick" />
        </ISVGWrap>
        东西 Style X x m 南北
        <ISignLine type="magnifier" />
        <ISignLine type="dollar" />
        <ISignLine type="tick" />
      </BaseLineWrap>
    </Fragment>
  );
};

export default App;
