import './App.css';
import Canvas from './canvas';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import {AuthContextProvider} from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
