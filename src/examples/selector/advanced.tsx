import { useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray, iSearchParams } from '@busymango/utils';
import { useQuery } from '@tanstack/react-query';

import type { ControlOptionModel, IOptionRender } from '@/components';
import { IPage, ISelector } from '@/components';
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

type AccountModel = {
  hash: string;
  sha1: string;
  email: string;
  sources: string;
  password: string;
  hash_password: boolean;
};

interface AccountListBody {
  found?: number;
  message?: string;
  success?: boolean;
  result?: AccountModel[];
}

const api = 'https://breachdirectory.p.rapidapi.com';

const search = 'func=auto&term=someone%40example.com';

const queryFn = async () => {
  const { success, message, result, found } = await drive<AccountListBody>(
    api,
    iSearchParams(search)
  );

  if (!success) throw new Error(message);

  return { result, count: found };
};

const iChipRender: IOptionRender = (option, params) => {
  const { value, label } = option ?? {};
  const { multiple, onClose } = params ?? {};
  const content = label ?? 'UnknownRender' ?? value?.toLocaleString();
  return (
    <Fragment>
      {!multiple && content}
      {multiple && (
        <IChip close size="mini" variant="filled" onClose={onClose}>
          {content}
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

  const { result } = data ?? {};

  const options = useMemo(
    () =>
      result?.map<ControlOptionModel>((e) => ({
        value: e.hash,
        label: e.email,
      })),
    [result]
  );

  return (
    <IPage>
      <form>
        <ISelector
          multiple
          isLoading={isLoading}
          open={open}
          options={options}
          render={{ chip: iChipRender }}
          style={{
            width: 300,
          }}
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
