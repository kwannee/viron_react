import React,{useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import firebase from '../../firebase'
import {Carousel} from 'react-bootstrap'
import HomeCard from './HomeCard'
import {setHomeInfo} from '../../redux/actions/main_action'
function HomePage() {
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState([])
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
    return (
        <div>
             <Carousel pause={false} interval={4500} style={{margin:'0 auto',overflow:'hidden'}}>
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
