import { ISafeArea } from '@/components';
import { IRadio } from '@/components/widgets/radio';

const NormalRadio: React.FC = () => {
  return (
    <ISafeArea>
      <form>
        <IRadio label={1} />
      </form>
    </ISafeArea>
  );
};

export default NormalRadio;
