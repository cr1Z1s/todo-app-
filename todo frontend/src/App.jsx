import { useState } from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
