import { Fragment } from 'react/jsx-runtime';

import {
  IFieldCell,
  IFieldStack,
  IFormWrap,
  IInput,
  IPopover,
  ISelector,
  ISignLine,
  ISVGWrap,
} from '@/components';

const FieldLabel: React.FC<{
  title?: React.ReactNode;
  helper?: React.ReactNode;
}> = ({ title, helper }) => (
  <Fragment>
    {title}
    <IPopover
      content={helper}
      render={{
        reference: (props) => (
          <ISVGWrap
            style={{
              marginLeft: 'var(--gap-02)',
            }}
            {...props}
          >
            <ISignLine ring type="helper" />
          </ISVGWrap>
        ),
      }}
    />
  </Fragment>
);

const App: React.FC = () => (
  <IFormWrap>
    <IFieldStack
      cell={(width = -Infinity) => {
        const isNarrow = width < 800;
        const columns = isNarrow ? 1 : 2;
        const extra = isNarrow ? 0.5 : 1;
        const align = isNarrow ? 'flex-end' : 'flex-start';
        const grid = { label: 1, control: 2, extra };
        return { align, columns, grid };
      }}
    >
      <IFieldCell
        span={2}
        status="danger"
        title={
          <FieldLabel
            helper="Should be combination of numbers & alphabets"
            title="Fail"
          />
        }
      >
        <IInput
          id="error"
          placeholder="unavailable choice"
          status="danger"
          variant="bordered"
        />
      </IFieldCell>
      <IFieldCell status="warn" title="warn">
        <IInput id="warn" placeholder="warn" status="warn" variant="bordered" />
      </IFieldCell>
      <IFieldCell
        status="vaildating"
        title={
          <FieldLabel
            helper="The information is being validated..."
            title="Validating"
          />
        }
      >
        <IInput
          id="validating"
          placeholder="I'm the content is being validated"
          status="vaildating"
          variant="bordered"
        />
      </IFieldCell>
      <IFieldCell status="success" title="Success">
        <IInput
          id="success"
          placeholder="I'm the content"
          status="success"
          variant="bordered"
        />
      </IFieldCell>
      <IFieldCell status="warn" title="warn">
        <IInput
          id="warning2"
          placeholder="warn"
          status="warn"
          variant="bordered"
        />
      </IFieldCell>
      <IFieldCell
        span={3}
        status="danger"
        title={
          <FieldLabel
            helper="Should be combination of numbers & alphabets"
            title="Fail"
          />
        }
      >
        <IInput
          id="error2"
          placeholder="unavailable choice"
          status="danger"
          variant="bordered"
        />
      </IFieldCell>
      <IFieldCell status="danger" title="Error">
        <ISelector
          clearable
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
          placeholder="I'm Select"
          status="danger"
          style={{ width: '100%' }}
        />
      </IFieldCell>
      <IFieldCell span={2} status="success" title="Success">
        <IInput placeholder="with allowClear" variant="bordered" />
      </IFieldCell>
    </IFieldStack>
  </IFormWrap>
);

export default App;
