import * as ComponentsBarrel from '../index';

describe('components barrel export', () => {
  it('exports all component modules', () => {
    expect(ComponentsBarrel).toBeDefined();
    expect(ComponentsBarrel.Button).toBeTruthy();
    expect(ComponentsBarrel.Typography).toBeTruthy();
    expect(ComponentsBarrel.Heading).toBeTruthy();
    expect(ComponentsBarrel.ScreenLayout).toBeTruthy();
  });
});
