/**
 * @description 应用渲染
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { t } from 'i18next';

import { container, i18nInit } from '@/init';

import { catchMsg } from './utils';

import '@/styles/root.css';
import '@/styles/normalize.css';
import '@/styles/transition.css';
import '@/styles/atom.global.scss';

const root = createRoot(container);

const { userAgent } = window.navigator;

try {
  await i18nInit();

  const { IRoutes } = await import('./routes');

  const { caniuse } = await import('./caniuse');

  const { Configure } = await import('@/configure');

  if (!caniuse.test(userAgent)) {
    throw new Error(t('common:Browser version incompatibility'));
  }

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Configure>
          <IRoutes />
        </Configure>
      </BrowserRouter>
    </StrictMode>
  );
} catch (error) {
  root.render(catchMsg(error));
}
