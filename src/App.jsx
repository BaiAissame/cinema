
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Detail from './components/Detail';
import Movie from './pages/Movie';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/:media/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}


export default App;

