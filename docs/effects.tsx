import { useContext, useEffect } from 'react';
import { ThemeContext } from 'rspress/runtime';

import { iThemeRoot } from '@/init';

import 'assets/themes/dark.css';
import 'assets/themes/light.css';

const Effects: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    iThemeRoot.classList.add(theme);
    return () => iThemeRoot.classList.remove(theme);
  }, [theme]);

  return null;
};

export default Effects;
