import { ICard, ITypography } from '@/components';

const App: React.FC = () => (
  <ICard variant="bordered">
    <ITypography variant="h1">National Parks</ITypography>
    <ITypography variant="h2">Yosemite National Park</ITypography>
    <ITypography>
      Yosemite National Park is a national park spanning 747,956 acres (1,169.4
      sq mi; 3,025.2 km2) in the western Sierra Nevada of Central California.
    </ITypography>
  </ICard>
);

export default App;
