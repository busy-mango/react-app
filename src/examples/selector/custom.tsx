import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray } from '@busymango/utils';

import type {
  ISelectorChipRender,
  ISelectorScrollableRender,
} from '@/components';
import {
  IChip,
  IFlex,
  IInput,
  IOverflow,
  ISelector,
  Scrollable,
} from '@/components';
import { useToggle } from '@/hooks';
import { iCompact } from '@/utils';

const options = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
].map((value) => ({ value }));

const iChipRender: ISelectorChipRender = (
  { option, onClose },
  { multiple }
) => {
  const { label } = option ?? {};
  const content = label ?? 'UnknownRender';
  return (
    <Fragment>
      {!multiple && content}
      {multiple && (
        <IChip close size="mini" variant="filled" onClose={onClose}>
          <IOverflow maxWidth={'100%'}>{content}</IOverflow>
        </IChip>
      )}
    </Fragment>
  );
};

const iScrollableRender: ISelectorScrollableRender = ({
  className,
  ...others
}) => (
  <IFlex vertical align="center" className={className} style={{ padding: 0 }}>
    <IInput
      placeholder="查找或者创建选项"
      style={{
        width: '100%',
        padding: 'var(--gap-03)',
        fontSize: 'var(--font-size-03)',
        backgroundColor: 'var(--bg-color-control)',
        borderBottom: '1px solid var(--border-color-3)',
      }}
    />
    <Scrollable {...others} />
  </IFlex>
);

const App: React.FC = () => {
  const [open, { toggle }] = useToggle();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  return (
    <ISelector
      filter
      measure
      multiple
      open={open}
      options={options}
      render={{ chip: iChipRender, scrollable: iScrollableRender }}
      style={{ width: 300 }}
      value={value}
      onChange={(current) => {
        setValue(iCompact(iArray(current)));
      }}
      onOpenChange={toggle}
    />
  );
};

export default App;
