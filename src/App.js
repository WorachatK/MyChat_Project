import './App.css';
import SingUp from './component/SingUp';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './component/Home';
import Login from './component/LogIn';
import Profile from './component/Profile';
import { AuthProvider } from './component/Auth';

function App() {

    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/singup' element={<SingUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    );
}

export default App;
