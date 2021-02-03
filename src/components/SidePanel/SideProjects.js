import React,{useState,useEffect} from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
import firebase from '../../firebase'

function SideProjects() {
    let location = useLocation().pathname.split('/')
    const [years, setYears] = useState([])
    useEffect(() => {
        firebase.database().ref('/Projects/').on('value',snapshot=>{
            Object.keys(snapshot.val()).map(item=>setYears(prev => [...prev,item]))
        })

    }, [])
    
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
        }
    /*business logic for component did update*/
        let currentYear = location[2]
        if(location[1] === "Projects" || location[1] === "Project"){
            document.getElementsByClassName(currentYear)[0].style.fontWeight='bold'
        }
        return ()=>{
            if(location[1] === "Projects" || location[1] === "Project"){
                document.getElementsByClassName(location[2])[0].style.fontWeight='unset'
            }
        }
    });
    return (
        <div>
            <h5 style={{borderBottom:'1px solid black',fontWeight:'bold'}}>Projects</h5>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'18px'
                }}>
                    {
                        years.length > 0 && years.map((year,idx)=>(
                            <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                                <Link className={year} style={{color:'black'}} to={`/Projects/${year}`}>{year}</Link>
                            </Nav.Link>
                        ))
                    }
            </Nav>
        </div>
    )
}

export default SideProjects
