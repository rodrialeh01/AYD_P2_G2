import { useState } from "react";
import "./App.css";
import SidebarCliente from "./components/Sidebar/SidebarCliente";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <SidebarCliente />
      </div>
    </>
  );
}

export default App;
