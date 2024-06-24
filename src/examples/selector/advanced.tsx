import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { iArray } from '@busymango/utils';

import type { IOptionRender } from '@/components';
import { IPage, ISelector } from '@/components';
import { IChip } from '@/components/widgets/ichip';
import { useToggle } from '@/hooks';
import { iCompact } from '@/utils';

const options = [
  { value: 'Oliver Hansen', label: '奥利弗-汉森' },
  { value: 'Van Henry', label: '范-亨利' },
  { value: 'April Tucker', label: '四月塔克' },
  { value: 'Ralph Hubbard', label: '拉尔夫-哈伯德' },
  { value: 'Omar Alexander', label: '奥马尔-亚历山大' },
  { value: 'Carlos Abbott', label: '卡洛斯-阿博特' },
  { value: 'Miriam Wagner', label: '米里亚姆-瓦格纳' },
  { value: 'Bradley Wilkerson', label: '布拉德利-威尔克森' },
  { value: 'Virginia Andrews', label: '弗吉尼亚-安德鲁斯' },
  { value: 'Kelly Snyder', label: '凯莉-斯奈德' },
];

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

  return (
    <IPage>
      <form>
        <ISelector
          multiple
          open={open}
          options={options}
          render={{ chip: iChipRender }}
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
