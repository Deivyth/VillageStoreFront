import { CurrencyEURPipe } from './currency-eur.pipe';

describe('CurrencyEURPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyEURPipe();
    expect(pipe).toBeTruthy();
  });
});
