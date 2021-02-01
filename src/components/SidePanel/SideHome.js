import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'

function SideHome() {
    let location = useLocation().pathname.replace('/','')
    
    return (
        <div>
            <h5 style={{borderBottom:'1px solid black'}}>VIRON</h5>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'17px'
                }}>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}} >
                    <Link style={{color:'black', fontWeight: location === "Philosophy" ? 'bolder' : "unset"}} to="/Philosophy">Philosophy</Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black',  fontWeight: location === "People" ? 'bolder' : "unset"}} to="/People">
                        People
                    </Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}} >
                    <Link style={{color:'black',  fontWeight: location === "News" ? 'bolder' : "unset"}} to="/News">
                        News
                    </Link>
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default SideHome
