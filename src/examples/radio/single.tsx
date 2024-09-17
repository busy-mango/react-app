import { Fragment, useState } from 'react';

import { IRadio } from '@/components';

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Fragment>
      <IRadio
        aria-label="A"
        checked={selectedValue === 'a'}
        name="radio-buttons"
        value="a"
        onChange={handleChange}
      />
      <IRadio
        aria-label="b"
        checked={selectedValue === 'b'}
        name="radio-buttons"
        value="b"
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default App;
