// config/setupTestsAfterEnv.js
import { StyleSheetTestUtils } from 'aphrodite';

// Suppress aphrodite style injection for all tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
