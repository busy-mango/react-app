import { IFlex, ISpinner, ISwitch } from '@/components';
import { IBackdrop } from '@/components/widgets/backdrop';
import { useToggle } from '@/hooks';
import { iPropagation } from '@/utils';

const App: React.FC = () => {
  const [open, { toggle, off }] = useToggle();

  return (
    <IFlex>
      <ISwitch
        onChange={({ target }) => toggle((target as HTMLInputElement).checked)}
      />
      <IBackdrop
        open={open}
        onClick={(event) => {
          iPropagation(event);
          off();
        }}
      >
        <ISpinner />
      </IBackdrop>
    </IFlex>
  );
};

export default App;
