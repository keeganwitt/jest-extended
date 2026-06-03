import * as matcher from 'src/matchers/toHaveBeenCalledAfter';

expect.extend(matcher);

describe('.toHaveBeenCalledAfter', () => {
  test('fails when given first mock has not been called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('fails when given first mock that has been called and a second mock that has not been called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('passes when given first mock is called after second mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    mock1();
    expect(mock1).toHaveBeenCalledAfter(mock2);
  });

  test('fails when given second mock is called after first mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    mock2();
    mock1.mock.invocationCallOrder[0] = 4000; // amend the value for the snapshot
    mock2.mock.invocationCallOrder[0] = 5000;
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('fails when given first mock is called before multiple calls to second mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    mock2();
    mock1();
    mock2();
    mock2();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('passes when given first mock is called after several calls to second mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    mock1();
    mock1();
    mock1();
    mock1.mock.invocationCallOrder[0] = 5000; // amend the value for the snapshot
    mock1.mock.invocationCallOrder[1] = 6000;
    mock1.mock.invocationCallOrder[2] = 7000;
    mock2.mock.invocationCallOrder[0] = 4000;
    expect(mock1).toHaveBeenCalledAfter(mock2);
  });

  test('fails when given first value is not a jest spy or mock', () => {
    const mock1 = () => {};
    const mock2 = jest.fn();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('fails when given second value is not a jest spy or mock', () => {
    const mock1 = jest.fn();
    const mock2 = () => {};
    // @ts-expect-error  testing non-matching type intentionally
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('passes when given first timestamps does not contain a timestamp less than any of the second timestamps', () => {
    const now = Date.now();
    const lessThan = now - 100;
    const greaterThan = now + 100;

    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1.mock.invocationCallOrder[0] = greaterThan; // amend the value for the snapshot
    mock1.mock.invocationCallOrder[1] = now;
    mock1.mock.invocationCallOrder[1] = greaterThan;
    mock2.mock.invocationCallOrder[0] = lessThan;
    expect(mock1).toHaveBeenCalledAfter(mock2);
  });

  describe('failIfNoFirstInvocation is passed as false', () => {
    test('passes when given first mock has not been called', () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();

      expect(mock1).toHaveBeenCalledAfter(mock2, false);
    });
  });

  describe('failIfNoFirstInvocation is passed as true', () => {
    test('failed when given first mock has not been called', () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();

      expect(() => expect(mock1).toHaveBeenCalledAfter(mock2, true)).toThrowErrorMatchingSnapshot();
    });
  });

  test('fails when given first mock is called but second mock is not called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('fails when given first mock is called but second mock is not called and failIfNoFirstInvocation is false', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2, false)).toThrowErrorMatchingSnapshot();
  });

  test('fails when given first mock is not called and second mock is called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('passes when given first mock is not called and second mock is called and failIfNoFirstInvocation is false', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    expect(mock1).toHaveBeenCalledAfter(mock2, false);
  });

  test('passes when first smallest invocation is after second smallest invocation', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2(); // 1
    mock1(); // 2
    mock2(); // 3
    mock1(); // 4
    expect(mock1).toHaveBeenCalledAfter(mock2);
  });

  test('fails when first smallest invocation is before second smallest invocation', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1(); // 1
    mock2(); // 2
    mock1(); // 3
    mock2(); // 4
    expect(() => expect(mock1).toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });
});

describe('.not.toHaveBeenCalledAfter', () => {
  test('passes when given a first mock has not been called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('passes when given first mock that has been called and a second mock that has not been called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    mock1.mock.invocationCallOrder[0] = 4000; // amend the value for the snapshot
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('passes when given second mock is called after first mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    mock2();
    mock1.mock.invocationCallOrder[0] = 4000; // amend the value for the snapshot
    mock2.mock.invocationCallOrder[0] = 5000;
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('fails when given first mock is called after second mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    mock1();
    expect(() => expect(mock1).not.toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  test('passes when given second mock is called after multiple calls to first mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    mock2();
    mock1();
    mock2();
    mock2();

    mock1.mock.invocationCallOrder[0] = 4000; // amend the value for the snapshot
    mock1.mock.invocationCallOrder[1] = 6000;
    mock2.mock.invocationCallOrder[0] = 5000;
    mock2.mock.invocationCallOrder[1] = 7000;
    mock2.mock.invocationCallOrder[2] = 8000;
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('fails when given first mock is called after several calls to second mock', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    mock1();
    mock1();
    mock1();
    expect(() => expect(mock1).not.toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });

  describe('failIfNoFirstInvocation is passed as false', () => {
    test('failed when given first mock has not been called', () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();

      expect(() => expect(mock1).not.toHaveBeenCalledAfter(mock2, false)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('failIfNoFirstInvocation is passed as true', () => {
    test('passes when given first mock has not been called', () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();

      expect(mock1).not.toHaveBeenCalledAfter(mock2, true);
    });
  });

  test('passes when given first mock is called but second mock is not called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('passes when given first mock is called but second mock is not called and failIfNoFirstInvocation is false', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1();
    expect(mock1).not.toHaveBeenCalledAfter(mock2, false);
  });

  test('passes when given first mock is not called and second mock is called', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('fails when given first mock is not called and second mock is called and failIfNoFirstInvocation is false', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2();
    expect(() => expect(mock1).not.toHaveBeenCalledAfter(mock2, false)).toThrowErrorMatchingSnapshot();
  });

  test('passes when first smallest invocation is before second smallest invocation', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock1(); // 1
    mock2(); // 2
    mock1(); // 3
    mock2(); // 4
    expect(mock1).not.toHaveBeenCalledAfter(mock2);
  });

  test('fails when first smallest invocation is after second smallest invocation', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    mock2(); // 1
    mock1(); // 2
    mock2(); // 3
    mock1(); // 4
    expect(() => expect(mock1).not.toHaveBeenCalledAfter(mock2)).toThrowErrorMatchingSnapshot();
  });
});
