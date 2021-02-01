import React,{useState,useEffect} from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
import firebase from '../../firebase'

function SideProjects() {
    let location = useLocation().pathname.replace('/Projects/','')
    const [years, setYears] = useState([])
    useEffect(() => {
        firebase.database().ref('/Projects/').on('value',snapshot=>{
            Object.keys(snapshot.val()).map(item=>setYears(prev => [...prev,item]))
        })
    }, [])
    return (
        <div>
            <h5 style={{borderBottom:'1px solid black'}}>Projects</h5>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'18px'
                }}>
                    {
                        years.length > 0 && years.map((year,idx)=>(
                            <Nav.Link className={year} style={{padding:0,paddingLeft:'1rem'}}>
                                <Link style={{color:'black'}} to={`/Projects/${year}`}>{year}</Link>
                            </Nav.Link>
                        ))
                    }
            </Nav>
        </div>
    )
}

export default SideProjects
