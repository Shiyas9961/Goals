import {Routes,Route} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Components/Header';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
