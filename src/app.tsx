/**
 * @description 应用渲染
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Configure } from '@/configure';
import { container, style } from '@/init';

import { caniuse } from './caniuse';
import { IRoutes } from './routes';
import { isMobile } from './utils';

import 'normalize.css';
import '@/styles/atom.global.scss';

const root = createRoot(container);

const { userAgent } = window.navigator;

if (isMobile(userAgent) || caniuse.test(userAgent)) {
  // 主题文件加载完成后再渲染应用
  style.onload = () => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <Configure>
            <IRoutes />
          </Configure>
        </BrowserRouter>
      </StrictMode>
    );
  };

  style.onerror = () => {
    root.render('主题样式加载失败, 请刷新重试');
  };
} else {
  root.render('暂不支持当前版本浏览器');
}
