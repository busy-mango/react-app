import { configure } from 'docs/widgets';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  IButton,
  ICard,
  IFieldCell,
  IFlex,
  IFormWrap,
  IInput,
  ISuspense,
} from '@/components';
import { iTanstackFieldCellAdapter } from '@/helpers';

const App: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { firstName: 'FirstName', lastName: 'LastName' };
    },
  });

  const saveUserMutation = useMutation({
    mutationFn: async (value: { firstName: string; lastName: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(value);
      return value;
    },
  });

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await saveUserMutation.mutateAsync(value);
    },
  });

  return (
    <ICard>
      <ISuspense isLoading={isLoading}>
        <IFormWrap
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                );
              },
            }}
          >
            {({ name, state, handleBlur, handleChange }) => (
              <IFieldCell
                title="名称"
                {...iTanstackFieldCellAdapter(state.meta)}
              >
                <IInput
                  id={name}
                  name={name}
                  value={state.value}
                  variant="bordered"
                  onBlur={handleBlur}
                  onChange={({ target }) => handleChange(target.value)}
                />
              </IFieldCell>
            )}
          </Field>
          <Field name="lastName">
            {({ name, state, handleBlur, handleChange }) => (
              <IFieldCell
                title="姓氏"
                {...iTanstackFieldCellAdapter(state.meta)}
              >
                <IInput
                  id={name}
                  name={name}
                  value={state.value}
                  variant="bordered"
                  onBlur={handleBlur}
                  onChange={({ target }) => handleChange(target.value)}
                />
              </IFieldCell>
            )}
          </Field>
          <IFieldCell>
            <Subscribe
              selector={({ canSubmit, isSubmitting }) => ({
                canSubmit,
                isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <IFlex gap={'var(--gap-04)'} justify="flex-end">
                  <IButton type="reset" onClick={() => reset()}>
                    重置
                  </IButton>
                  <IButton
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    提交
                  </IButton>
                </IFlex>
              )}
            </Subscribe>
          </IFieldCell>
        </IFormWrap>
      </ISuspense>
    </ICard>
  );
};

export default configure(App);
