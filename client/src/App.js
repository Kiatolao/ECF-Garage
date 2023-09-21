import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Outlet} from 'react-router-dom';
import { Navbar } from './Pages/Navbar';
import { Books } from './Pages/Books';
import { Update } from './Pages/Update';
import { Add } from './Pages/Add';
import { Home } from './Pages/Home';
 
function App(){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path= "/" element = {<Roote/>}>
        <Route index element = {<Home/>}/>
        <Route path = '/books' element = {<Books/>}/>
        <Route path = '/update' element = {<Update/>}/>
        <Route path = '/add' element = {<Add/>}/>
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
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
export default App;