/**
 * @author 徐子梁
 * @description 应用渲染
 */

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Configure } from '@/configure';
import { container, style } from '@/init';

import { DynamicPage } from './components/dynamic';
import { caniuse } from './caniuse';

import 'normalize.css';
import '@/styles/animate.global.scss';
import '@/styles/atom.global.scss';

const root = createRoot(container);

if (caniuse.test(navigator.userAgent)) {
  // 主题文件加载完成后再渲染应用
  style.onload = () => {
    root.render(
      <BrowserRouter>
        <Configure>
          <Routes>
            <Route element={<DynamicPage />} path="*" />
          </Routes>
        </Configure>
      </BrowserRouter>
    );
  };

  style.onerror = () => {
    console.error('主题样式加载失败');
  };
} else {
  root.render('暂不支持当前浏览器');
}
