import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './app';
import { backend } from './backend';

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(backend, 'getAllApps').mockReturnValue(
      Promise.resolve([
        { appid: 1234, name: 'test' },
        { appid: 2345, name: 'test2' },
      ])
    );
  });

  it('should render the elements returned from the backend', async () => {
    let app: RenderResult | undefined;

    await act(async () => {
      app = render(<App />);
    });

    expect(
      app?.getByRole('button', {
        name: /1234: test/i,
      })
    ).toBeDefined();
  });
});
