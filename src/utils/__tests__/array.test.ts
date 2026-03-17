import { chunkIntoRows } from '../index';

describe('chunkIntoRows', () => {
  it('splits array into rows of given size', () => {
    const input = [1, 2, 3, 4, 5];
    const out = chunkIntoRows<number>(input, 2);
    expect(out).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns empty array for empty input', () => {
    expect(chunkIntoRows([], 3)).toEqual([]);
  });
});
