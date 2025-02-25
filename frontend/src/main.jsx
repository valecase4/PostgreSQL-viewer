import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import DatabaseDetails from './DatabaseDetails.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/db/:dbName' element={<DatabaseDetails />} />
    </Routes>
  </BrowserRouter>
)
