import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './datas/store';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Flagame from './pages/Flagame/Flagame';
import Findate from './pages/Findate/Findate';
import Game from './pages/Squaredash/SquareDash';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/LePetitGameLab/' element={<App />} />
      <Route path='/LePetitGameLab/flagame' element={<Flagame />} />
      <Route path='/LePetitGameLab/findate' element={<Findate />} />
      <Route path='/LePetitGameLab/squareDash' element={<Game />} />
      <Route path='/*' element={<App />} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
