import { useRef } from 'react';

import { IButton, IFlex, IPopover } from '@/components';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <IFlex centered>
      <div
        ref={ref}
        style={{
          width: '40vw',
          height: '30vw',
          overflow: 'scroll',
          backgroundColor: 'var(--bg-warp-color)',
        }}
      >
        <IFlex centered style={{ width: '120vw', height: '90vw' }}>
          <IPopover content="我是文本" mode="tip" root={ref} trigger="click">
            {(props) => (
              <IButton size="huge" tabIndex={0} {...props}>
                按钮
              </IButton>
            )}
          </IPopover>
        </IFlex>
      </div>
    </IFlex>
  );
};

export default App;
