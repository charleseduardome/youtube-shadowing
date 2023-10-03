import React from 'react';

import VideoProvider from './video';

type ProviderProps = {
  children?: React.ReactNode
};

const AppProvider: React.FC<ProviderProps> = ({ children }) => (
  <VideoProvider>
    {children}
  </VideoProvider>
);

export default AppProvider;