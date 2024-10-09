import { useContext, useEffect } from 'react';
import { ThemeContext } from 'rspress/runtime';

import { iThemeRoot } from '@/utils';

const Index: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    iThemeRoot.classList.add(theme);
    return () => {
      iThemeRoot.classList.remove(theme);
    };
  }, [theme]);
  return null;
};

export default Index;
