
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Detail from './components/Detail';
import Movie from './pages/Movie';
import Home from './pages/Home';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/:media/:id" element={<Detail />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
    
  );
}


export default App;

