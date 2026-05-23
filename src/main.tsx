import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './store'
import { router } from './routes/router'
import { FavoritesProvider } from './context/FavoritesContext'

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </Provider>
  </React.StrictMode>,
)