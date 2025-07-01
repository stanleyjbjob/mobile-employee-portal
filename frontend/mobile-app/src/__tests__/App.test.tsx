import React from 'react';
import { render, screen } from '../test/test-utils';
import App from '../../App';

// Mock expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: () => null,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Since the app shows a loading screen initially, we can't test for specific content
    // But we can verify it doesn't crash
    expect(true).toBe(true);
  });
});