import './App.css';
import {
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom"
import HomePage from './components/Home/HomePage'
import PhilosophyPage from './components/Viron/PhilosophyPage'
import NewsPage from './components/Viron/NewsPage'
import PeoplePage from './components/Viron/PeoplePage'
import ProjectsPage from './components/Projects/ProjectsPage'
import LicensePage from './components/Office/LicensePage'
import ContactPage from './components/Office/ContactPage'
import SideHome from './components/SidePanel/SideHome';
import SideProjects from './components/SidePanel/SideProjects'
import SideOffice from './components/SidePanel/SideOffice';
import SideSearch from './components/SidePanel/SideSearch'
import ProjectPage from './components/Projects/ProjectPage'
import LoginPage from './components/Manage/LoginPage'
import ManagePage from './components/Manage/ManagePage'
import logo from './commons/logo.png'
import {Image,Navbar,Nav} from 'react-bootstrap'
import SearchPage from './components/Projects/SearchPage';
import WelcomePage from './components/Welcome/WelcomePage';
import {useState,useEffect} from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import $ from 'jquery'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

function App() {
  let location = useLocation().pathname
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    $(document).on('click','.hamburger-react',(e)=>{
      $(".slideToggle").slideToggle()
  })
  }, [])
  useEffect(() => {
    if(window.innerWidth < 850){
      $(document).on('click','.sideMenu',(e)=>{
        $(".slideToggle").slideToggle()
        setOpen(false)
      })
    }
  }, [window.innerWidth])
  return (
    <div className="App" style={{display:'flex'}}>
      {
        (location !== '/login' && location !=='/manage' && location !=='/') &&
        <Navbar style={{
          fontFamily:'Nanum Gothic, sans-serif',
          position:'sticky',
          left:0,
          top:0,
          padding:'0 3rem',
          paddingBottom:'1rem',
          height:'100vh',
          width:'27%',
          display:'flex',
          alignItems:'flex-end'
        }}>
          <Nav className="mr-auto"
           style={{
             width:'100%',
             display:'flex',
             flexDirection:'column',
             textAlign:'left',
             }}>
            
            <Navbar.Brand>
              <Link to={'/Home'}>
                <Image
                  src={logo} 
                  onDragStart={(e)=>{e.preventDefault()}}
                  style={{paddingRight:'2rem',width:'14rem'}} />
              </Link>
            </Navbar.Brand>
            <div className={"slideToggle"}>   
            <SideSearch />
            <SideHome />
            <SideProjects/>
            <SideOffice/>
            <div className={"copyright"} style={{fontSize:'0.8rem',color:'gray',marginLeft:'1rem'}}>Copyright © 2020 VIRON. ALL RIGHTS RESERVED</div>
            </div>
          </Nav>
          <div style={{display:'flex',width:'100vw'}}>
            <Link className={'vironMobile'} style={{color:'black',width:'45%',margin:0,padding:0,textAlign:'left',fontSize:'2rem',textDecoration:'none',paddingLeft:'1rem',display:'none'}} to={'/Home'}>VIRON</Link> 
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </Navbar>
      }
      <div className={"mainPage"} style={{width:(location !== '/manage' && location !== '/login' && location !== '/') ? '73%' : '100%',overflowX:'hidden'}}>
        <Switch>
          <Route  exact path="/" component={WelcomePage}/>
          <Route  path="/Home" component={HomePage}/>
          <Route  path="/Philosophy" component={PhilosophyPage}/>
          <Route  path="/Projects/:projectYear" component={ProjectsPage}/>
          <Route  path="/Project/:projectYear/:projectName" component={ProjectPage}/>
          <Route  path="/Contact" component={ContactPage}/>
          <Route  path="/People" component={PeoplePage}/>
          <Route  path="/News" component={NewsPage}/>
          <Route  path="/License" component={LicensePage}/>
          <Route  path="/login" component={LoginPage}/>
          <Route  path="/Manage" component={ManagePage}/>
          <Route  path="/Search/:search" component={SearchPage}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
