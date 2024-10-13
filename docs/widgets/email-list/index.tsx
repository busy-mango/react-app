import { Fragment } from 'react/jsx-runtime';
import { emails } from 'docs/widgets/data';

import { sleep } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import {
  ICard,
  IControlWrap,
  IInput,
  IScrollable,
  ISignLine,
} from '@/components';
import type { IScrollableOptionRender } from '@/components/widgets/scrollable/models';

const render: IScrollableOptionRender = ({ value }, { index }) => {
  return <ICard />;
};

export const EmailList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['EMAIL_QUERY'],
    queryFn: async () => {
      await sleep(2000);
      return emails.map(({ id, ...item }) => ({
        value: id,
        ...item,
      }));
    },
  });

  return (
    <Fragment>
      <IControlWrap prefix={<ISignLine type="magnifier" />} variant="bordered">
        <IInput />
      </IControlWrap>
      <IScrollable
        isLoading={isLoading}
        options={data}
        style={{ flexGrow: 1 }}
      />
    </Fragment>
  );
};
