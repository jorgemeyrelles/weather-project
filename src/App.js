import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/home" replace /> } />
      <Route exact path="/home" element={ <Home /> } />
    </Routes>
  );
}

export default App;
