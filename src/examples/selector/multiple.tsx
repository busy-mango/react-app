import { useState } from 'react';

import { iArray } from '@busymango/utils';

import { ISafeArea, ISelector } from '@/components';
import { iCompact } from '@/utils';

const names = [
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
];

const options = names.map((value) => ({ value }));

export default function MultipleSelect() {
  const [age, setAge] = useState<React.Key[]>();

  const onChange = function (value?: React.Key | React.Key[]) {
    setAge(iCompact(iArray(value)));
  };

  return (
    <ISafeArea>
      <form>
        <ISelector
          multiple
          options={options}
          separator=","
          value={age}
          onChange={onChange}
        />
      </form>
    </ISafeArea>
  );
}
