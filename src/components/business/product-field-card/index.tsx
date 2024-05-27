import {
  IFieldCell,
  IFieldGrid,
  IFormCard,
  IPicker,
  ITextarea,
} from '@/components/widgets';
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
        <IFieldCell title="投票结果">
          <IPicker
            columns={[
              [
                { label: '通过', value: 1 },
                { label: '有条件通过', value: 2 },
                { label: '复议', value: 3 },
                { label: '否决', value: 4 },
              ],
            ]}
            defaultValue={[2]}
            title="投票结果"
          />
        </IFieldCell>
        <IFieldCell mode="vertical" title="意见反馈">
          <ITextarea maxRows={6} minRows={3} />
        </IFieldCell>
      </IFieldGrid>
    ),
  },
];

export const ProductFieldCard: ReactCFC = () => {
  return <IFormCard parts={parts} title="月月盈一号" />;
};
