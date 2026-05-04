import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.MOVIE,
        element: <MoviePage />,
      },
    ],
  },
]);