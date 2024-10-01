import { AnimatePresence } from 'framer-motion';
import { produce } from 'immer';
import { create } from 'zustand';

import { isNonEmptyString } from '@busymango/is-esm';

import {
  IControlWrap,
  IDirective,
  IFlex,
  ISignLine,
  ITextArea,
} from '@/components';

type DirectiveStore = {
  directive?: string;
  mutation(recipe: (state: DirectiveStore) => void): void;
};

const useDirectiveStore = create<DirectiveStore>((set) => ({
  mutation: (recipe) => {
    set(produce(recipe));
  },
}));

const App: React.FC = () => {
  const { directive, mutation } = useDirectiveStore();

  return (
    <IFlex vertical gap={16}>
      <IControlWrap
        suffix={<ISignLine type="cross" />}
        variant="bordered"
        onSuffixClick={() => {
          mutation((state) => {
            state.directive = '';
          });
        }}
      >
        <ITextArea
          value={directive}
          onChange={({ target }) => {
            mutation((state) => {
              state.directive = target.value;
            });
          }}
        />
      </IControlWrap>
      <AnimatePresence>
        {isNonEmptyString(directive) && (
          <IDirective icon={<ISignLine ring type="informer" />} title="通用">
            {directive}
          </IDirective>
        )}
      </AnimatePresence>
    </IFlex>
  );
};

export default App;