import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import Detail from './components/Detail';
import PersonDetail from './components/PersonDetail';
import Movie from './pages/Movie';
import Home from './pages/Home';
import Serie from './pages/Serie';
import Person from './pages/Person';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function ConditionalRoute() {
  const { media } = useParams(); 

  return (
    <>
      {media === 'person' ? <PersonDetail /> : <Detail />}
    </>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Serie />} />
        <Route path="/person" element={<Person />} />
        <Route path="/:media/:id" element={<ConditionalRoute />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </Router>
  );
}

export default App;
