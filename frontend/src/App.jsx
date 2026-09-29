import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;