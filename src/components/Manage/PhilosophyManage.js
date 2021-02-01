import React,{useState,useCallback,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import firebase from '../../firebase'
import Upload from './utils/Upload'

function PhilosophyManage() {
    const [text, setText] = useState("")
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        firebase.database().ref('Philosophy/text/').on('value',snapshot =>{
            setText(snapshot.val())
        })
    }, [])
    const handleChange = (e) =>{
        setText(e.target.value)
    }
    const handleSubmit = ()=>{
        setSubmit(false)
    }
    const [imageChanged, setImageChanged] = useState(false)
    if(submit){
        firebase.database().ref(`Philosophy/`).set({
            text:text
        })
        if(!imageChanged){
            window.location.reload(false);
        }
    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',marginTop:'2rem'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'35%'}}>
                <Form style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:'100%'}}>
                <h3>Philosophy</h3>
                    <Upload imageChange={setImageChanged} handleSubmit={handleSubmit} submit={submit} part={'Philosophy'}/>
                    <Form.Group style={{width:'100%',margin:'0 auto'}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>소개글</Form.Label>
                        <textarea onChange={handleChange} style={{height:'300px',width:'100%'}} value={text}></textarea>
                    </Form.Group>
                    <Button onClick={()=>setSubmit(true)} style={{marginTop:'2rem'}} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PhilosophyManage
