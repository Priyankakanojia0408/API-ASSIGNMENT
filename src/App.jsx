import React from "react";  
import TriviaGame from "./components/TriviaGame/TriviaGame";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


  return (

    //<div>
      //<TriviaGame />
    //</div>

     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        //path="/game"
        //element={isLoggedIn ? <TriviaGame /> : <Navigate to="/" />}
        path="/game" element={<TriviaGame />} />

    </Routes>
  );
}


export default App;
