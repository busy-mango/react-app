import { Variants } from 'docs/widgets';

import type { IControlWrapProps, IControlWrapRootRender } from '@/components';
import { IControlWrap, ITextArea } from '@/components';

const root: IControlWrapRootRender = ({ className, style }, { pattern }) => (
  <ITextArea
    className={className}
    readOnly={pattern === 'readOnly' || pattern === 'readPretty'}
    style={style}
  />
);

const App: React.FC = () => (
  <Variants
    patternable
    sizeable
    statusable
    variants={
      [
        'bordered',
        'filled',
        'standard',
      ] satisfies IControlWrapProps['variant'][]
    }
  >
    {({ size, status, pattern, variant }) => (
      <IControlWrap
        pattern={pattern}
        render={{ root }}
        size={size}
        status={status}
        style={{ padding: 'var(--gap-03) var(--gap-04)' }}
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
