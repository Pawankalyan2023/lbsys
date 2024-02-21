import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainindex from "./Components/Mainindex";
import Specific from "./Components/Specific";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" Component={Mainindex} />
          <Route path="/specific" Component={Specific} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
