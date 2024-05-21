import { useNavigate } from 'react-router-dom';

import { sleep } from '@busymango/utils';
import { useMutation } from '@tanstack/react-query';

import {
  IButton,
  IFieldCell,
  IFieldGrid,
  IFieldWrap,
  IFlex,
  IFormWrap,
  IInput,
  IMobilePage,
  IMotionPanel,
  IPopover,
} from '@/components';
import AccountSVG from '@/icons/account.svg';
import LockSVG from '@/icons/lock.svg';
import iBackgroundSrc from '@/images/page.png';

import styles from './index.scss';

const SystemLoginPage: React.FC = () => {
  const nav = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (_: React.UIEvent) => {
      await sleep(1000);
      // nav('/my-todo-list');
    },
  });

  return (
    <IMobilePage background={<img loading="eager" src={iBackgroundSrc} />}>
      <IFlex centered vertical className={styles.body}>
        <IFormWrap className={styles.form}>
          <IFlex centered className={styles.title}>
            <h1>欢迎登录</h1>
          </IFlex>
          <IFieldGrid margin="feedback" mode="horizontal" size="huge">
            <IFieldCell>
              <IFieldWrap
                size="huge"
                suffix={
                  <IPopover
                    content={'请输入用户账户asadasdas'}
                    render={(props) => (
                      <div {...props}>
                        <AccountSVG />
                      </div>
                    )}
                    trigger={'click'}
                    type="tip"
                  />
                }
                variant="bordered"
              >
                <IInput placeholder="用户账户" />
              </IFieldWrap>
            </IFieldCell>
            <IFieldCell>
              <IFieldWrap size="huge" suffix={<LockSVG />} variant="bordered">
                <IInput
                  autoComplete="on"
                  placeholder="登录密码"
                  type="password"
                />
              </IFieldWrap>
            </IFieldCell>
          </IFieldGrid>
          <IMotionPanel></IMotionPanel>
        </IFormWrap>
      </IFlex>
      <IFlex className="sticky-wrap">
        <IButton
          isFullWidth
          isLoading={isPending}
          size="huge"
          variant="filled"
          onClick={mutate}
        >
          登录
        </IButton>
      </IFlex>
    </IMobilePage>
  );
};

export default SystemLoginPage;
