import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/homepage';
import CursorCircle from './pages/cursorcircle';
import Expertise from './pages/expertise';
import Experience from './pages/experience';
import Projects  from './pages/projects';
import BibleApp from './pages/bibleapp';

function App() {
  return (<BrowserRouter>
  <Routes>
    <Route path="/" element={
      <>
        <CursorCircle />
        <Homepage />
        <Expertise />
        <Experience />
        <Projects />
      </>
    } />  
    <Route path="/bible-app" element={<BibleApp />} />
  </Routes>
  </ BrowserRouter>);


}

export default App;
