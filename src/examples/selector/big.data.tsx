import type { ControlOption } from '@/components';
import { ISafeArea, ISelector } from '@/components';

const options = Array.from<unknown, ControlOption>(
  { length: 10000 },
  (_, i) => ({
    value: i,
    label: `item ${i + 1}`,
    title: `item ${i + 1}`,
  })
);

const Welcome: React.FC = () => (
  <ISafeArea>
    <ISelector multiple options={options} />
  </ISafeArea>
);

export default Welcome;
