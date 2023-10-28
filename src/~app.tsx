/**
 * @author 徐子梁
 * @description 应用渲染
 */

import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Configure } from '@components/index';
import { PageLoader } from '@routers/index';

import { container, style } from '@/~init';

import 'normalize.css';
import '@styles/reset.global.css';
import '@styles/default.global.css';
import '@styles/animate.global.css';
import '@styles/atom.global.css';

const App: React.FC = () => {
  return (
    // <Configure>
    //   <Header />
    <Configure>
      <Routes>
        <Route path="*" element={<PageLoader />} />
      </Routes>
    </Configure>
    //   <Footer />
  );
};

// 主题文件加载完成后再渲染应用
style.onload = () => {
  createRoot(container).render(
    <Suspense>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>,
  );
};

style.onerror = () => {
  console.error('主题样式加载失败');
};
