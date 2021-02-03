import React,{useState,useEffect} from 'react'
import firebase from '../../firebase'
import {Button,Modal,Carousel,Image,Form} from 'react-bootstrap'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import Upload from './utils/Upload';
function HomeManage() {
    const [show, setShow] = useState(false);
    const [urls, setUrls] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        firebase.storage().ref('Home/').listAll().then(res=>{
            res.items.forEach(async item=>{
                let url = await item.getDownloadURL()
                setUrls(prev => [...prev,{url:url,name:item.name}])
            })
        })
    }, [])
    return (
        <div style={{margin:'3rem 0'}}>
            <Carousel style={{width:'800px',margin:'0 auto'}}>
                    { urls.map((url,idx)=>(
                    <Carousel.Item>
                            <Image
                            style={{objectFit:'cover'}}
                            key={idx}
                            className="d-block w-100"
                            src={url.url}
                            alt={idx}
                            />
                            <Carousel.Caption>
                            <h3>{url.name}</h3>
                            </Carousel.Caption>  
                    </Carousel.Item>
                    ))
                    }
            </Carousel>
            <AiOutlinePlusCircle onClick={()=>setShow(true)} className={"plusButton"} style={{fontSize:'100px',marginTop:'2rem'}}/>
            
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>홈 화면에 넣을 프로젝트 사진</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Upload submit={submit} name={name+'_'+year} part={"Home"} one={true}/>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>프로젝트명</Form.Label>
                        <textarea onChange={(e)=>setName(e.target.value)} style={{height:'30px',width:'100%'}} value={name}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>년도</Form.Label>
                        <textarea onChange={(e)=>setYear(e.target.value)} style={{height:'30px',width:'100%'}} value={year}></textarea>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={()=>setSubmit(true)}>
                    제출
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default HomeManage
