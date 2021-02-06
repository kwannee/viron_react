import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
function SideOffice() {
    let location = useLocation().pathname.replace('/','')
    return (
        <div className={"sideMenu"}>
            <p style={{borderBottom:'1px solid black',fontWeight:'bold',fontSize:'1.3rem',margin:0}}>Office</p>
            <Nav className="mr-auto" 
            style={{
                display:'flex',
                flexDirection:'column',
                padding:'10px 0',
                fontSize:'18px'
                }}>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black' , fontWeight: location === "License" ? 'bolder' : "unset",fontSize:'1.1rem'}} to="/License">License</Link>
                </Nav.Link>
                <Nav.Link style={{padding:0,paddingLeft:'1rem'}}>
                    <Link style={{color:'black', fontWeight: location === "Contact" ? 'bolder' : "unset",fontSize:'1.1rem'}} to="/Contact">Contact</Link>
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default SideOffice
