import React,{useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import welcome from '../../commons/welcome.png'
import VIRON from '../../commons/VIRON.png'
function WelcomePage() {
    const location = useLocation()
    let x = 0
        let y = 0
        let mx = 0
        let my = 0
        let cursorItem
        useEffect(() => {
            cursorItem = document.getElementsByClassName("cursorItem")[0]
            window.addEventListener("mousemove", function(e){
                x = e.clientX;
                y = e.clientY;
                cursorItem.style.transform = "translate("+ x +"px, "+ y + "px )";
            });
            loop();
    }, [window])
    const loop = () =>{
        cursorItem.style.transform = "translate("+ x +"px, "+  y + "px )";
        requestAnimationFrame(loop);
    }
    return (
        <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',overflow:'hidden',cursor:'none'}}>
            <div style={{display:'flex',justifyContent:'center',width:'50%'}}>
                <img style={{width:'50vw'}} src={welcome} alt={"en{}ment"}/>
                <Link style={{textDecoration:'none'}} to='/Home'>
                    <div style={{position:'absolute',width:'20vw',height:'12vh',top:'44%',left:'35.5%'}}>
                    </div>
                </Link>
            </div>
            <div className="cursorItem" style={{position:'absolute',top:0,left:0,pointerEvents:'none',margin:"-2vw 0 0 -10vw"}}>
                <img style={{width:'19vw'}} src={VIRON} alt={"VIRON"}/>
            </div>
        </div>
    )
}

export default WelcomePage
