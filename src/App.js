import { Outlet } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default App;
