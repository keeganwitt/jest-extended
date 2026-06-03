import * as matchers from 'src/matchers';

describe('src/all/index.ts', () => {
  // @ts-expect-error - expect is on global
  const originalExpect = global.expect;

  afterEach(() => {
    // @ts-expect-error - expect is on global
    global.expect = originalExpect;
  });

  it('should throw error when global.expect is undefined', () => {
    // @ts-expect-error - testing error path
    global.expect = undefined;

    jest.isolateModules(() => {
      // Use originalExpect here because global.expect was set to undefined
      originalExpect(() => {
        require('src/all/index');
      }).toThrow(
        "Unable to find Jest's global expect. " +
          'Please check you have added jest-extended correctly to your jest configuration. ' +
          'See https://github.com/jest-community/jest-extended#setup for help.',
      );
    });
  });

  it('should extend jest expect when global.expect is defined', () => {
    const mockExpect = {
      extend: jest.fn(),
    };

    // @ts-expect-error - mocking global expect
    global.expect = mockExpect;

    jest.isolateModules(() => {
      require('src/all/index');
    });

    originalExpect(mockExpect.extend).toHaveBeenCalledTimes(1);
    const calledMatchers = mockExpect.extend.mock.calls[0][0];

    // Check that some known matchers are present, by name
    originalExpect(calledMatchers.toBeEven).toBeDefined();
    originalExpect(calledMatchers.toBeArray).toBeDefined();
    originalExpect(Object.keys(calledMatchers)).toEqual(Object.keys(matchers));
  });
});
