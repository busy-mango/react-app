import { Variants } from 'docs/widgets';

import type { IControlWrapProps, IControlWrapRootRender } from '@/components';
import { IControlWrap, ITextArea } from '@/components';

const root: IControlWrapRootRender = ({ className }, { pattern }) => (
  <ITextArea
    className={className}
    readOnly={pattern === 'readOnly' || pattern === 'readPretty'}
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
        variant={variant}
      />
    )}
  </Variants>
);

export default App;
