import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Cars } from './pages/Cars';
import { Dashboard } from './pages/Dashboard';
import { Contact } from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Root />}>
              <Route index element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/cars' element={<Cars />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/dashboard' element={
              <PrivateRoute roles={['admin', 'staff']}>
                <Dashboard />
                </PrivateRoute>}  />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const Root = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Outlet />
    </div>
  );
};

export default App;