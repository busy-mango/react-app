import { Route, Routes } from 'react-router-dom';

import { DynamicCase, DynamicPage } from './components';

export const IRoutes: React.FC = () => (
  <Routes>
    <Route element={<DynamicCase />} path="/examples/*" />
    <Route element={<DynamicPage />} path="*" />
  </Routes>
);
