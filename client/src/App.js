import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer} from './components/Footer';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Cars } from './pages/Cars';
import { Dashboard } from './pages/Dashboard';
import { Contact } from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
 
function App(){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path= "/" element = {<Roote />}>
        <Route index element = {<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path = '/login' element = {<Login />}/>
        <Route path = '/cars' element = {<Cars />}/>
        <Route path ='dashboard' element =  {<Dashboard />}/>
        <Route path ='contact' element =  {<Contact />}/>
      </Route>
    )
    
  )
  return( 
    <>
      <RouterProvider router = {router}/>
    </>
    )
}
const Roote = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}
export default App;