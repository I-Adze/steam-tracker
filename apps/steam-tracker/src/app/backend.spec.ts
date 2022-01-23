import { backend } from './backend';

describe('backend', () => {
  it('should fetch and return json on api call', async () => {
    const json = {};
    const response = { json: () => Promise.resolve(json) } as Response;
    global.fetch = jest.fn(() => Promise.resolve(response));
    const returned = await backend.getAllApps();
    expect(global.fetch).toHaveBeenCalled();
    expect(returned).toBe(json);
  });
});
