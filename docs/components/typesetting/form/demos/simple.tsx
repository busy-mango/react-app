import { Fragment } from 'react';

import { isEmpty } from '@busymango/is-esm';
import { ifnot, sleep } from '@busymango/utils';
import { useForm } from '@tanstack/react-form';

import type { ControlUIStatus } from '@/components';
import {
  IButton,
  ICard,
  IControlWrap,
  IFieldCell,
  IFlex,
  IFormWrap,
  IInput,
  IPopover,
  ISignLine,
  ISVGWrap,
  onInputCatch,
} from '@/components';
import { isEmailString } from '@/utils';

const App: React.FC = () => {
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
      <IFormWrap cell={{ margin: true }} onSubmit={handleSubmit}>
        <Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              if (isEmpty(value)) {
                return;
              }
              if (!isEmailString(value)) {
                return '请输入有效的电子邮件地址';
              }
            },
            onSubmit: ({ fieldApi }) => {
              fieldApi.validate('blur');
              fieldApi.validate('change');
              return undefined;
            },
            onChange: ({ value, fieldApi }) => {
              if (isEmpty(value)) {
                return '请输入您的电子邮件地址';
              }
              const { isBlurred } = fieldApi.state.meta;
              if (isBlurred) fieldApi.validate('blur');
            },
          }}
        >
          {({ state: { meta, value }, handleBlur, handleChange }) => {
            const { errors } = meta;
            const isError = errors.length > 0;
            const status: ControlUIStatus = ifnot(isError && 'danger');
            return (
              <IFieldCell
                feedback={isError && errors.join(', ')}
                status={status}
                title={
                  <Fragment>
                    邮箱
                    <IPopover
                      content="您的电子邮件地址将用于登录和找回密码。"
                      placement="top"
                      render={{
                        reference: (props) => (
                          <ISVGWrap
                            style={{
                              cursor: 'help',
                              padding: '0 var(--gap-01)',
                            }}
                            {...props}
                          >
                            <ISignLine ring type="helper" />
                          </ISVGWrap>
                        ),
                      }}
                      trigger="hover"
                    />
                  </Fragment>
                }
              >
                <IControlWrap status={status} variant="bordered">
                  <IInput
                    placeholder="电子邮件地址"
                    type="email"
                    value={value}
                    width="100%"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(onInputCatch(event));
                    }}
                  />
                </IControlWrap>
              </IFieldCell>
            );
          }}
        </Field>
        <IFlex justify="flex-end">
          <Subscribe>
            {({ canSubmit, isSubmitting }) => (
              <IButton
                disabled={!canSubmit}
                isLoading={isSubmitting}
                type="button"
              >
                提交
              </IButton>
            )}
          </Subscribe>
        </IFlex>
      </IFormWrap>
    </ICard>
  );
};

export default App;
