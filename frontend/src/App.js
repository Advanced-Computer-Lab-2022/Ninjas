import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddDiscount from './pages/AddDiscount';
import ChangeCountry from './components/ChangeCountry';
import ForgotPasswordPage from './components/ForgotPassword';
import InstructorCourses from './components/InstructorCourses';
import InstructorPage from './components/InstructorHome';
import SolveExercise from './components/SolveExercise';
import TraineePage from './components/TraineeHome';
import TraineeSearch from './components/TraineeSearch';
import ChangePassword from './pages/ChangePassword';
import EditBiography from './pages/EditBiography';
import EditEmail from './pages/EditEmail';
import ViewInstRating from './pages/ViewInstRating';
import ViewAllCourses from './pages/ViewAllCourses';
import ViewCourseRatings from './pages/ViewCourseRatings';
import CorrectAnswer from './components/CorrectAnswer';
import ViewExerciseGrade from './components/ViewExerciseGrade';
import ViewVideo from './components/ViewVideo';
import RateInstructor from './components/RateInstructor';
import SubtitlePage from './pages/SubtitlePage';
import AddVideoCourse from './pages/AddVideoCourse';
import AddVideoSubtitle from './pages/AddVideoSubtitle';
import Terms from './pages/Terms';
import InstructorProfile from './pages/InstructorProfile';
import Login from './components/Login';
import Signup from './nav/Signup';
import ResetPasswordPage from './components/ResetPassword';
import MostPopular from './components/MostPopular';
import Temp from './components/Search';
import SearchInstructor from './components/SearchInstructor';
import Payment from './nav/PaymentForm';
import Checkout2 from './nav/Checkout2';
import Home from './nav/Home';
import TermsGuest from './nav/InstructorTerms';
import InstructorHome from './nav/InstructorHome';
import TraineeHome from './nav/TraineeHome';
import Admin from './components/Admin';
import AdminViewReports from './components/AdminViewReports';
import AdminAccessCourse from './components/AdminAccessCourse';
import AdminSetPromo from './components/AdminSetPromo';
import AdminAddUser from './components/AdminAddUser';
import AdminRefundRequests from './components/AdminRefundRequests';
import CreateExercise from './nav/CreateExercise';
import CoursePage from './components/CoursePage';
import Settings2 from './nav/Settings2';
import Settings from './nav/Settings';
import TraineeCourse from './nav/TraineeCourse';
import Ratings from './nav/Ratings';
import InstructorCreate from './components/InstructorCreate';
import InstructorSubtitle from './components/InstructorSubtitle';
import MyReport from './nav/MyReport';
import InstructorCrEx from './components/InstructorCrEx';
import InstructorCrEx2 from './components/InstructorCrEx2';
import ViewCorrectAnswer from './components/viewTheCorrectAnswers';
import InstructorCreateEx2 from './components/InstructorCreateEx2';
import Promotion from './nav/Promotion';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/InstructorCrEx2' element={<InstructorCrEx2/>}></Route>
      <Route path='/InstructorCrEx' element={<InstructorCrEx/>}></Route>
      <Route path='/InstructorCreateEx2' element={<InstructorCreateEx2/>}></Route>
      <Route path='/promotion' element={<Promotion/>}></Route>
      <Route path='/viewCorrectAnswers' element={<ViewCorrectAnswer/>}></Route>
      <Route path='/searchInstructor' element={<SearchInstructor/>}></Route>
      <Route path='/InstructorCreate' element={<InstructorCreate/>}></Route>
      <Route path='/InstructorSubtitle' element={<InstructorSubtitle/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/temp' element= {<Temp/>} > </Route>
      <Route path='/terms' element= {<TermsGuest/>} >  </Route>
      <Route path='/iHome' element= {<InstructorHome/>} >  </Route>
      <Route path='/tHome' element= {<TraineeHome/>} > </Route>
      <Route path='/exercise' element= {<CreateExercise/>} > </Route>
      <Route path='/settings' element= {<Settings/>} > </Route>
      <Route path='/settingsT' element= {<Settings/>} > </Route>
      <Route path='/ratings' element={<Ratings/>}></Route>
      <Route path='/enrolled' element={<TraineeCourse/>}></Route>
      <Route path='/myReports' element={<MyReport/>}></Route>
        <Route path='/home' element= {<Home/>} >
        </Route>
        <Route path='/changePassword' element= {<ChangePassword/>} >
        </Route>
        <Route path='/admin' element= {<Admin/>} >
        </Route>
        <Route path='/AdminViewReports' element= {<AdminViewReports/>} >
        </Route>
        <Route path='/AdminAccessCourse' element= {<AdminAccessCourse/>} >
        </Route>
        <Route path='/AdminAddUser' element= {<AdminAddUser/>} >
        </Route>
        <Route path='/AdminSetPromo' element= {<AdminSetPromo/>} >
        </Route>
        
        
        <Route path='/AdminRefundRequests' element= {<AdminRefundRequests/>} >
        </Route>
        <Route path='/viewVideo' element= {<ViewVideo/>} >
        </Route>
        <Route path='/rateInstructor' element= {<RateInstructor/>} >
        </Route>
        <Route path='/viewExerciseGrade' element= {<ViewExerciseGrade/>} >
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
        <Route path='/viewMyProfile' element= {<InstructorProfile/>} >
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
        <Route path="/payment"
        element={<Payment/>}/>
        <Route path="/checkout"
        element={<Checkout2/>}/>
        <Route path="/solveExercise" element={<SolveExercise/>}/>
      <Route path="/resetPassword/:id" element={<ResetPasswordPage/>}/>
      <Route path="/mostPopularCourses" element={<MostPopular/>}/>
      <Route path="/course/:id" element={<CoursePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 