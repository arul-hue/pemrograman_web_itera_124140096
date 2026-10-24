import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Navbar title="Manajemen Buku" />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
        </Routes>
      </main>
    </BookProvider>
  );
}

export default App;
