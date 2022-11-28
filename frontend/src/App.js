import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChangeCountry from './components/ChangeCountry';
import ForgotPasswordPage from './components/ForgotPassword';
import InstructorCourses from './components/InstructorCourses';
import InstructorPage from './components/InstructorHome';
import RateCourse from './components/RateCourse';
import SolveExercise from './components/SolveExercise';
import TraineePage from './components/TraineeHome';
import TraineeSearch from './components/TraineeSearch';
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
        <Route path="/viewInstructorCourses"
        element={<InstructorCourses/>}/>
        <Route path="/traineeSearch"
        element={<TraineeSearch/>}/>
        <Route path="/rateCourse" element={<RateCourse/>}/>
        <Route path="/solveExercise" element={<SolveExercise/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 