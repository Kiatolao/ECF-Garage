import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home'
import {Contact} from './pages/Contact'
import {Login} from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import { Dashboard } from './pages/Dashboard';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import { Cars } from './pages/Cars';
import { CarDetail } from './pages/CarDetail';


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
              </Routes>
            </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;