import { useContext, useEffect } from 'react';
import { ThemeContext } from 'rspress/runtime';

import { container } from '@/init';

import 'assets/themes/dark.css';
import 'assets/themes/light.css';

const { classList } = container;

const Effects: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    classList.add(theme);
    return () => classList.remove(theme);
  }, [theme]);

  return null;
};

export default Effects;
