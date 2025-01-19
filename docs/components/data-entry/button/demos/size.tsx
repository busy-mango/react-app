import { Fragment } from 'react';
import { Variants } from 'docs/widgets';

import {
  IButton,
  IFieldCell,
  IFieldStack,
  IFlex,
  ISignLine,
  ISwitch,
} from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [checked, { iCheck }] = useToggle();

  return (
    <Variants sizeable>
      {({ size }) => (
        <Fragment>
          <IFieldStack>
            <IFieldCell title="启用大按钮">
              <ISwitch checked={checked} onChange={iCheck} />
            </IFieldCell>
          </IFieldStack>
          <IFlex vertical gap="var(--gap-04)">
            <IFlex wrap gap={8}>
              <IButton isFullWidth={checked} size={size} variant="filled">
                主要按钮
              </IButton>
              <IButton isFullWidth={checked} size={size} variant="bordered">
                次要按钮
              </IButton>
              <IButton isFullWidth={checked} size={size} variant="text">
                文本按钮
              </IButton>
            </IFlex>
            <IFlex gap={8}>
              <IButton
                icon={<ISignLine ring type="helper" />}
                size="mini"
                variant="filled"
              >
                图标
              </IButton>
              <span>
                这是一段
                <IButton size="mini" variant="text">
                  按钮
                </IButton>
                文本
              </span>
            </IFlex>
          </IFlex>
        </Fragment>
      )}
    </Variants>
  );
};

export default App;
