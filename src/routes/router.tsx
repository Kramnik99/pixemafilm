import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { SearchPage } from '../pages/SearchPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Activation } from '../pages/Activation';

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
      {
        path: '/login',
        Component: SignIn,
      },
      {
        path: '/register',
        Component: SignUp,
      },
      {
        path: '/activate',
        Component: Activation,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);