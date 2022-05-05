import './App.css';
import logo from './logo.jpeg'
import {Image} from 'react-bootstrap'
import { useEffect,useState } from 'react';
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import HomePage from './components/HomePage'
import SignInPage from './components/SignInPage';
import CurrentShiftShowPage from './components/CurrentShiftShowPage';
import PageNotFound from './components/PageNotFound';
import ShiftIndexPage from './components/ShiftIndexPage';
import EmployeeIndexPage from './components/EmployeeIndexPage';
import ShiftFinalizationPage from './components/ShiftFinalizationPage';
import ShiftNewPage from './components/ShiftNewPage';
import { Employee, Session } from './requests';
import ShiftShowPage from './components/ShiftShowPage';
import EmployeeShowPage from './components/EmployeeShowPage';

function App() {

  const [supervisor, setSupervisor] = useState(null)

  useEffect(()=>{
    getCurrentSupervisor()
  },[])
  const getCurrentSupervisor = () => {
    return Employee.current_supervisor().then(supervisor => {
      if (supervisor?.id){
        setSupervisor(supervisor)
      }
    })
  }
  const signOut = ()=>{
    Session.destroy().then(()=>{
      setSupervisor(null)
  })
  }

  if(!supervisor) {
    return <SignInPage getCurrentSupervisor={getCurrentSupervisor} />
  }

  return (
    <BrowserRouter>
      <nav className='bg-black navbar justify-content-center fs-5'>
        <Link to="/" className='p-1 nav-link text-white m-2'>
          <Image className="logo" rounded={true} src={logo}></Image>
        </Link>
        <Link to="/shifts" className='p-1 nav-link text-white m-2'>Shifts</Link>
        <button onClick={signOut} className='p-1 fs-5 btn text-white m-2'>Sign Out</button>
        <Link to="/employees" className='p-1 nav-link text-white m-2'>Employees</Link>
      </nav>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/sign_in" element ={<SignInPage/>}/>
        <Route path="/shifts" element ={<ShiftIndexPage/>}/>
        <Route path="/shifts/new" element ={<ShiftNewPage/>}/>
        <Route path="shifts/:id" element={<ShiftShowPage/>}/>
        <Route path="current_shifts/:id" element ={<CurrentShiftShowPage/>}/>
        <Route path="/shift_finalization/:id" element={<ShiftFinalizationPage/>}/>
        <Route path="/employees" element ={<EmployeeIndexPage/>}/>
        <Route path="/employees/:id" element={<EmployeeShowPage/>}/>     
        <Route path="*" element ={<PageNotFound/>}/>
      </Routes>
      <footer className='footer'>@copyright All right reserved</footer>
    </BrowserRouter>
  );
}

export default App;
