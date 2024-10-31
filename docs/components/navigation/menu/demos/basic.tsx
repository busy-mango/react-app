import { isEmpty } from '@busymango/is-esm';

import { IButton, IMenu, IPopover } from '@/components';
import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const [open, { toggle, off }] = useToggle();
  return (
    <IPopover
      content={
        <IMenu
          multiple
          options={[
            { label: '个人资料', value: 'profile' },
            { label: '账号信息', value: 'account' },
            { label: '系统设置', value: 'setting' },
          ]}
          style={{ padding: 'var(--gap-03) 0' }}
          onChange={(value) => {
            !isEmpty(value) && off();
          }}
        />
      }
      open={open}
      placement="bottom-start"
      render={{
        reference: (props) => <IButton {...props}>菜单</IButton>,
      }}
      trigger="click"
      variant="card"
      onOpenChange={toggle}
    />
  );
};

export default App;
