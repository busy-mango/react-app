import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
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
  IPopover,
  IScrollable,
  ISelector,
  ISignLine,
  IWaveShell,
} from '@/components';
import { useToggle } from '@/hooks';
import { iCompact, iPropagation, iThemeVariable } from '@/utils';

const iColorDisc = iCompact(
  (
    [
      'orange',
      'sunset',
      'sunglow',
      'shamrock',
      'green',
      'viking',
      'malibu',
      'blue',
      'dodger',
      'heliotrope',
      'violet',
      'purple',
      'rosein',
      'red',
    ] as const
  ).map((name) => `rgb(${iThemeVariable(`--${name}-color-600`)} / 1)`)
);

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
].map<ControlOption>((value, index) => ({
  value,
  label: value,
  color: iColorDisc[index],
}));

type SelectorStore = {
  options: ControlOption[];
  creator: (option: ControlOption) => void;
  mutation: (recipe: (options: ControlOption[]) => void) => void;
};

const useSelectorStore = create<SelectorStore>((set) => ({
  options,
  mutation: (recipe) => {
    set(
      produce(({ options }: SelectorStore) => {
        recipe(options);
      })
    );
  },
  creator: (option) => {
    set(
      produce(({ options }: SelectorStore) => {
        options.push(option);
      })
    );
  },
}));

const iChipRender: ISelectorChipRender = (
  { option, onClose },
  { multiple }
) => {
  const { label, color } = option ?? {};
  const content = label ?? 'UnknownRender';
  return (
    <Fragment>
      {!multiple && <span style={{ color }}>{content}</span>}
      {multiple && (
        <IChip
          closeable
          size="mini"
          style={{ backgroundColor: color, color: 'var(--font-color-b8)' }}
          variant="filled"
          onClose={onClose}
        >
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
  <IFlex
    align="center"
    className={className}
    justify="space-between"
    // style={{ color: option.color }}
  >
    <span style={{ color: option.color }}>
      <IHighLighter
        compare={(pre, cur) =>
          Object.is(pre?.toLowerCase(), cur?.toLowerCase())
        }
        content={option?.label?.toLocaleString()}
        keyword={keyword}
      />
    </span>
    <IPopover
      content={
        <IFlex
          wrap
          gap={'0.75em'}
          style={{
            width: '12.5em',
            padding: '0.5em',
          }}
        >
          {iColorDisc.map((color) => (
            <motion.div
              key={color}
              style={{
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: color,
                borderRadius: 'var(--border-radius-02)',
              }}
              onClick={() => {
                useSelectorStore.getState().mutation((opts) => {
                  const { value: val } = option;
                  const opt = opts.find(({ value }) => value === val);
                  if (opt) opt.color = color;
                });
              }}
            >
              <IWaveShell>
                {(ref) => (
                  <motion.div
                    ref={ref}
                    animate={{
                      scale: option.color === color ? 1.1 : 1,
                      borderColor: ifnot(
                        option.color === color && `var(--border-color-active)`
                      ),
                    }}
                    style={{
                      width: '1em',
                      height: '1em',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderRadius: 'var(--border-radius-02)',
                    }}
                  />
                )}
              </IWaveShell>
            </motion.div>
          ))}
        </IFlex>
      }
      mode="confirm"
    >
      {({ onClick, ...props }, { open }) => (
        <ISignLine
          animate={{
            color: option.color,
          }}
          type={open ? 'arrowDoubleTop' : 'arrowDoubleBottom'}
          onClick={(event) => {
            iPropagation?.(event);
            onClick?.(event);
          }}
          {...props}
        />
      )}
    </IPopover>
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
      <IScrollable {...others} />
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
