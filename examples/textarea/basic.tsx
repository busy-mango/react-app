import { VariantControl } from '@examples/widgets';

import type { IControlWrapProps, IControlWrapRootRender } from '@/components';
import { IControlWrap, ITextArea } from '@/components';

const App: React.FC = () => {
  const root: IControlWrapRootRender = ({ className }, { pattern }) => (
    <ITextArea
      className={className}
      readOnly={pattern === 'readOnly' || pattern === 'readPretty'}
    />
  );
  return (
    <VariantControl
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
    </VariantControl>
  );
};

export default App;
