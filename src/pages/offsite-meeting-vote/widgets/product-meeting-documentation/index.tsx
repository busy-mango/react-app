import { IFieldCell, IFieldGrid } from '@/components';
import { IInput } from '@/components/widgets/iinput';

export const ProductMeetingDocumentation: React.FC = () => {
  return (
    <IFieldGrid colon={false} margin={false} mode="between">
      <IFieldCell title="会议标题">
        <IInput style={{ width: 'max-content', minWidth: 0 }} />
      </IFieldCell>
    </IFieldGrid>
  );
};
