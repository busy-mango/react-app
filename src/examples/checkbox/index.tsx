import { ICheckbox, ISafeArea } from '@/components';

const NormalCheckBox: React.FC = () => {
  return (
    <ISafeArea>
      <form></form>
      <ICheckbox label={1} />
    </ISafeArea>
  );
};

export default NormalCheckBox;
