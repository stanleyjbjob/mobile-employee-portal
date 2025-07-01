import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../services/AuthContext';
import { theme } from '../utils/theme';

// Test App component
const TestApp = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NavigationContainer>
  </PaperProvider>
);

// Custom render function that includes providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: TestApp, ...options });

// Re-export everything
export * from '@testing-library/react-native';

// Override render method
export { customRender as render };