/**
 * @description 应用渲染
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { t } from 'i18next';

import { container } from '@/init';

import { catchMsg } from './utils';

const root = createRoot(container, {
  onUncaughtError: () => {
    // handler...
  },
});

const { userAgent } = window.navigator;

try {
  const { IRoutes } = await import('./routes');

  const { caniuse } = await import('./caniuse');

  if (!caniuse.test(userAgent)) {
    throw new Error(t('common:Browser version incompatibility'));
  }

  root.render(
    <StrictMode>
      <BrowserRouter>
        <IRoutes />
      </BrowserRouter>
    </StrictMode>
  );
} catch (error) {
  root.render(catchMsg(error));
}
