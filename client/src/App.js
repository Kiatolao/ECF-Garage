import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home'
import {Contact} from './pages/Contact'
import {Login} from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import { Dashboard } from './pages/Dashboard';
import {Navbar} from './components/Navbar';
import { Cars } from './pages/Cars';
import { CarDetail } from './pages/CarDetail';
import {Privacy} from './pages/Privacy'

function App() {
  return (
      <Router>
        <div className='flex flex-col h-screen'>
          <Navbar />
            <div className='flex-grow'> 
              <Routes>
                <Route element={<PrivateRoute roles={['admin', 'staff']} />}>
                  <Route  element={<Dashboard/>} path="/dashboard"/>
                </Route>
                <Route element={<Home />} path="/" exact/>
                <Route element={<Login />} path="/login"/>
                <Route element={<Cars />} path="/cars" />
                <Route element={<CarDetail />} path="/car_detail/:id" />
                <Route component={CarDetail} path="/car_detail/:id" />
                <Route element={<Contact />} path="/contact"/>
                <Route element={<Privacy />} path="/privacy"/>
              </Routes>
            </div>
        </div>
      </Router>
  );
}

export default App;