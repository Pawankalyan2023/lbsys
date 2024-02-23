import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainindex from "./Components/Mainindex";
import Specific from "./Components/Specific";
import Singin from "./Auth/Singin";
import Signup from "./Auth/Singup";
import Adminauth from "./Auth/Adminauth";
import Adminmain from "./Admin/Adminmain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminmain" Component={Adminmain} />
        <Route path="/" Component={Singin} />
        <Route path="/adminauth" Component={Adminauth} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={Mainindex} />
        <Route path="/specific" Component={Specific} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
