import React from 'react';

import VideoProvider from './video';
import SpeechProvider from './speech';

type ProviderProps = {
  children?: React.ReactNode
};

const AppProvider: React.FC<ProviderProps> = ({ children }) => (
  <VideoProvider>
    <SpeechProvider>
      {children}
    </SpeechProvider>
  </VideoProvider>
);

export default AppProvider;