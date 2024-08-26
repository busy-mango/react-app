import { useState } from 'react';

import { iArray, theLast } from '@busymango/utils';

import { ISafeArea, ISelector } from '@/components';

export default function BasicSelect() {
  const [age, setAge] = useState<React.Key>();
  return (
    <ISafeArea>
      <form>
        <ISelector
          options={[
            { value: 10, label: 'Ten' },
            { value: 20, label: 'Twenty' },
            { value: 30, label: 'Thirty' },
          ]}
          placeholder="placeholder"
          value={age}
          onChange={(value) => {
            setAge(theLast(iArray(value)));
          }}
        />
      </form>
    </ISafeArea>
  );
}
