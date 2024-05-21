/**
 * @description 首页
 */

import { useEffect } from 'react';

import { IMobilePage, IOverflow, NoData, snackbar } from '@/components';
import { useToggle } from '@/hooks';

const Welcome: React.FC = () => {
  const [open, { toggle }] = useToggle();

  useEffect(() => {
    snackbar.emit({
      children: '1213',
    });
  }, []);

  return (
    <IMobilePage>
      <NoData
        title={<IOverflow maxRow={3}>{`${'很长'.repeat(20)}的文字`}</IOverflow>}
      />
    </IMobilePage>
  );
};

export default Welcome;
