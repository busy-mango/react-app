import { Tab, Tabs } from 'rspress/theme';

import { Algorithm } from './algorithm';
import Email from './email';

import * as styles from './index.scss';

const App: React.FC = () => (
  <article className={styles.wrap}>
    <Tabs tabContainerClassName={styles.tabs}>
      <Tab label="邮件">
        <Email />
      </Tab>
      <Tab label="算法">
        <Algorithm />
      </Tab>
    </Tabs>
  </article>
);

export default App;

export const frontmatter = { pageType: 'custom' };
