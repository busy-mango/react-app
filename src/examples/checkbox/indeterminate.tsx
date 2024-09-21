import { isTrue } from '@busymango/is-esm';
import { theLast } from '@busymango/utils';
import { useForm } from '@tanstack/react-form';

import {
  ICheckbox,
  IFieldCell,
  IFieldGrid,
  IFormPart,
  IFormWrap,
} from '@/components';

type FormData = {
  childs: boolean[];
};

const App: React.FC = () => {
  const api = useForm<FormData>({
    defaultValues: {
      childs: [false, false],
    },
  });

  const { Field, Subscribe, setFieldValue } = api;

  return (
    <IFormWrap>
      <IFormPart
        title={
          <Subscribe selector={({ values }) => values.childs}>
            {(childs) => (
              <ICheckbox
                checked={childs.every(isTrue)}
                indeterminate={childs.some((val) => val !== theLast(childs))}
                label="全选"
                onChange={({ target }) => {
                  setFieldValue('childs', (pre) =>
                    pre.map(() => target.checked)
                  );
                }}
              />
            )}
          </Subscribe>
        }
      >
        <IFieldGrid mode="horizontal" style={{ padding: '0 1em' }}>
          <Field name="childs">
            {({ state }) =>
              state.value?.map((_, i) => (
                <IFieldCell key={i}>
                  <Field name={`childs[${i}]`}>
                    {({ state, handleBlur, handleChange }) => (
                      <ICheckbox
                        checked={state.value}
                        label={i + 1}
                        onBlur={handleBlur}
                        onChange={({ target }) => {
                          handleChange(target.checked);
                        }}
                      />
                    )}
                  </Field>
                </IFieldCell>
              ))
            }
          </Field>
        </IFieldGrid>
      </IFormPart>
    </IFormWrap>
  );
};

export default App;
