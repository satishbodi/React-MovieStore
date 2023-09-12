import { Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import Home from './pages/Home';
import Details from "./pages/Details";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
