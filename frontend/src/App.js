import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddDiscount from './pages/AddDiscount';
import ChangeCountry from './components/ChangeCountry';
import ForgotPasswordPage from './components/ForgotPassword';
import InstructorPage from './components/InstructorHome';
import TraineePage from './components/TraineeHome';
import ChangePassword from './pages/ChangePassword';
import EditBiography from './pages/EditBiography';
import EditEmail from './pages/EditEmail';
import ViewInstRating from './pages/ViewInstRating';
import ViewAllCourses from './pages/ViewAllCourses';
import ViewCourseRatings from './pages/ViewCourseRatings';



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