import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChangeCountry from './components/ChangeCountry';
import InstructorPage from './components/InstructorHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/instructor"
        element={<InstructorPage/>}/>
        <Route path="/changeCountry"
        element={<ChangeCountry/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
