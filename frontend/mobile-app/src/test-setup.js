// Basic test setup for Jest
// Mock console for cleaner test output
global.console = {
  ...console,
  // Suppress warnings in tests
  warn: jest.fn(),
  error: jest.fn(),
};