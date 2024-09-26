import { AnimatePresence } from 'framer-motion';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { isEmpty } from '@busymango/is-esm';

import type { IChipCloseFunc, IChipProps } from '@/components';
import { IChip, IFlex, IInput, ISignLine } from '@/components';
import { isInputElement } from '@/utils';

import PictureSVG from '@/icons/picture.svg?react';

export type IChipConfig = Pick<
  IChipProps,
  'isLoading' | 'variant' | 'size' | 'icon' | 'disabled' | 'clickable'
> & {
  value: React.Key;
  label?: React.ReactNode;
};

type ChipGroupStore = {
  keyword?: string;
  checkeds?: string[];
  chips: IChipConfig[];
  mutation: (recipe: (state: ChipGroupStore) => void) => void;
};

const useChipGroup = create<ChipGroupStore>((set) => ({
  chips: [
    { value: 'Angular' },
    { value: 'jQuery' },
    { value: 'Polymer', icon: <PictureSVG /> },
    { value: 'React' },
    { value: 'Vue.js' },
  ],
  mutation: (recipe) => {
    set(produce(recipe));
  },
}));

const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
  useChipGroup.getState().mutation((store) => {
    store.keyword = target.value;
  });
};

const onBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
  const { mutation } = useChipGroup.getState();
  const { value: label } = target;
  if (!isEmpty(label)) {
    mutation((store) => {
      store.keyword = '';
      store.chips.push({ value: nanoid(), label });
    });
  }
};

const onPressEnter: React.KeyboardEventHandler<HTMLInputElement> = ({
  target,
}) => {
  const { mutation } = useChipGroup.getState();
  if (isInputElement(target) && !isEmpty(target.value)) {
    const { value: label } = target;
    mutation((store) => {
      store.keyword = '';
      store.chips.push({ value: nanoid(), label });
    });
  }
};

const Creator: React.FC = () => (
  <IChip icon={<ISignLine type="plus" />}>
    <IInput
      autoSize
      placeholder="新增标签"
      value={useChipGroup(({ keyword }) => keyword)}
      onBlur={onBlur}
      onChange={onChange}
      onPressEnter={onPressEnter}
    />
  </IChip>
);

const iClose: (chip: IChipConfig, index: number) => IChipCloseFunc = (
  _,
  index
) => {
  const { mutation } = useChipGroup.getState();
  return () => {
    mutation(({ chips }) => {
      chips.splice(index, 1);
    });
  };
};

const App: React.FC = () => (
  <IFlex wrap gap={8}>
    <AnimatePresence presenceAffectsLayout mode="popLayout">
      {useChipGroup(({ chips }) => chips).map(
        ({ value, label, ...others }, index) => (
          <IChip
            key={value}
            closeable
            layout="size"
            onClose={iClose({ value, label, ...others }, index)}
            {...others}
          >
            {label ?? value?.toString()}
          </IChip>
        )
      )}
    </AnimatePresence>
    <Creator />
  </IFlex>
);

export default App;
