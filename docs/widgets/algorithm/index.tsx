import { sort } from 'docs/widgets';
import { SortAlgorithm } from 'docs/widgets/';

import { IFlex } from '@/components';

export const Algorithm: React.FC = () => (
  <IFlex wrap gap={'var(--gap-04)'} style={{ padding: 'var(--gap-04) 0' }}>
    <SortAlgorithm
      reset={(data) => sort.bubble(data, (x, y) => x.val > y.val)}
      title="冒泡排序"
    />
    <SortAlgorithm
      reset={(data) => sort.selection(data, (x, y) => x.val > y.val)}
      title="选择排序"
    />
    <SortAlgorithm
      reset={(data) => sort.insert(data, (x, y) => x.val > y.val)}
      title="插入排序"
    />
    <SortAlgorithm
      reset={(data) => sort.shell(data, (x, y) => x.val > y.val)}
      title="希尔排序"
    />
    <SortAlgorithm
      reset={(data) => sort.quick(data, (x, y) => x.val > y.val)}
      title="快速排序"
    />
  </IFlex>
);
