import { IButton, IFlex, IPopover } from '@/components';

const App: React.FC = () => (
  <IFlex gap={8}>
    {(['Click', 'Hover', 'Focus'] as const).map((type) => (
      <IPopover
        key={type}
        content={
          <div>
            <p>{type}</p>
            <p>Content</p>
          </div>
        }
        mode="tip"
        trigger={type.toLowerCase() as Lowercase<typeof type>}
      >
        {(props) => (
          <IButton tabIndex={0} {...props}>
            {type} me
          </IButton>
        )}
      </IPopover>
    ))}
  </IFlex>
);

export default App;
