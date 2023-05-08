import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MovieForm from "./MovieForm";
import UsersTable from "./UsersTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">Movie Application</header>
      <BrowserRouter>
        <Routes>
          <Route path="/movies" element={<UsersTable/> }/>
          <Route path="/movies/new" element={<MovieForm/>} />
          <Route path="/movies/update/:id" element={<MovieForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
