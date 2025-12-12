import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/api/tmdb', () => ({
  getPopularMovies: jest.fn(() => Promise.resolve({ results: [] })),
  getMovieDetails: jest.fn(() => Promise.resolve({})),
  getPosterUrl: jest.fn(() => null),
}));

test('renders app header', async () => {
  render(<App />);
  expect(screen.getByText(/movie db/i)).toBeInTheDocument();
  await screen.findByText(/showing/i);
});
