import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './components/Error/ErrorPage';
import UnderDevelopmentPage from './components/Error/UnderDevelopmentPage';
import Homepage from './components/Homepage/Homepage';
import Cart from './components/Cart/Cart';
import UserProfile from './components/UserProfile/UserProfile';
import courses from './components/Homepage/courses';
import Course from './components/Course/Course';
import VIewCourses from './components/Course/VIewCourses';
import { UserProvider } from './components/Context/UserContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import MyCart from './components/Cart/MyCart';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Homepage/>,
      },
      {
        path: '/shop',
        element: <UnderDevelopmentPage/>,
      },
      {
        path: '/review',
        element: <UnderDevelopmentPage/>,
      },
      {
        path: '/Courses',
        element: <VIewCourses/>,
      },
      {
        path: '/My Cart',
        element: <MyCart/>,
      },
      {
        path: '/Profile',
        element: <UserProfile/>,
      },
      {
        path: '/Login',
        element: <Login/>,
      },
      {
        path: '/Signup',
        element: <Signup/>,
      },
    ],
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider  router={router}/>
    </UserProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
