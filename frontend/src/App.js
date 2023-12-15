import {Routes, Route} from 'react-router-dom';
import './App.css';
import Intro from './components/Intro.js';
import Hello from './components/Hello.js';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Intro />}></Route>
      <Route path='Hello' element={<Hello/>} />
    </Routes>
    // <Intro />
  );
}

export default App;
