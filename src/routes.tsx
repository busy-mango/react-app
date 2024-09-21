import { Route, Routes } from 'react-router-dom';

import { DynamicPage } from './components';

export const IRoutes: React.FC = () => (
  <Routes>
    <Route element={<DynamicPage />} path="*" />
  </Routes>
);
