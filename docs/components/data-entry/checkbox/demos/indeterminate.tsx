import { isTrue } from '@busymango/is-esm';
import { theLast } from '@busymango/utils';
import { useForm } from '@tanstack/react-form';

import { ICheckbox, IFlex, IFormWrap } from '@/components';

type FormData = {
  childs: boolean[];
};

const App: React.FC = () => {
  const api = useForm<FormData>({
    defaultValues: {
      childs: [false, false, false],
    },
  });

  const { Field, Subscribe, setFieldValue } = api;

  return (
    <IFormWrap>
      <Subscribe selector={({ values }) => values.childs}>
        {(childs) => (
          <ICheckbox
            checked={childs.every(isTrue)}
            indeterminate={childs.some((val) => val !== theLast(childs))}
            label="全选"
            onChange={({ target }) => {
              setFieldValue('childs', (pre) => pre.map(() => target.checked));
            }}
          />
        )}
      </Subscribe>
      <IFlex>
        <Field name="childs">
          {({ state }) =>
            state.value?.map((_, i) => (
              <Field key={i} name={`childs[${i}]`}>
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
            ))
          }
        </Field>
      </IFlex>
    </IFormWrap>
  );
};

export default App;
