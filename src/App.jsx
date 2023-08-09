import { useState } from 'react'
import {Header} from "./components/Header.jsx";
import {Main} from "./components/Main.jsx";

function App() {
    const [token, setToken] = useState("");
    const [existeToken, setExisteToken] = useState(false);
  return (
    <div>
       <Header
           token={token}
           setToken={setToken}
           existeToken={existeToken}
           setExisteToken={setExisteToken}
       />
        {existeToken && <Main />}
    </div>
  )
}

export default App
