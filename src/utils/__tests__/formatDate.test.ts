import { formatDateDisplay, formatDateToISO } from '../index';

describe('formatDate utilities', () => {
  it('formats date for display as DD/MM/YYYY', () => {
    const d = new Date(2026, 2, 5);
    expect(formatDateDisplay(d)).toBe('05/03/2026');
  });

  it('formats date to ISO YYYY-MM-DD', () => {
    const d = new Date(2026, 2, 5);
    expect(formatDateToISO(d)).toBe('2026-03-05');
  });
});
