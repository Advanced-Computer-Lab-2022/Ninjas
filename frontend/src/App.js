import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChangeCountry from './components/ChangeCountry';
import ForgotPasswordPage from './components/ForgotPassword';
import InstructorPage from './components/InstructorHome';
import TraineePage from './components/TraineeHome';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element= {<ChangePassword/>} >
        </Route>
        <Route path="/instructor"
        element={<InstructorPage/>}/>
        <Route path="/changeCountry"
        element={<ChangeCountry/>}/>
        <Route path="/trainee"
        element={<TraineePage/>}/>
        <Route path="/forgotPassword"
        element={<ForgotPasswordPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 