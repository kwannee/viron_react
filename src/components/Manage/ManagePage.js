import React,{useEffect,useState} from 'react'
import firebase from '../../firebase'
import {useHistory} from 'react-router-dom'
import {Image,Navbar,Nav,Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo from '../../commons/logo.png'
import PhilosophyManage from './PhilosophyManage'
import PeopleManage from './PeopleManage'
import ProjectsManage from './ProjectsManage'
import HomeManage from './HomeManage'

function ManagePage() {
    let history = useHistory()
    const [page, setPage] = useState("")
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
          if(user){
            history.push('/manage')
          }else{
            history.push('/login')
          }
        })
      }, [])
    const handlePageClick = (e) =>{
        setPage(e.target.innerHTML)
    }
    const renderPage = (page) => {
        switch (page) {
            case "Home":
                return <HomeManage />
            case "Philosophy":
                return <PhilosophyManage />
            case "People":
                return <PeopleManage />
            case "Projects":
                return <ProjectsManage/>
            default:
                break;
        }
    }
    return (
        <div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',boxShadow:'0 0 5px 1px'}}>
            <Navbar style={{
          position:'sticky',
          left:0,
          top:0,
          display:'flex',
          width:'70%',
          alignItems:'flex-end',
        }}>
            <Nav className="mr-auto"
            style={{
                display:'flex',
                flexDirection:'row',
                textAlign:'left',
                width:'100%',
            justifyContent:'space-between'
                }}>
                <Navbar.Brand>
                    <Link to={'/'}>
                        <Image
                        src={logo} 
                        onDragStart={(e)=>{e.preventDefault()}}
                        style={{width:'150px'}} />
                    </Link>
                </Navbar.Brand>
                <div style={{display:'flex',fontSize:'20px',fontWeight:'bolder'}}>
                <Nav.Item style={{padding:'0 1rem',display:'flex',alignItems:'center'}}>
                    <Nav.Link onClick={handlePageClick}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{padding:'0 1rem',display:'flex',alignItems:'center'}}>
                    <Nav.Link onClick={handlePageClick}>Philosophy</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{padding:'0 1rem',display:'flex',alignItems:'center'}}>
                    <Nav.Link onClick={handlePageClick}>People</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{padding:'0 1rem',display:'flex',alignItems:'center'}}>
                    <Nav.Link onClick={handlePageClick}>Projects</Nav.Link>
                </Nav.Item>
                </div>
            </Nav>
            </Navbar>
            </div>
            {renderPage(page)}
        </div>
    )
}

export default ManagePage
