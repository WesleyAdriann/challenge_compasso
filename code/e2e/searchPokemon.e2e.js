import { element } from "prop-types";

describe('Search Pokemon', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should find pokemon with id 1 (bulbasaur)', async () => {
    await element(by.id('searchBarInput')).t
  })
})
