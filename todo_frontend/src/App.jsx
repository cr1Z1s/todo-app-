import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  return (
    <div className="App bg-gray-100 font-sans leading-normal tracking-normal">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
