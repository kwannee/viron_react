import React,{useEffect,useState} from 'react'
import firebase from '../../firebase'
import {Carousel,Spinner} from 'react-bootstrap'
function PhilosophyPage() {
    const [imageUrl, setImageUrl] = useState([])
    const [loading, setLoading] = useState(false)
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
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
        }
        setTimeout(() => {
            setLoading(true)
        }, 1000);
    });
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'3rem'}}>
            <Spinner style={{display:!loading ? 'flex' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <div className={"animate__animated animate__fadeIn"} style={{display:loading ? 'block' : 'none'}}>
                <Carousel pause={false} interval={2000} style={{margin:'0 auto', width:'100%',height:'50%'}}>
                    {imageUrl.map((url,idx) =>(
                        <Carousel.Item key={idx}>
                        <img
                            style={{paddingBottom:'1rem',objectFit:'cover',width:'100%'}}
                            key={idx}
                            src={url} 
                            alt={idx}
                        />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <article style={{paddingTop:'2rem', width:'100%', margin:'0 auto',textAlign:'left'}}>{desc.split('\n').map(item=>(
                    item !== ""
                    ? <p>{item}</p>
                    : <p/>
                ))}</article>
                </div> 
        </div>
    )
}

export default PhilosophyPage
