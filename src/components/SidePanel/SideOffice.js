import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
function SideOffice() {
    let location = useLocation().pathname.replace('/','')
    return (
        <div>
            <h5 style={{borderBottom:'1px solid black',fontWeight:'bold'}}>Office</h5>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'18px'
                }}>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black' , fontWeight: location === "License" ? 'bolder' : "unset"}} to="/License">License</Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black', fontWeight: location === "Contact" ? 'bolder' : "unset"}} to="/Contact">Contact</Link>
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default SideOffice
