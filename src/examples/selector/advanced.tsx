import { useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray, iSearchParams } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { ControlOption, IOptionRender } from '@/components';
import { IOverflow, ISafeArea, ISelector } from '@/components';
import { IChip } from '@/components/widgets/chip';
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

export default function AdvancedSelector() {
  const [open, { toggle }] = useToggle();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  const { data, isLoading } = useQuery({
    queryKey: [api, search],
    queryFn,
    retry: false,
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
    <ISafeArea>
      <form>
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
      </form>
    </ISafeArea>
  );
}
