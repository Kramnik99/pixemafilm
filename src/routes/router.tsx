import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { SearchPage } from '../pages/SearchPage';
import { ROUTES } from './routes';

const routes: RouteObject[] = [
  {
    Component: App,
    children: [
      {
        path: ROUTES.HOME,
        Component: HomePage,
      },
      {
        path: ROUTES.MOVIE,
        Component: MoviePage,
      },
      {
        path: ROUTES.SEARCH,
        Component: SearchPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);