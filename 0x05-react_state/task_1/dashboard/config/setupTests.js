import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });
// Mock window.alert globally
global.alert = jest.fn();