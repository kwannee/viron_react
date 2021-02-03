import React,{useState,useEffect} from 'react'
import {Button,CardColumns,Card,Modal,Form,InputGroup,FormControl} from 'react-bootstrap'
import firebase from '../../firebase'
import Upload from './utils/Upload'
import {useForm} from 'react-hook-form'

import {AiOutlinePlusCircle} from 'react-icons/ai'

function ProjectsManage() {
    const {register,watch,errors,handleSubmit} =useForm();
    const [years, setYears] = useState([])
    const [yearShow, setYearShow] = useState(false)
    const [urls,setUrls] = useState([])
    const [name, setName] = useState("")
    const [show, setShow] = useState(false);
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [location, setLocation] = useState("")
    const [area, setArea] = useState("")
    const [keywords, setKeywords] = useState("")
    const [submit, setSubmit] = useState(false)
    const [newYear, setNewYear] = useState("")
    const [plusShow, setPlusShow] = useState(false)
    const [imageChanged, setImageChanged] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false);
    useEffect(() => {
        firebase.storage().ref('Projects/').listAll().then(res=>{
            for(let i = 0; i < res.prefixes.length; i++){
                setYears(prev => [...prev,res.prefixes[i].name])
            }
        })
    }, [])
    const handleYearClick = (e) =>{
        setUrls([])
        setYear(e.target.innerHTML)
        let currentYear = e.target.innerHTML
        firebase.storage().ref(`Projects/${currentYear}`).listAll().then(async projects=>{
            projects.prefixes.forEach(async folderRef =>{
                let folder = await firebase.storage().ref(`Projects/${currentYear}/${folderRef.name}`).listAll()
                let info = await (await firebase.database().ref(`Projects/${currentYear}/${folderRef.name}`).once('value')).val()
                let downloadURL = await folder.items[0].getDownloadURL()
                setUrls(prev =>[...prev,{url:downloadURL,year:currentYear,name:folderRef.name,keyword:info["keyword"],
                location:info["location"],area:info["area"],subtitle:info["subtitle"],description:info["description"]}])
            })
        })
        setPlusShow(true)
    }
    const handleProjectClick = (e) =>{
        setShow(true)
        setName(e.name)
        setYear(e.year)
        setLocation(e.location)
        setArea(e.area)
        setKeywords(e.keyword)
        setSubtitle(e.subtitle)
        setDescription(e.description)
    }
    const handleAddClick = () =>{
        setName("")
        setKeywords("")
        setArea("")
        setLocation("")
        setDescription("")
        setSubtitle("")
        setShow(true)
    }
    const handleNewYearChange =(e) =>{
        // setNewYear(e.target.value)
    }
    const handleYearAddSubmitClick = () =>{
        // 이거 할려면 새 년도 만들때 애초에 파일을 같이 업로드 해야함 아니면 폴더 삭제됨.
        // firebase.storage().ref().child(`Projects/${newYear}/hi.jpg`).put("hi","hi").then(snapshot=>
        //     firebase.storage().ref().child(`Projects/${newYear}/hi.jpg`).delete()
        // )
    }
    const handleDeleteClose = () =>{ 
        setShow(false)
        setDeleteShow(false)
    };
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteProject = () => {
        firebase.storage().ref(`Projects/${year}/${name}`).listAll().then(res=>{
            res.items.forEach((item,idx)=>{
                item.delete()
            })
        })
        firebase.database().ref(`Projects/${year}/${name}`).remove()
        setDeleteShow(false)
        setTimeout(() => {
            window.location.reload(false);
        }, 1500);
    }
    if(submit){
        firebase.database().ref(`Projects/${year}/${name}`).set({
            name:name,
            subtitle:subtitle,
            keyword:keywords,
            location:location,
            description:description,
            area:area
        })
        if(!imageChanged){
            window.location.reload(false);
        }
    }
    console.log(newYear)
    return (
        <div style={{}}>
            <div style={{display:'flex',justifyContent:'flex-start',width:'50%',margin:'0 auto',alignItems:'center'}}>
            {
                years.map(year=>(
                    <Button onClick={handleYearClick} style={{margin:'1rem 3px'}} variant="dark">{year}</Button>
                ))
            }
             <Button onClick={() => setYearShow(!yearShow)} style={{margin:'1rem 3px'}} variant="dark">년도 추가</Button>
             <form style={{display: !yearShow ? 'none':'flex',margin:'0 1rem',alignItems:'center'}} onSubmit={handleSubmit(handleNewYearChange)}>
                    <label>년도</label>
                    <input
                        onChange={(e)=>setNewYear(e.target.value)}
                        name="name"
                        ref={register({ required: true })}
                    />
                    <input onClick={()=>setShow(true)} type="submit"/>
                    {errors.name && errors.name.type==="required" && <p>년도를 입력해주세요</p>}
                </form>
            </div>
            <CardColumns style={{padding:'1rem 0',width:'50%',margin:'0 auto'}}>
                    {
                        urls.map((item)=>(
                                <Card onClick={()=>handleProjectClick(item)} className={"projectWrapper"} style={{border:'none'}}>
                                    <Card.Img style={{filter:'grayscale(80%)'}} className={"projectImage"} variant="top" src={item.url}/>
                                    <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
  
                                    </Card.Body>
                                </Card>
                        ))
                    }
            </CardColumns>
                <AiOutlinePlusCircle onClick={handleAddClick} className={"plusButton"} style={{fontSize:'100px',display:plusShow ? 'unset' : 'none'}}/>
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
                    <Modal.Body style={{width:'47%',margin:0,padding:0}}>
                        <Upload imageChange={setImageChanged} style={{margin:0,padding:0}} submit={submit} part={`Projects`} year={year} name={name}/>
                    </Modal.Body>
                    <div style={{width:'50%',display:'flex'}}>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>프로젝트명</Form.Label>
                        <textarea onChange={(e)=>setName(e.target.value)} style={{height:'30px',width:'100%'}} value={name}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>부제</Form.Label>
                        <textarea onChange={(e)=>setSubtitle(e.target.value)} style={{height:'30px',width:'100%'}} value={subtitle}></textarea>
                    </Form.Group>
                    </div>
                    <div style={{width:'50%',display:'flex'}}>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>장소</Form.Label>
                        <textarea onChange={(e)=>setLocation(e.target.value)} style={{height:'30px',width:'100%'}} value={location}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0,display:'flex',flexDirection:'column'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>면적</Form.Label>
                        <textarea onChange={(e)=>setArea(e.target.value)} style={{height:'30px',width:'100%'}} value={area}></textarea>
                    </Form.Group>
                    </div>
                    <Form.Group style={{width:'50%',margin:0,padding:0}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>키워드들</Form.Label>
                        <textarea onChange={(e)=>setKeywords(e.target.value)} style={{height:'100px',width:'100%'}} value={keywords}></textarea>
                    </Form.Group>
                    <Form.Group style={{width:'50%',margin:0,padding:0}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>설명</Form.Label>
                        <textarea onChange={(e)=>setDescription(e.target.value)} style={{height:'300px',width:'100%'}} value={description}></textarea>
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
                <Button variant="secondary" onClick={handleDeleteProject}>
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

export default ProjectsManage
