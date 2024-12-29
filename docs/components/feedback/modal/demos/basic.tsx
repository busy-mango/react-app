import { Fragment } from 'react';
import { useImmer } from 'use-immer';

import { IButton, ICard, IFlex, IModal, ISignLine } from '@/components';

const App: React.FC = () => {
  const [store, recipe] = useImmer<Record<string, boolean>>({});

  return (
    <ICard>
      <IFlex gap={'var(--gap-03)'}>
        <Fragment>
          <IButton
            onClick={() => {
              recipe((ref) => {
                ref.dialog = true;
              });
            }}
          >
            对话框
          </IButton>
          <IModal
            closable
            open={store.dialog}
            title="我是标题"
            onOpenChange={(state) => {
              recipe((ref) => {
                ref.dialog = state;
              });
            }}
          >
            一个对话框
          </IModal>
        </Fragment>
        <Fragment>
          <IButton
            onClick={() => {
              recipe((ref) => {
                ref.nonFooter = true;
              });
            }}
          >
            隐藏底部
          </IButton>
          <IModal
            closable
            icon={<ISignLine ring type="helper" />}
            open={store.nonFooter}
            renders={{
              footer: () => null,
            }}
            title="快看，是标题！"
            onOpenChange={(state) => {
              recipe((ref) => {
                ref.nonFooter = state;
              });
            }}
          />
        </Fragment>
        <Fragment>
          <IButton
            onClick={() => {
              recipe((ref) => {
                ref.onlyHeader = true;
              });
            }}
          >
            仅标题
          </IButton>
          <IModal
            closable
            open={store.onlyHeader}
            renders={{
              cancel: () => null,
              confirm: () => null,
            }}
            title="我是标题"
            onOpenChange={(state) => {
              recipe((ref) => {
                ref.onlyHeader = state;
              });
            }}
          />
        </Fragment>
      </IFlex>
    </ICard>
  );
};

export default App;
