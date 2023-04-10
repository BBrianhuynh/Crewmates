import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Gallery from './components/Gallery'
import UpdateGallery from './components/UpdateGallery'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZnJwb21wZG9leGZ6bmJuZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTc4ODksImV4cCI6MTk5NjIzMzg4OX0.NaWkPAAbglwNsBkSNz9tn4Mnj5PQvtShjPE2M207jng';
const supabaseUrl = 'https://svfrpompdoexfznbndyu.supabase.co';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Gallery" element={<Gallery />}/>
        <Route path="/UpdateGallery/:id" element={<UpdateGallery />}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
