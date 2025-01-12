import { isInteger } from '@busymango/is-esm';
import { useForm } from '@tanstack/react-form';

import {
  IButton,
  ICard,
  IFieldCell,
  IFieldStack,
  IFlex,
  IFormWrap,
  IInput,
  ISignLine,
} from '@/components';
import { IFieldProvider } from '@/components/widgets/form-field/hooks';
import { iPropagation } from '@/utils';

export interface PeopleInfo {
  name: string;
  age: number;
}

const initial = { name: '', age: 0 } satisfies PeopleInfo;

const formatAge = (data: unknown) => {
  const num = Number(data);
  return isInteger(num) ? num : 0;
};

const App: React.FC = () => {
  const { Field, Subscribe, handleSubmit, pushFieldValue } = useForm({
    defaultValues: {
      people: [] as Array<PeopleInfo>,
    },
    onSubmit({ value }) {
      alert(JSON.stringify(value));
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
        <IFieldStack cell={{ margin: true }}>
          <Field mode="array" name="people">
            {({ state, pushValue, removeValue }) => (
              <IFieldProvider margin={false}>
                {state.value.map((_, i) => (
                  <IFieldCell
                    key={i}
                    extra={
                      <IFlex gap="var(--gap-04)" justify="flex-end">
                        <IButton
                          icon={<ISignLine type="plus" />}
                          size="mini"
                          onClick={() => {
                            pushValue(initial);
                          }}
                        />
                        <IButton
                          icon={<ISignLine type="minus" />}
                          size="mini"
                          onClick={() => {
                            removeValue(i);
                          }}
                        />
                      </IFlex>
                    }
                    grid={{ vertical: true }}
                    title={`人员${i + 1}`}
                  >
                    <Field name={`people[${i}].name`}>
                      {({ state, handleBlur, handleChange }) => (
                        <IFieldCell title={'名称'}>
                          <IInput
                            value={state.value}
                            variant="bordered"
                            onBlur={handleBlur}
                            onChange={({ target }) =>
                              handleChange(target.value)
                            }
                          />
                        </IFieldCell>
                      )}
                    </Field>
                    <Field name={`people[${i}].age`}>
                      {({ state, handleBlur, handleChange }) => (
                        <IFieldCell title={'年龄'}>
                          <IInput
                            value={state.value}
                            variant="bordered"
                            onBlur={handleBlur}
                            onChange={({ target }) =>
                              handleChange(formatAge(target.value))
                            }
                          />
                        </IFieldCell>
                      )}
                    </Field>
                  </IFieldCell>
                ))}
              </IFieldProvider>
            )}
          </Field>
          <IFieldCell>
            <IButton
              isFullWidth
              onClick={() => {
                pushFieldValue('people', initial);
              }}
            >
              新增
            </IButton>
          </IFieldCell>
          <IFieldCell>
            <IFlex justify="end">
              <Subscribe
                selector={({ canSubmit, isSubmitting }) => ({
                  canSubmit,
                  isSubmitting,
                })}
              >
                {({ canSubmit, isSubmitting }) => (
                  <IButton
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    提交
                  </IButton>
                )}
              </Subscribe>
            </IFlex>
          </IFieldCell>
        </IFieldStack>
      </IFormWrap>
    </ICard>
  );
};

export default App;
