import Calendar from './Calendar';
import NewEvent from './NewEvent';
import Home from './Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from './Register';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>} />
      <Route path="/NewEvent" element={<NewEvent/>} />
      <Route path="/NewEvent/:eventPar" element={<NewEvent/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Calendar" element={<Calendar/>} />
    </ Routes>
  </BrowserRouter>
);
export default App;