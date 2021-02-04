import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import firebase from '../../firebase'
import {Carousel,Spinner} from 'react-bootstrap'
import HomeCard from './HomeCard'
import {setHomeInfo} from '../../redux/actions/main_action'
function HomePage() {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(
        () => {
        firebase.storage().ref('Home/').listAll().then(async res =>{
            res.items.forEach(async item =>{
                let url = await item.getDownloadURL()
                let name = item.name
                setImageUrl(prev =>[...prev,{url:url,name:name}])
            })
        })
    }, [])
    setTimeout(() => {
        setLoading(true)
    }, 1000);
    return (
        <div>
            <Spinner style={{display:!loading ? 'block' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
             <Carousel className={"animate__animated animate__fadeIn"} pause={false} interval={4500} style={{margin:'0 auto',overflow:'hidden',display:loading ? 'block' : 'none'}}>
                {imageUrl.map((url,idx) =>(
                    <Carousel.Item key={idx}>
                        <HomeCard url={url.url} name={url.name}/>
                    </Carousel.Item>
                ))
                }
            </Carousel>
        </div>
    )
}

export default HomePage
