import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/homepage';
import CursorCircle from './pages/cursorcircle';
import Expertise from './pages/expertise';
import Experience from './pages/experience';
import Projects  from './pages/projects';
import BibleApp from './pages/bibleapp';
import Contact from './pages/contact';
import Blog from './pages/blog';

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
        <Contact />
      </>
    } />  
    <Route path="/bible-app" element={<BibleApp />} />
    <Route path="/blog" element={<Blog />} />
  </Routes>
  </ BrowserRouter>);


}

export default App;
