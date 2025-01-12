import { isEmpty, isNonEmptyArray } from '@busymango/is-esm';
import { sleep } from '@busymango/utils';
import type { FieldMeta, FieldState, Updater } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';

import type { IFieldCellProps } from '@/components';
import {
  IButton,
  ICard,
  IFieldCell,
  IFieldStack,
  IFlex,
  IFormWrap,
  IInput,
} from '@/components';
import { iPropagation } from '@/utils';

const iFeedback = ({
  isValidating,
  isTouched,
  errors,
}: FieldMeta): Pick<IFieldCellProps, 'status' | 'feedback'> => ({
  status: isValidating
    ? 'vaildating'
    : isNonEmptyArray(errors)
      ? 'danger'
      : 'success',
  feedback: isTouched && errors?.[0]?.toString(),
});

const render = (
  {
    name,
    state,
    handleBlur,
    handleChange,
  }: {
    name: string;
    state: FieldState<string>;
    handleBlur: () => void;
    handleChange: (updater: Updater<string>) => void;
  },
  title: React.ReactNode
) => (
  <IFieldCell {...iFeedback(state.meta)} title={title}>
    <IInput
      id={name}
      name={name}
      value={state.value}
      variant="bordered"
      onBlur={handleBlur}
      onChange={({ target }) => handleChange(target.value)}
    />
  </IFieldCell>
);

const App: React.FC = () => {
  const { Field, Subscribe, reset, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      console.info(value);
    },
  });

  return (
    <ICard>
      <IFormWrap
        onSubmit={(event) => {
          iPropagation(event);
          handleSubmit();
        }}
      >
        <IFieldStack cell={{ margin: true, align: 'end' }}>
          <Field
            name="firstName"
            validators={{
              onChange: ({ value }) => isEmpty(value) && '该字段必填',
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await sleep(1000);
                return value.includes('?') && '不允许输入特殊字符';
              },
            }}
          >
            {(api) => render(api, '名字')}
          </Field>
          <Field name="lastName">{(api) => render(api, '姓氏')}</Field>
          <IFieldCell>
            <Subscribe
              selector={({ canSubmit, isSubmitting }) => ({
                canSubmit,
                isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <IFlex gap={'var(--gap-04)'} justify="end">
                  <IButton
                    key={1}
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    提交
                  </IButton>
                  <IButton key={2} type="reset" onClick={() => reset()}>
                    重置
                  </IButton>
                </IFlex>
              )}
            </Subscribe>
          </IFieldCell>
        </IFieldStack>
      </IFormWrap>
    </ICard>
  );
};

export default App;
