import React,{useEffect,useState} from 'react'
import firebase from '../../firebase'
import {useLocation} from 'react-router-dom'
import {Carousel,Modal,Image} from 'react-bootstrap'
function ProjectPage() {
    const location = useLocation();
    const [urls, setUrls] = useState([])
    const [info, setInfo] = useState([])
    const [show, setShow] = useState(false);
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
            console.log(path)
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
    return (
        <div>
            <Carousel pause={false} interval={5000} style={{margin:'0 auto', width:'80%',height:'auto',paddingTop:'2rem'}}>
                {urls.map((url,idx) =>(
                <Carousel.Item className={'projectImg'} key={idx}>
                    <img
                        onClick={handleShow}
                        style={{paddingBottom:'1rem',objectFit:'cover',width:'100%',height:'500px'}}
                        key={idx}
                        src={url}
                    />
                </Carousel.Item>
                ))
                }
            </Carousel>
            <Modal size="xl" centered show={show} onHide={handleClose}>
                <Modal.Body>
                    <Image  fluid src={currentImage}/>
                </Modal.Body>
            </Modal>
            <div style={{display:'flex',margin:'0 auto',width:'80%',padding:'2rem 0',marginBottom:'3em',textAlign:'left',flexDirection:'row',justifyContent:'space-between'}}>
                    <div style={{width:'27%',display:'flex', flexDirection:'column',wordBreak:'break-word'}}>
                        <div style={{paddingBottom:'1rem'}}>Area: {info["area"]}</div>
                        <div style={{paddingBottom:'1rem'}}>Status: {info["status"]}</div>
                        <div style={{paddingBottom:'1rem'}}>Location: {info["location"]}</div>
                        <div style={{paddingBottom:'1rem'}}>Tag: <br/>{info["keyword"]}</div>
                    </div>
                    <div style={{width:'65%',textIndent:'1rem'}}>
                        <div style={{fontSize:'30px', paddingBottom:'1rem'}}>{info["name"]}</div>
                        <div>
                            { info["description"] &&
                        info["description"].split('\n').map(item=>(
                            item !== ""
                            ? <p>{item}</p>
                            : <p/>
                        ))}</div>
                    </div>                  
            </div>
        </div>
    )
}

export default ProjectPage
