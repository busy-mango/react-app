import { ifnot, sleep } from '@busymango/utils';
import { useForm } from '@tanstack/react-form';

import {
  IButton,
  ICard,
  IControlWrap,
  IFlex,
  IFormWrap,
  IInput,
  IModal,
  ITypography,
} from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [open, { on, toggle }] = useToggle();

  const { Field, handleSubmit, Subscribe } = useForm<{
    email?: string;
  }>({
    onSubmit: async ({ value }) => {
      console.info(value);
      await sleep(3000);
    },
  });

  return (
    <ICard>
      <IButton onClick={on}>对话框</IButton>
      <Subscribe>
        {({ isSubmitting, canSubmit }) => (
          <IModal
            closable
            isLoading={isSubmitting}
            open={open || isSubmitting}
            renders={{
              confirm: ({ onConfirm, onOpenChange }) => (
                <IButton
                  disabled={!canSubmit}
                  isLoading={isSubmitting}
                  variant="filled"
                  onClick={async (event) => {
                    const { nativeEvent } = event;
                    await onConfirm?.(event);
                    onOpenChange(false, nativeEvent, 'click');
                  }}
                >
                  订阅
                </IButton>
              ),
            }}
            title="订阅"
            onConfirm={handleSubmit}
            onOpenChange={toggle}
          >
            <IFlex vertical gap="var(--gap-05)">
              <ITypography>
                要订阅该网站，请在此处输入您的电子邮件地址。我们会偶尔发送更新。
              </ITypography>
              <IFormWrap>
                <Field name="email">
                  {({ state, handleBlur, handleChange }) => (
                    <IControlWrap variant="bordered">
                      <IInput
                        pattern={ifnot(isSubmitting && 'readOnly')}
                        placeholder="电子邮件地址"
                        type="email"
                        value={state.value}
                        width="100%"
                        onBlur={handleBlur}
                        onChange={({ currentTarget }) => {
                          handleChange(currentTarget.value);
                        }}
                      />
                    </IControlWrap>
                  )}
                </Field>
              </IFormWrap>
            </IFlex>
          </IModal>
        )}
      </Subscribe>
    </ICard>
  );
};

export default App;
