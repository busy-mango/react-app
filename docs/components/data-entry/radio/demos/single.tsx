import { useForm } from '@tanstack/react-form';

import { IFieldCell, IFieldGrid, IFlex, IFormWrap, IRadio } from '@/components';
import { iThemeVariable } from '@/utils';

const App: React.FC = () => {
  const { Field } = useForm<{
    fir?: string;
    sec?: string;
  }>({});
  return (
    <IFormWrap>
      <IFieldGrid align="flex-end" mode="single">
        <IFieldCell title="字段">
          <Field name="fir">
            {({ state, setValue }) => (
              <IFlex gap={iThemeVariable('--gap-03')}>
                {['A', 'C'].map((value) => (
                  <IRadio
                    key={value}
                    aria-label={value}
                    checked={state.value === value}
                    label={value}
                    value={value}
                    onChange={({ target }) => {
                      setValue(target.value);
                    }}
                  />
                ))}
              </IFlex>
            )}
          </Field>
        </IFieldCell>
      </IFieldGrid>
    </IFormWrap>
  );
};

export default App;
