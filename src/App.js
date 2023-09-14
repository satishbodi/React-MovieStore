import { Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import Home from './pages/Home';
import Details from "./pages/Details";
import ActorDetails from "./pages/ActorDetails";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search/:query" element={<Search />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="actordetails/:id" element={<ActorDetails />} />
      </Routes>
    </div>
  );
}

export default App;
