import { DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from 'jest-diff';
import { tokenize, printExpected, printReceived } from 'src/utils/print';

describe('print-util module', () => {
  const mockUtils = {
    EXPECTED_COLOR: (str: string) => `<expected>${str}</expected>`,
    RECEIVED_COLOR: (str: string) => `<received>${str}</received>`,
    INVERTED_COLOR: (str: string) => `<inverted>${str}</inverted>`,
  };

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

  describe('printExpected', () => {
    it('should format DIFF_EQUAL with EXPECTED_COLOR', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'equal']];
      const result = printExpected(mockUtils, diff);
      expect(result).toBe('<expected>equal</expected>');
    });

    it('should format DIFF_DELETE with INVERTED_COLOR and EXPECTED_COLOR', () => {
      const diff: [number, string][] = [[DIFF_DELETE, 'deleted']];
      const result = printExpected(mockUtils, diff);
      expect(result).toBe('<inverted><expected>deleted</expected></inverted>');
    });

    it('should ignore DIFF_INSERT', () => {
      const diff: [number, string][] = [[DIFF_INSERT, 'inserted']];
      const result = printExpected(mockUtils, diff);
      expect(result).toBe('');
    });

    it('should preserve whitespace and only color non-whitespace tokens', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'a b\n  c']];
      const result = printExpected(mockUtils, diff);
      expect(result).toBe('<expected>a</expected> <expected>b</expected>\n  <expected>c</expected>');
    });

    it('should handle multiple diff objects', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, 'equal'],
        [DIFF_DELETE, 'deleted'],
        [DIFF_INSERT, 'ignored'],
      ];
      const result = printExpected(mockUtils, diff);
      expect(result).toBe('<expected>equal</expected><inverted><expected>deleted</expected></inverted>');
    });
  });

  describe('printReceived', () => {
    it('should format DIFF_EQUAL with RECEIVED_COLOR', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'equal']];
      const result = printReceived(mockUtils, diff);
      expect(result).toBe('<received>equal</received>');
    });

    it('should format DIFF_INSERT with INVERTED_COLOR and RECEIVED_COLOR', () => {
      const diff: [number, string][] = [[DIFF_INSERT, 'inserted']];
      const result = printReceived(mockUtils, diff);
      expect(result).toBe('<inverted><received>inserted</received></inverted>');
    });

    it('should ignore DIFF_DELETE', () => {
      const diff: [number, string][] = [[DIFF_DELETE, 'deleted']];
      const result = printReceived(mockUtils, diff);
      expect(result).toBe('');
    });

    it('should preserve whitespace and only color non-whitespace tokens', () => {
      const diff: [number, string][] = [[DIFF_EQUAL, 'a b\n  c']];
      const result = printReceived(mockUtils, diff);
      expect(result).toBe('<received>a</received> <received>b</received>\n  <received>c</received>');
    });

    it('should handle multiple diff objects', () => {
      const diff: [number, string][] = [
        [DIFF_EQUAL, 'equal'],
        [DIFF_INSERT, 'inserted'],
        [DIFF_DELETE, 'ignored'],
      ];
      const result = printReceived(mockUtils, diff);
      expect(result).toBe('<received>equal</received><inverted><received>inserted</received></inverted>');
    });
  });
});
