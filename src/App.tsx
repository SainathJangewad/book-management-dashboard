import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Books from "./pages/books/Books";


export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </div>
  );
}
