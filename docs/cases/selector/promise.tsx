import { Fragment, useMemo, useState } from 'react';

import { iArray, iSearchParams, sleep } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { ControlOption } from '@/components';
import { IChip, IOverflow, ISelector } from '@/components';
import type { ISelectorChipRender } from '@/components/widgets/selector/models';
import { useToggle } from '@/hooks';
import { drive } from '@/service';
import { iCompact } from '@/utils';

import { configure } from '../widgets';

type UniversityModel = {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
};

const search = 'country=United+States';

const api = 'http://universities.hipolabs.com/search';

const queryFn = async () => {
  await sleep(3000);
  return drive<UniversityModel[]>(api, iSearchParams(search));
};

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
        <IChip closeable size="mini" variant="filled" onClose={onClose}>
          <IOverflow maxWidth={'100%'}>{content}</IOverflow>
        </IChip>
      )}
    </Fragment>
  );
};

const App: React.FC = () => {
  const [open, { toggle }] = useToggle();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  const { data, isLoading } = useQuery({ queryKey: [api, search], queryFn });

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
      filter
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

export default configure(App);
