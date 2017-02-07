import { FreeRecyclingAppPage } from './app.po';

describe('free-recycling-app App', function() {
  let page: FreeRecyclingAppPage;

  beforeEach(() => {
    page = new FreeRecyclingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
