import React,{useState,useEffect} from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'

function HomeCard({url,name}) {
    const [info, setInfo] = useState({})
    useEffect(() => {
        let projectName = name.split('_')[0]
        let projectYear = name.split('_')[1].replace('.jpg',"")
        firebase.database().ref(`Projects/${projectYear}/${projectName}`).on('value',snapshot=>{
            setInfo(snapshot.val() !== null ? snapshot.val() : "없음")
        })
    }, [])
    return (
        <div>
            <Link to={`/Project/${name.split('_')[1].replace('.jpg',"")}/${name.split('_')[0]}`}>
                <Card bg="light" text="dark" className="bg-light text-dark" style={{overflowY:'hidden'}}>
                        <Card.Img style={{objectFit:'cover',width:'100%',height:'90vh',paddingRight:'1rem',overflow:'hidden',boxShadow:'none'}} src={url} alt="Card image" />
                </Card>
                <div style={{color:'black',textDecoration:'none',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <h5>{name.split('_')[0]}</h5>
                    <h6>{name.split('_')[1].replace('.jpg',"")}</h6>
                </div>
            </Link>
        </div>
    )
}

export default HomeCard
