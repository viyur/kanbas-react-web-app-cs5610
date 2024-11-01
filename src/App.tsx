import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from './Labs';
import Kanbas from './Kanbas';
import { HashRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import store from "./Kanbas/store";
import { Provider } from "react-redux";

function App() {
  return (
    // at the top level you need hashrouter

    <HashRouter>
      <Provider store={store}>
        {/* <Link to="/Labs">Labs</Link> | <Link to="/Kanbas">Kanbas</Link> */}
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />

          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </Provider>
    </HashRouter>

  );
}

export default App;
