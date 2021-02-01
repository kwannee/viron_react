import React,{useEffect,useState} from 'react'
import firebase from '../../firebase'
import {Carousel} from 'react-bootstrap'
function PhilosophyPage() {
    const [imageUrl, setImageUrl] = useState([])
    const [desc, setDesc] = useState("")
    useEffect(
        () => {
        firebase.storage().ref('Philosophy/').listAll().then(async res =>{
            res.items.forEach(async item =>{
                let url = await item.getDownloadURL()
                setImageUrl(prev =>[...prev,url])
            })
        })
        firebase.database().ref('Philosophy/').on('value',snapshot=>{
            setDesc(snapshot.val().text)
        })
    }, [])
    return (
        <div>
            <Carousel pause={false} interval={2000} style={{margin:'0 auto', width:'100%',height:'auto',paddingTop:'2rem',paddingRight:'2rem'}}>
                {imageUrl.map((url,idx) =>(
                    <Carousel.Item key={idx}>
                    <img
                        style={{paddingBottom:'1rem',objectFit:'cover',width:'100%',height:'500px'}}
                        key={idx}
                        src={url} 
                        alt={idx}
                    />
                    </Carousel.Item>
                ))}
            </Carousel>
            <article style={{paddingTop:'5rem', width:'100%', margin:'0 auto',textAlign:'left'}}>{desc.split('\n').map(item=>(
                item !== ""
                ? <p>{item}</p>
                : <p/>
            ))}</article>
        </div>
    )
}

export default PhilosophyPage
