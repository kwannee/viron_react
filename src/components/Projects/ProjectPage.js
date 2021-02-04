import React,{useEffect,useState} from 'react'
import firebase from '../../firebase'
import {useLocation} from 'react-router-dom'
import {Carousel,Modal,Image,Spinner} from 'react-bootstrap'
import logo from '../../commons/logo.png'
function ProjectPage() {
    const location = useLocation();
    const [urls, setUrls] = useState([])
    const [info, setInfo] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [currentImage, setCurrentImage] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setCurrentImage(e.target.src)
        setShow(true);
    }
    useEffect(() => {
        try{
            let path = location.pathname.split('/')
            path[1] = "Projects"
            path = path.join('/')+'/'
            firebase.storage().ref(path).listAll().then(res =>{
                res.items.forEach(async (item)=>{
                    let url = await item.getDownloadURL()
                    setUrls(prev => [...prev,url])
                })
            })
            firebase.database().ref(path).once('value',snapshot=>{
                setInfo(snapshot.val())
            })
        }catch(error){
            alert(error)
        }

    }, [])
    setTimeout(() => {
        setLoading(true)
    }, 1000);
    return (
        <div style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Spinner style={{display:!loading ? 'block' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <div className={"animate__animated animate__fadeIn"} style={{display:loading ? 'block' : 'none',width:'100%',margin:'0 3rem'}}>
                <Carousel pause={false} interval={5000}>
                    {urls.map((url,idx) =>(
                    <Carousel.Item className={'projectImg'} key={idx}>
                        <img
                            onClick={handleShow}
                            style={{paddingBottom:'1rem',objectFit:'cover',width:'100%',height:'70vh'}}
                            key={idx}
                            alt={logo}
                            src={url}
                        />
                    </Carousel.Item>
                    ))
                    }
                </Carousel>
                <Modal size="xl" centered show={show} onHide={handleClose} >
                    <Modal.Body style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Image  fluid src={currentImage}/>
                    </Modal.Body>
                </Modal>
                <div style={{display:'flex',margin:'0 auto',textAlign:'left',flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={{width:'27%',display:'flex', flexDirection:'column',wordBreak:'break-word'}}>
                            <div style={{borderBottom:'1px solid black',fontWeight:'bold',fontSize:'20px',paddingBottom:'1rem'}}>DETAILS</div>
                            <div><span style={{fontWeight:'bold'}}>Area </span> {info["area"]}</div>
                            <div><span style={{fontWeight:'bold'}}>Status </span> {info["status"]}</div>
                            <div><span style={{fontWeight:'bold'}}>Location </span> {info["location"]}</div>
                            <div><span style={{fontWeight:'bold'}}>Tag </span> <br/>{info["keyword"]}</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style={{fontSize:'30px',fontWeight:'bold'}}>{info["name"]}</div>
                            <div style={{fontSize:'20px', paddingBottom:'1rem',color:'gray',textAlign:'right'}}>{info["subtitle"]}</div>
                        </div>


                        {/* <div style={{width:'65%',textIndent:'1rem'}}>
                            
                            <div>
                                { info["description"] &&
                            info["description"].split('\n').map(item=>(
                                item !== ""
                                ? <p>{item}</p>
                                : <p/>
                            ))}</div>
                        </div>                   */}
                </div>
            </div>
           
        </div>
    )
}

export default ProjectPage
