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
          backgroundColor: 'var(--fill-color-warp)',
        }}
      >
        <IFlex centered style={{ width: '120vw', height: '90vw' }}>
          <IPopover
            content="我是文本"
            root={ref}
            trigger="click"
            variant="tooltip"
          >
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
