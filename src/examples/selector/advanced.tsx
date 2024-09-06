import { useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray, iSearchParams } from '@busymango/utils';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import type { ControlOption, IOptionRender } from '@/components';
import { IChip, IOverflow, ISelector } from '@/components';
import { useToggle } from '@/hooks';
import { drive } from '@/service';
import { iCompact } from '@/utils';

type UniversityModel = {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
};

const api = 'http://universities.hipolabs.com/search';

const search = 'country=United+States';

const queryFn = () => drive<UniversityModel[]>(api, iSearchParams(search));

export const client = new QueryClient({
  queryCache: new QueryCache({}),
});

const iChipRender: IOptionRender = (option, params) => {
  const { label } = option ?? {};
  const { multiple, onClose } = params ?? {};
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

const AdvancedSelector: React.FC = () => {
  const [open, { toggle }] = useToggle();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  const { data, isLoading } = useQuery({
    queryKey: [api, search],
    queryFn,
  });

  const options = useMemo(
    () =>
      data?.map<ControlOption>(({ country, domains, name }) => ({
        value: `${country}-${domains.join('&')}`,
        label: name,
      })),
    [data]
  );

  return (
    <ISelector
      measure
      multiple
      isLoading={isLoading}
      open={open}
      options={options}
      render={{ chip: iChipRender }}
      style={{ width: 300 }}
      value={value}
      onChange={(current) => {
        setValue(iCompact(iArray(current)));
      }}
      onOpenChange={toggle}
    />
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={client}>
    <AdvancedSelector />
  </QueryClientProvider>
);

export default App;
