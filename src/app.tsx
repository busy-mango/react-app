/**
 * @description 应用渲染
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { t } from 'i18next';

import { Configure } from '@/configure';
import { container, i18nInit, style } from '@/init';

import { caniuse } from './caniuse';
import { IRoutes } from './routes';
import { catchMsg } from './utils';

import '@/styles/normalize.css';
import '@/styles/atom.global.scss';

const root = createRoot(container);

const { userAgent } = window.navigator;

try {
  await i18nInit();

  if (!caniuse.test(userAgent)) {
    throw new Error(t('common:Browser version incompatibility'));
  }

  await new Promise((res, rej) => {
    style.addEventListener('load', res);
    style.addEventListener('error', rej);
    document.head.append(style);
  });

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
