/**
 * @description 首页
 */

import { t } from 'i18next';

const Welcome: React.FC = () => {
  return t('common:Hallo world', {
    components: {
      italic: <i />,
      bold: <strong />,
      code: <pre />,
    },
  });
};

export default Welcome;
