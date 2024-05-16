import { IFieldCell, IFieldGrid, IInput } from '@/components';

export const ProductMeetingInfo: React.FC = () => {
  return (
    <IFieldGrid colon={false} margin={false} mode="between">
      <IFieldCell title="会议标题">
        <IInput style={{ width: 'max-content', minWidth: 0 }} />
      </IFieldCell>
      <IFieldCell title="会议类型">
        <IInput />
      </IFieldCell>
      <IFieldCell title="产委会编码">
        <IInput />
      </IFieldCell>
      <IFieldCell title="会议地址">
        <IInput />
      </IFieldCell>
      <IFieldCell title="会议事项">
        <IInput />
      </IFieldCell>
    </IFieldGrid>
  );
};
