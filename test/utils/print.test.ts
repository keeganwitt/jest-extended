import { DIFF_EQUAL, DIFF_INSERT, DIFF_DELETE } from 'jest-diff';
import { tokenize, printReceived, printExpected } from 'src/utils/print';

const mockUtils = {
  EXPECTED_COLOR: (str: string) => `<expected>${str}</expected>`,
  RECEIVED_COLOR: (str: string) => `<received>${str}</received>`,
  INVERTED_COLOR: (str: string) => `<inverted>${str}</inverted>`,
};

describe('print-util module', () => {
  it('should tokenize given string', () => {
    const tokens = tokenize('This function \n creates tokens \t keeping white-space intact.');

    expect(tokens).toEqual([
      {
        isWhitespace: false,
        value: 'This',
      },
      {
        isWhitespace: true,
        value: ' ',
      },
      {
        isWhitespace: false,
        value: 'function',
      },
      {
        isWhitespace: true,
        value: ' \n ',
      },
      {
        isWhitespace: false,
        value: 'creates',
      },
      {
        isWhitespace: true,
        value: ' ',
      },
      {
        isWhitespace: false,
        value: 'tokens',
      },
      {
        isWhitespace: true,
        value: ' \t ',
      },
      {
        isWhitespace: false,
        value: 'keeping',
      },
      {
        isWhitespace: true,
        value: ' ',
      },
      {
        isWhitespace: false,
        value: 'white-space',
      },
      {
        isWhitespace: true,
        value: ' ',
      },
      {
        isWhitespace: false,
        value: 'intact.',
      },
    ]);
  });
  it('should return empty array given empty string', () => {
    const tokens = tokenize('');

    expect(tokens).toEqual([]);
  });

  describe('printReceived', () => {
    it('should return empty string given empty diff', () => {
      expect(printReceived(mockUtils, [])).toEqual('');
    });

    it('should format DIFF_EQUAL', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'hello']];
      expect(printReceived(mockUtils, diff)).toEqual('<received>hello</received>');
    });

    it('should format DIFF_INSERT', () => {
      const diff: [number, string][] = [[DIFF_INSERT, 'world']];
      expect(printReceived(mockUtils, diff)).toEqual('<inverted><received>world</received></inverted>');
    });

    it('should ignore DIFF_DELETE', () => {
      const diff: [number, string][] = [[DIFF_DELETE, 'old']];
      expect(printReceived(mockUtils, diff)).toEqual('');
    });

    it('should format mixed diff with whitespace', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, ' '],
        [DIFF_INSERT, 'new '],
      ];
      expect(printReceived(mockUtils, diff)).toEqual(' <inverted><received>new</received></inverted> ');
    });
  });

  describe('printExpected', () => {
    it('should return empty string given empty diff', () => {
      expect(printExpected(mockUtils, [])).toEqual('');
    });

    it('should format DIFF_EQUAL', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'hello']];
      expect(printExpected(mockUtils, diff)).toEqual('<expected>hello</expected>');
    });

    it('should format DIFF_DELETE', () => {
      const diff: [number, string][] = [[DIFF_DELETE, 'old']];
      expect(printExpected(mockUtils, diff)).toEqual('<inverted><expected>old</expected></inverted>');
    });

    it('should ignore DIFF_INSERT', () => {
      const diff: [number, string][] = [[DIFF_INSERT, 'new']];
      expect(printExpected(mockUtils, diff)).toEqual('');
    });

    it('should format mixed diff with whitespace', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, 'foo'],
        [DIFF_DELETE, ' bar'],
      ];
      expect(printExpected(mockUtils, diff)).toEqual('<expected>foo</expected> <inverted><expected>bar</expected></inverted>');
    });
  });
});
