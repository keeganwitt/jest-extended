import { DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from 'jest-diff';
import { printExpected, printReceived, tokenize } from 'src/utils/print';

describe('print-util module', () => {
  const mockUtils = {
    EXPECTED_COLOR: (s: string) => `EXPECTED(${s})`,
    RECEIVED_COLOR: (s: string) => `RECEIVED(${s})`,
    INVERTED_COLOR: (s: string) => `INVERTED(${s})`,
  };

  describe('tokenize', () => {
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
  });

  describe('printExpected', () => {
    it('should return colored string for expected diff', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, 'equal '],
        [DIFF_DELETE, 'delete'],
        [DIFF_INSERT, 'insert'],
      ];

      expect(printExpected(mockUtils, diff)).toBe('EXPECTED(equal) INVERTED(EXPECTED(delete))');
    });
  });

  describe('printReceived', () => {
    it('should return colored string for received diff', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, 'equal '],
        [DIFF_DELETE, 'delete'],
        [DIFF_INSERT, 'insert'],
      ];

      expect(printReceived(mockUtils, diff)).toBe('RECEIVED(equal) INVERTED(RECEIVED(insert))');
    });
  });
});
