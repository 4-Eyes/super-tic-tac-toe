import { SuperTicTacToePage } from './app.po';

describe('super-tic-tac-toe App', () => {
  let page: SuperTicTacToePage;

  beforeEach(() => {
    page = new SuperTicTacToePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
