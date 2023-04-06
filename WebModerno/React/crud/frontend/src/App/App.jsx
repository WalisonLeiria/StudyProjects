import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import React from 'react';

import { RouterProvider } from "react-router-dom";

import Routes from './Routes';
import Logo from '../components/template/Logo/Logo';
import Nav from '../components/template/Nav/Nav';
import Footer from '../components/template/Footer/Footer';

function App(props) {
  return (
    <div className="app">
      <Logo></Logo>
      <Nav></Nav>
      <RouterProvider router={Routes} />
      <Footer></Footer>
    </div>
  );
}

export default App;
