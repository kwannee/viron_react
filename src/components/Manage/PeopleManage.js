import React,{useState,useEffect} from 'react'
import PeoplePage from '../Viron/PeoplePage'
import {Card,Container,Col,Row,Image,Modal,Form,Button} from 'react-bootstrap'
import firebase from '../../firebase'
import Upload from './utils/Upload'

function PeopleManage() {
    const [imageUrl, setImageUrl] = useState([])
    const [show, setShow] = useState(false);
    const [position, setposition] = useState("")
    const [text, setText] = useState("")
    const [name, setname] = useState("")
    const [submit, setSubmit] = useState(false)
    useEffect(
        () => {
        firebase.storage().ref('People/').listAll().then(async res =>{
            res.items.forEach(async item =>{
                let name = item.name
                let url = await item.getDownloadURL()
                setImageUrl(prev =>[...prev,{url:url,name:name}])
            })
        })
    }, [])
    const [deleteShow, setDeleteShow] = useState(false);

    const handleDeleteClose = () =>{ 
        setShow(false)
        setDeleteShow(false)
    };
    const handleDeleteShow = () => setDeleteShow(true);
    const handlePositionChange = (e) =>{
        setposition(e.target.value)
    }
    const handleTextChange = (e) =>{
        setText(e.target.value)
    }
    const handleNameChange = (e) =>{
        setname(e.target.value)
    }
    const handleClick = async (e) =>{
        setShow(true)
        await firebase.database().ref(`People/${e.target.className.split(' ')[0]}`).on('value',snapshot=>{
            setname(snapshot.val() !== null ? snapshot.val()["name"] : "")
            setText(snapshot.val() !== null ? snapshot.val()["text"] : "")
            setposition(snapshot.val() !== null ? snapshot.val()["position"] : "")
        })
    }
    const [imageChanged, setImageChanged] = useState(false)
    if(submit){
        firebase.database().ref(`People/${name}`).set({
            name:name,
            position:position,
            text:text
        })
        if(!imageChanged){
            window.location.reload(false);
        }
    }
    console.log(imageChanged)
    const handleDeletePeople = (e) =>{
        firebase.storage().ref(`People/${name}`).delete()
        firebase.database().ref(`People/${name}`).remove()
        setDeleteShow(false)
        window.location.reload(false);
    }
    return (
        <div style={{display:'flex',width:'100%',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
            <Container fluid style={{display:'flex',justifyContent:'center',alignItems:'center',margin:0,padding:0,paddingTop:'1rem',width:'50%'}}>
               <Row style={{margin:0}}>
               {
                imageUrl.map((info,idx)=>(
                <Col  style={{margin:0,padding:0,paddingBottom:'1rem'}} xl={3} lg={4} md={6} xs={9}>
                    <Card onClick={handleClick} style={{backgroundColor:'unset',border:'unset',width:'90%',fontSize:'15px'}}>
                            <Card.Header className={"peopleImgWrapper"} style={{padding:0,margin:0}}>
                                <Image style={{filter:'grayscale(80%)'}} className={info.name+' '+ "peopleImg"} src={info.url} fluid/>
                            </Card.Header>
                       <span style={{fontWeight:'500',paddingTop:'5px'}}>{info.name}</span>
                    </Card>             
                </Col>
                ))
                }
                </Row>  
            </Container>
            <Button onClick={handleClick} variant="primary" size="lg" active>
                추가
            </Button>{' '}
            <Modal
                centered
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                size='xl'
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {name}
                    </Modal.Title>
                </Modal.Header>
                <Form style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <Modal.Body style={{width:'50%',margin:0,padding:0}}>
                        <Upload imageChange={setImageChanged} submit={submit} style={{margin:0,padding:0}} part={`People`} name={name} position={position} text={text} one={true}/>
                    </Modal.Body>
                    <Form.Group style={{width:'50%',margin:0,padding:0}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>이름</Form.Label>
                        <textarea onChange={handleNameChange} style={{height:'50px',width:'100%'}} value={name}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>직책</Form.Label>
                        <textarea onChange={handlePositionChange} style={{height:'50px',width:'100%'}} value={position}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>소개글</Form.Label>
                        <textarea onChange={handleTextChange} style={{height:'300px',width:'100%'}} value={text}></textarea>
                    </Form.Group>
                    <div>
                    <Button onClick={()=>setSubmit(true)} style={{margin:'2rem 2rem'}} variant="primary">
                        제출
                    </Button>
                    <Button onClick={()=>setDeleteShow(true)} style={{margin:'2rem 2rem'}} variant="primary">
                        삭제
                    </Button>
                    </div>
                </Form>
            </Modal>
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeletePeople}>
                    삭제
                </Button>
                <Button variant="primary" onClick={handleDeleteClose}>
                    취소
                </Button>
                </Modal.Footer>
            </Modal>               
        </div>
    )
}

export default PeopleManage
