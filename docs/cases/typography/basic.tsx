import { VariantControl } from '@cases/widgets';

import type { ITypographyProps } from '@/components';
import { ITypography } from '@/components';

const App: React.FC = () => (
  <VariantControl
    variants={
      [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'inherit',
        'subtitle',
      ] satisfies ITypographyProps['variant'][]
    }
  >
    {({ variant }) => (
      <ITypography variant={variant}>
        Lorem ipsum
        是图形、印刷和出版行业常用的占位符文本，用于预览布局和视觉模拟。
      </ITypography>
    )}
  </VariantControl>
);

export default App;
