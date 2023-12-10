/**
 * @author 徐子梁
 */

import type { ReactAction } from './react';

export interface AppContextVal {
  theme?: string;
  setTheme?: ReactAction<string>;
}
