import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'

function SideHome() {
    let location = useLocation().pathname.replace('/','')
    
    return (
        <div>
            <p style={{borderBottom:'1px solid black',fontWeight:'bold',fontSize:'1.3rem',margin:0}}>VIRON</p>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'1.1rem'
                }}>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}} >
                    <Link style={{color:'black', fontWeight: location === "Philosophy" ? 'bolder' : "unset",fontSize:'1.1rem'}} to="/Philosophy">Philosophy</Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black',  fontWeight: location === "People" ? 'bolder' : "unset",fontSize:'1.1rem'}} to="/People">
                        People
                    </Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}} >
                    <Link style={{color:'black',  fontWeight: location === "News" ? 'bolder' : "unset",fontSize:'1.1rem'}} to="/News">
                        News
                    </Link>
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default SideHome
