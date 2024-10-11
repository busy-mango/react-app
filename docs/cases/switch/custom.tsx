import classNames from 'classnames';
import { motion } from 'framer-motion';

import type {
  ISwitchIconRender,
  ISwitchRootRender,
  ISwitchThumbRender,
} from '@/components';
import { ISignLine, ISpinner, ISwitch } from '@/components';

import * as styles from './custom.scss';

const render = {
  icon: ((_, { checked }) => (
    <ISignLine
      color={checked ? 'var(--success-color)' : 'var(--danger-color)'}
      type={checked ? 'tick' : 'cross'}
    />
  )) satisfies ISwitchIconRender,
  thumb: (({ icon, className, ...others }, { isLoading }) => (
    <motion.div className={classNames(className, styles.thumb)} {...others}>
      {isLoading ? <ISpinner /> : icon}
    </motion.div>
  )) satisfies ISwitchThumbRender,
  root: (({ input, thumb, className }, { checked, pattren }) => (
    <span
      data-ui-switchroot
      className={className}
      style={{
        minWidth: 36,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          padding: 'var(--gap-02)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 12,
            borderRadius: 6,
            backgroundColor: checked
              ? 'var(--success-color)'
              : 'var(--danger-color)',
          }}
        />
      </div>
      {pattren !== 'readPretty' && thumb}
      {pattren !== 'readPretty' && input}
    </span>
  )) satisfies ISwitchRootRender,
};

const App: React.FC = () => <ISwitch render={render} />;

export default App;
