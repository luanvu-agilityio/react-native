import { getGreetingKey } from '../greeting-key';

const RealDate = Date;

describe('getGreetingKey', () => {
  afterEach(() => {
    global.Date = RealDate;
  });

  it('returns morning when hour 6', () => {
    global.Date = class extends RealDate {
      getHours() {
        return 6;
      }
    } as unknown as DateConstructor;
    expect(getGreetingKey()).toBe('morning');
  });

  it('returns afternoon when hour 13', () => {
    global.Date = class extends RealDate {
      getHours() {
        return 13;
      }
    } as unknown as DateConstructor;
    expect(getGreetingKey()).toBe('afternoon');
  });

  it('returns evening when hour 19', () => {
    global.Date = class extends RealDate {
      getHours() {
        return 19;
      }
    } as unknown as DateConstructor;
    expect(getGreetingKey()).toBe('evening');
  });

  it('returns night when hour 23', () => {
    global.Date = class extends RealDate {
      getHours() {
        return 23;
      }
    } as unknown as DateConstructor;
    expect(getGreetingKey()).toBe('night');
  });
});
