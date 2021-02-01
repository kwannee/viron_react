import React,{useState,useEffect} from 'react'
import firebase from '../../firebase'

function PeopleDesc({name}) {
    const [description, setDescription] = useState({
        name:"",
        position:"",
        text:""
    })
    useEffect(() => {
        try{
            firebase.database().ref(`People/${name}/`).on('value',snapshot =>{
                let item = snapshot.val()
                if (item === null){
                    return
                }
                setDescription({
                    name:item.name,
                    position:item.position,
                    text:item.text
                })
            })
        }catch(error){
            alert(error)
        }
    }, [])
    return (
        <div style={{textAlign:'left',paddingRight:'2rem'}}>
            {
                <article style={{color:'gray'}} >
                    <div style={{padding:0,margin:0,fontWeight:'bolder',fontSize:'18px'}}>{description.name}</div>
                    <div style={{marginBottom:'13px'}}>{description.position}</div>
                    {description.text.split('\n').map(item =>(
                        item !== ""
                        ? <p style={{padding:0,margin:0, fontSize:'13px'}}>{item}</p>
                        : <p/>
                    ))}
                </article>
            }
        </div>
    )
}

export default PeopleDesc
