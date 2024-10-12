import { Tab, Tabs } from 'rspress/theme';

import Email from './email';

const App: React.FC = () => (
  <Tabs>
    <Tab label="邮件">
      <Email />
    </Tab>
    <Tab label="Tab 2">Tab 2 content</Tab>
  </Tabs>
);

export default App;

export const frontmatter = {
  pageType: 'custom',
};
