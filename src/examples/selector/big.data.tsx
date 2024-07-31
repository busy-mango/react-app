import type { ControlOptionModel } from '@/components';
import { IPage, ISelector } from '@/components';

const options = Array.from<unknown, ControlOptionModel>(
  { length: 10000 },
  (_, i) => ({
    value: i,
    label: `item ${i + 1}`,
    title: `item ${i + 1}`,
  })
);

const Welcome: React.FC = () => (
  <IPage>
    <ISelector multiple options={options} />
  </IPage>
);

export default Welcome;
