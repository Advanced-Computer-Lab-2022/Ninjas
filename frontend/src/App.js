import {BrowserRouter,  Routes, Route} from 'react-router-dom'
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<ChangePassword/>} >
        </Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App; 