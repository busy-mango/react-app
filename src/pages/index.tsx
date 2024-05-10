/**
 * @description 首页
 */

import { Fragment } from 'react/jsx-runtime';

import { Feedback } from '@/components/widgets/ifeedback';
import { useToggle } from '@/hooks';

const Welcome: React.FC = () => {
  const [open, { toggle }] = useToggle();
  return (
    <Fragment>
      Welcome
      <button onClick={toggle}>asd</button>
      <Feedback>
        {open && (
          <Fragment>
            <div>123123</div>
            <div>asdasd</div>
          </Fragment>
        )}
      </Feedback>
      <div>Welcome</div>
    </Fragment>
  );
};

export default Welcome;
