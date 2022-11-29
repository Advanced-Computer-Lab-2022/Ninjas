import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddDiscount from './pages/AddDiscount';
import ChangeCountry from './components/ChangeCountry';
import ForgotPasswordPage from './components/ForgotPassword';
import InstructorCourses from './components/InstructorCourses';
import InstructorPage from './components/InstructorHome';
import RateCourse from './components/RateCourse';
import SolveExercise from './components/SolveExercise';
import TraineePage from './components/TraineeHome';
import TraineeSearch from './components/TraineeSearch';
import ChangePassword from './pages/ChangePassword';
import EditBiography from './pages/EditBiography';
import EditEmail from './pages/EditEmail';
import ViewInstRating from './pages/ViewInstRating';
import ViewAllCourses from './pages/ViewAllCourses';
import ViewCourseRatings from './pages/ViewCourseRatings';
import SubtitlePage from './pages/SubtitlePage';
import AddVideoCourse from './pages/AddVideoCourse';
import AddVideoSubtitle from './pages/AddVideoSubtitle';
import Terms from './pages/Terms';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/changePassword' element= {<ChangePassword/>} >
        </Route>
        <Route path='/editEmail' element= {<EditEmail/>} >
        </Route>
        <Route path='/editBiography' element= {<EditBiography/>} >
        </Route>
        <Route path='/addDiscount' element= {<AddDiscount/>} >
        </Route>
        <Route path='/viewInstReview' element= {<ViewInstRating/>} >
        </Route>
        <Route path='/view' element= {<ViewAllCourses/>} >
        </Route>
        <Route path='/getCourseRatings' element= {<ViewCourseRatings/>} >
        </Route>
        <Route path='/subtitlePage' element= {<SubtitlePage/>} >
        </Route>
        <Route path='/addVideoCourse' element= {<AddVideoCourse/>} >
        </Route>
        <Route path='/addVideoSubtitle' element= {<AddVideoSubtitle/>} >
        </Route>
        <Route path='/terms' element= {<Terms/>} >
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