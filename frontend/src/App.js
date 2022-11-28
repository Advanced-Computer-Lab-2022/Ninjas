import {BrowserRouter,  Routes, Route} from 'react-router-dom'
import AddDiscount from './pages/AddDiscount';
import ChangePassword from './pages/ChangePassword';
import EditBiography from './pages/EditBiography';
import EditEmail from './pages/EditEmail';


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
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App; 