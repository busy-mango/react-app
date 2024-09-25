import { Fragment } from 'react';

import { sleep } from '@busymango/utils';
import { useMutation } from '@tanstack/react-query';

import { ISignLine, ISVGWrap, ISwitch } from '@/components';
import { useToggle } from '@/hooks';
import { isInputElement } from '@/utils';

import { configure } from '../widgets';

const App: React.FC = () => {
  const [checked, { toggle }] = useToggle(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async (checked: boolean) => {
      await sleep(3000);
      toggle(checked);
    },
  });

  return (
    <ISwitch
      checked={checked}
      isLoading={isPending}
      render={{
        label: (_, { checked }) => (
          <Fragment>
            <ISVGWrap>
              <ISignLine type={checked ? 'tick' : 'cross'} />
            </ISVGWrap>
            {checked ? '已开启' : '已关闭'}
          </Fragment>
        ),
      }}
      onChange={({ target }) => {
        if (isInputElement(target)) {
          mutate(target.checked);
        }
      }}
    />
  );
};

export default configure(App);
