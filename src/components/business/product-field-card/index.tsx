import { IFieldCell, IFieldGrid, IFormCard } from '@/components/widgets';
import type { ReactCFC } from '@/models';

export interface ProductFormCardProps {
  title?: React.ReactNode;
}

const parts = [
  {
    title: '基础信息',
    children: (
      <IFieldGrid>
        <IFieldCell title="产品策略"></IFieldCell>
        <IFieldCell title="管理方式"></IFieldCell>
        <IFieldCell title="是否MOM"></IFieldCell>
        <IFieldCell title="MOM结构"></IFieldCell>
        <IFieldCell title="是否FOF"></IFieldCell>
        <IFieldCell title="专户投资人"></IFieldCell>
        <IFieldCell title="产品需求描述"></IFieldCell>
        <IFieldCell title="投资经理"></IFieldCell>
        <IFieldCell title="产品经理"></IFieldCell>
        <IFieldCell title="运营经理"></IFieldCell>
        <IFieldCell title="风控经理"></IFieldCell>
        <IFieldCell title="产品律师"></IFieldCell>
      </IFieldGrid>
    ),
  },
  {
    title: '投票意见',
    children: (
      <IFieldGrid>
        <IFieldCell title="投票意见"></IFieldCell>
        <IFieldCell mode="vertical" title="意见反馈"></IFieldCell>
      </IFieldGrid>
    ),
  },
];

export const ProductFieldCard: ReactCFC = () => {
  return <IFormCard parts={parts} title="月月盈一号" />;
};
