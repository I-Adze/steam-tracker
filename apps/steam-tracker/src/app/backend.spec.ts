import { backend } from './backend';

describe('backend', () => {
  it('should fetch on api call', async () => {
    global.fetch = jest.fn();
    await backend.getAllApps();
    expect(global.fetch).toHaveBeenCalled();
  });
});
