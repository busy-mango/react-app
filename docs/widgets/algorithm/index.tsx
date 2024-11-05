import { sort } from 'docs/widgets';
import { AlgorithmSort } from 'docs/widgets/';

import { IFlex } from '@/components';

const compare = (x: number, y: number) => x - y;

export const Algorithm: React.FC = () => (
  <IFlex wrap gap={'var(--gap-04)'} style={{ padding: 'var(--gap-04) 0' }}>
    <AlgorithmSort
      reset={(data) => sort.bubble(data, compare)}
      title="冒泡排序"
    />
    <AlgorithmSort
      reset={(data) => sort.selection(data, compare)}
      title="选择排序"
    />
    <AlgorithmSort
      reset={(data) => sort.insert(data, compare)}
      title="插入排序"
    />
    <AlgorithmSort
      reset={(data) => sort.shell(data, compare)}
      title="希尔排序"
    />
    <AlgorithmSort
      reset={(data) => sort.quick(data, compare)}
      title="快速排序"
    />
  </IFlex>
);
