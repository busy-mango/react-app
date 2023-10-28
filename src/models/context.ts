/**
 * @author 徐子梁
 */

import { ReactAction } from './common';

export interface AppContextVal {
  theme?: string;
  setTheme?: ReactAction<string>;
}
