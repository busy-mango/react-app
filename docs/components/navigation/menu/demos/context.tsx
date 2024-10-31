import { useRef } from 'react';

import { useToggle } from '@/hooks';

const App: React.FC = () => {
  const ref = useRef(null);
  const [open, { toggle, off }] = useToggle();
  return (
    <article ref={ref}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
      purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
      bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
      dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
      quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis
      finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
      finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
      metus vel maximus consequat. Suspendisse lacinia tellus a libero volutpat
      maximus.
      {/* <IPopover
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
        ctx={ref}
        // open={open}
        placement="bottom-start"
        trigger="ctx"
        variant="card"
        // onOpenChange={toggle}
      /> */}
    </article>
  );
};

export default App;
