import { render, screen } from '@testing-library/react';
import Portfolio from './Portfolio';

// jsdom doesn't implement these — stub so the component can mount.
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
});

test('renders my name in the hero', () => {
  render(<Portfolio />);
  expect(screen.getAllByText(/Gagan/i).length).toBeGreaterThan(0);
});
