import { cn } from '../index';

describe('cn helper', () => {
  it('returns a merged class string', () => {
    const result = cn('foo', 'bar');
    expect(typeof result).toBe('string');
    expect(result).toContain('foo');
    expect(result).toContain('bar');
  });
});
