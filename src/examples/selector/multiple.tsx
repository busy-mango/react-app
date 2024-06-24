import { useState } from 'react';

import { iArray, theLast } from '@busymango/utils';

import { IPage, ISelector } from '@/components';

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

export default function MultipleSelect() {
  const [age, setAge] = useState<React.Key>();
  return (
    <IPage>
      <form>
        <ISelector
          multiple
          options={names.map((value) => ({ value }))}
          value={age}
          onChange={(value) => {
            setAge(theLast(iArray(value)));
          }}
        />
      </form>
    </IPage>
  );
}
