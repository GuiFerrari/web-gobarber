import React from 'react';

import { AuthProvider } from './auth';
import { ToasProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToasProvider>{children}</ToasProvider>
  </AuthProvider>
);

export default AppProvider;
