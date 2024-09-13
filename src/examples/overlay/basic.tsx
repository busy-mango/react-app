import { IFlex, IOverlay, ISwitch } from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [open, { toggle }] = useToggle();

  return (
    <IFlex>
      <ISwitch
        onChange={({ target }) => toggle((target as HTMLInputElement).checked)}
      />
      {open && (
        <IOverlay scroll>
          <div>Floating element</div>
        </IOverlay>
      )}
    </IFlex>
  );
};

export default App;
