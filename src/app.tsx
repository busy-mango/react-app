/**
 * @description 应用渲染
 */

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Configure } from '@/configure';
import { container, style } from '@/init';

import { caniuse } from './caniuse';
import { IRoutes } from './routes';

import 'normalize.css';
import '@/styles/animate.global.scss';
import '@/styles/atom.global.scss';

const root = createRoot(container);

if (!caniuse.test(navigator.userAgent)) {
  root.render('暂不支持当前版本浏览器');
} else {
  // 主题文件加载完成后再渲染应用
  style.onload = () => {
    root.render(
      <BrowserRouter>
        <Configure>
          <IRoutes />
        </Configure>
      </BrowserRouter>
    );
  };

  style.onerror = () => {
    root.render('主题样式加载失败, 请刷新重试');
  };
}
