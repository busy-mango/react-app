import { Tab, Tabs } from 'rspress/theme';

import Email from './email';

import * as styles from './index.scss';

const App: React.FC = () => (
  <article className={styles.wrap}>
    <Tabs tabContainerClassName={styles.tabs}>
      <Tab label="邮件">
        <Email />
      </Tab>
      <Tab label="Tab 2">Tab 2 content</Tab>
    </Tabs>
  </article>
);

export default App;

export const frontmatter = { pageType: 'custom' };
