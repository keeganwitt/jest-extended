import * as matcher from 'src/matchers/toIncludeRepeated';

expect.extend(matcher);

describe('.toIncludeRepeated security', () => {
  test('should treat special characters as literals', () => {
    // '.' matches any character in regex. If not escaped, this passes.
    // If escaped, it should only match literal dots.
    expect('aaa').not.toIncludeRepeated('.', 3);
    expect('...').toIncludeRepeated('.', 3);
  });

  test('should not be vulnerable to ReDoS via complex patterns', () => {
    // This pattern is slow in many regex engines if not anchored or handled properly
    // But here we want it to be treated as a literal string.
    const dangerous = '(a+)+$';
    expect('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!').toIncludeRepeated(dangerous, 0);
  });
});
