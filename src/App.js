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
function App() {
  let location = useLocation().pathname
  return (
    <div className="App" style={{display:'flex'}}>
      {
        (location !== '/login' && location !=='/manage') &&
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
              <Link to={'/'}>
                <Image
                  src={logo} 
                  onDragStart={(e)=>{e.preventDefault()}}
                  style={{paddingRight:'2rem',width:'200px'}} />
              </Link>
            </Navbar.Brand>
            <SideSearch />
            <SideHome/>
            <SideProjects/>
            <SideOffice/>
                      <div style={{fontSize:'13px',color:'gray',marginLeft:'1rem'}}>Copyright © 2020 VIRON. ALL RIGHTS RESERVED</div>
          </Nav>

        </Navbar>
      }
      <div style={{width:(location !== '/manage' && location !== '/login') ? '73%' : '100%',overflowX:'hidden'}}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
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
