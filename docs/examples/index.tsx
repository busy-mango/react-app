import { Algorithm, configure, EmailApp } from 'docs/widgets';
import { Tab, Tabs } from 'rspress/theme';

import * as styles from './index.scss';

const App: React.FC = () => (
  <article className={styles.wrap}>
    <Tabs tabContainerClassName={styles.tabs}>
      <Tab label="邮件">
        <EmailApp />
      </Tab>
      <Tab label="算法">
        <Algorithm />
      </Tab>
    </Tabs>
  </article>
);

export default configure(App);

export const frontmatter = { pageType: 'custom' };
