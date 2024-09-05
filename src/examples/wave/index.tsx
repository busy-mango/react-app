import { useRef } from 'react';

import { IWave } from '@/components/widgets/wave';

const App: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <a
        ref={ref}
        style={{
          borderRadius: 2,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <IWave target={ref} />
        我是超链接
      </a>
    </div>
  );
};

export default App;
