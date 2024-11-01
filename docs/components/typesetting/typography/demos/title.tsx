import { IFlex, ITypography } from '@/components';

const App: React.FC = () => (
  <IFlex vertical>
    <ITypography variant="h1">h1: Lorem ipsum</ITypography>
    <ITypography variant="h2">h2: What is Lorem Ipsum?</ITypography>
    <ITypography variant="h3">
      h3: The standard Lorem Ipsum passage.
    </ITypography>
    <ITypography variant="h4">
      h4: The smallest headline of the page
    </ITypography>
  </IFlex>
);

export default App;
