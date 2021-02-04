import React,{useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
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
            <div style={{display:'flex',justifyContent:'center',width:'50vw',height:'33vh',fontSize:'9rem'}}>
            en&#123;
                <Link style={{textDecoration:'none'}} to='/Home'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>&#125;ment
            </div>
            <div className="cursorItem" style={{position:'absolute',top:0,left:0,fontSize:'8rem',pointerEvents:'none',margin:"-6rem 0 0 -12rem"}}>
                VIRON
            </div>
        </div>
    )
}

export default WelcomePage
