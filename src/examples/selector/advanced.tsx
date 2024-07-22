import { useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray, iSearchParams } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { ControlOptionModel, IOptionRender } from '@/components';
import { IOverflow, IPage, ISelector } from '@/components';
import { IChip } from '@/components/widgets/ichip';
import { useToggle } from '@/hooks';
import { drive } from '@/service';
import { iCompact } from '@/utils';

// const options = [
//   { value: 'Oliver Hansen', label: '奥利弗-汉森' },
//   { value: 'Van Henry', label: '范-亨利' },
//   { value: 'April Tucker', label: '四月塔克' },
//   { value: 'Ralph Hubbard', label: '拉尔夫-哈伯德' },
//   { value: 'Omar Alexander', label: '奥马尔-亚历山大' },
//   { value: 'Carlos Abbott', label: '卡洛斯-阿博特' },
//   { value: 'Miriam Wagner', label: '米里亚姆-瓦格纳' },
//   { value: 'Bradley Wilkerson', label: '布拉德利-威尔克森' },
//   { value: 'Virginia Andrews', label: '弗吉尼亚-安德鲁斯' },
//   { value: 'Kelly Snyder', label: '凯莉-斯奈德' },
// ];

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
  const { value, label } = option ?? {};
  const { multiple, onClose } = params ?? {};
  const content = label ?? 'UnknownRender' ?? value?.toLocaleString();
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
      data?.map<ControlOptionModel>(({ country, domains, name }) => ({
        value: `${country}-${domains.join('&')}`,
        label: name,
      })),
    [data]
  );

  return (
    <IPage>
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
    </IPage>
  );
}
