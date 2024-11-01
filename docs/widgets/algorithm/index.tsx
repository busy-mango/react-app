import { SortAlgorithm } from 'docs/widgets/';
import {
  bubble,
  insert,
  selection,
  shell,
} from 'docs/widgets/sort-algorithm/functions';

import { IFlex } from '@/components';

export const Algorithm: React.FC = () => (
  <IFlex vertical gap={'var(--gap-04)'} style={{ padding: 'var(--gap-04) 0' }}>
    <SortAlgorithm
      reset={(data) => bubble(data, (x, y) => x.val > y.val)}
      title="冒泡排序"
    />
    <SortAlgorithm
      reset={(data) => selection(data, (x, y) => x.val > y.val)}
      title="选择排序"
    />
    <SortAlgorithm
      reset={(data) => insert(data, (x, y) => x.val > y.val)}
      title="插入排序"
    />
    <SortAlgorithm
      reset={(data) => shell(data, (x, y) => x.val > y.val)}
      title="希尔排序"
    />
  </IFlex>
);
