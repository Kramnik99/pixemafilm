import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { SearchPage } from '../pages/SearchPage';
import { FavoritesPage } from '../pages/FavoritesPage';

const routes: RouteObject[] = [
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/movie/:id',
        Component: MoviePage,
      },
      {
        path: '/search',
        Component: SearchPage,
      },
      {
        path: '/favorites',
        Component: FavoritesPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);