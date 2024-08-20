import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { StyleSheetTestUtils } from 'aphrodite';

// Configure Enzyme with the React 17 adapter
configure({ adapter: new Adapter() });

// Suppress style injection in tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Clear buffer and resume style injection after each test
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
