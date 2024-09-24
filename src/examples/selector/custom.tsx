import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { produce } from 'immer';
import { create } from 'zustand';

import { isNonEmptyString, isString } from '@busymango/is-esm';
import { iArray, ifnot } from '@busymango/utils';

import type {
  ControlOption,
  ISelectorChipRender,
  ISelectorEmptyRender,
  ISelectorOptionRender,
  ISelectorPredicate,
  ISelectorScrollableRender,
} from '@/components';
import {
  IChip,
  IFlex,
  IHighLighter,
  IInput,
  IOverflow,
  ISelector,
  Scrollable,
} from '@/components';
import { useToggle } from '@/hooks';
import { iCompact } from '@/utils';

const options = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
].map((value) => ({ value, label: value }));

const useSelectorStore = create<{
  options: ControlOption[];
  creator: (option: ControlOption) => void;
}>((set) => ({
  options,
  creator: (option) => {
    set(
      produce(({ options }: { options: ControlOption[] }) => {
        options.push(option);
      })
    );
  },
}));

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
        <IChip close size="mini" variant="filled" onClose={onClose}>
          <IOverflow maxWidth={'100%'}>{content}</IOverflow>
        </IChip>
      )}
    </Fragment>
  );
};

const iOptionRender: ISelectorOptionRender = (
  { option, className },
  { keyword }
) => (
  <IFlex align="center" className={className} justify="space-between">
    <span>
      <IHighLighter
        compare={(pre, cur) =>
          Object.is(pre?.toLowerCase(), cur?.toLowerCase())
        }
        content={option?.label?.toLocaleString()}
        keyword={keyword}
      />
    </span>
  </IFlex>
);

const iEmptyRender: ISelectorEmptyRender = (_, { keyword }) => (
  <IFlex
    gap={10}
    style={{ padding: 'var(--gap-03) var(--gap-05)', cursor: 'pointer' }}
    onClick={() => {
      if (keyword) {
        useSelectorStore.getState().creator({
          value: keyword,
          label: keyword,
        });
      }
    }}
  >
    创建选项
    <b style={{ color: 'var(--font-color-10)' }}> {keyword}</b>
  </IFlex>
);

const App: React.FC = () => {
  const [open, { toggle }] = useToggle();

  const [keyword, setKeyword] = useState<string>();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  const options = useSelectorStore(({ options }) => options);

  const iScrollableRender: ISelectorScrollableRender = ({
    className,
    ...others
  }) => (
    <IFlex vertical align="center" className={className} style={{ padding: 0 }}>
      <IInput
        placeholder="查找或者创建选项"
        style={{
          width: '100%',
          padding: 'var(--gap-03) var(--gap-05)',
          backgroundColor: 'var(--bg-color-control)',
          borderBottom: '1px solid var(--border-color-3)',
        }}
        value={keyword}
        onChange={({ target }) => {
          setKeyword(target.value);
        }}
      />
      <Scrollable {...others} />
    </IFlex>
  );

  const predicate: ISelectorPredicate = ({ label, title }) => {
    if (!isNonEmptyString(keyword)) return true;
    const text = title ?? ifnot(isString(label) && label);
    return text?.toLowerCase()?.includes(keyword?.toLowerCase()) ?? false;
  };

  return (
    <ISelector
      measure
      multiple
      filter={{ predicate }}
      keyword={keyword}
      open={open}
      options={options}
      render={{
        chip: iChipRender,
        search: () => null,
        option: iOptionRender,
        empty: iEmptyRender,
        scrollable: iScrollableRender,
      }}
      style={{ width: 300 }}
      value={value}
      onChange={(current) => {
        setValue(iCompact(iArray(current)));
      }}
      onOpenChange={toggle}
    />
  );
};

export default App;
