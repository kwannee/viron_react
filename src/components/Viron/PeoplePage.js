import React,{useEffect,useState,useRef} from 'react'
import firebase from '../../firebase'
import {Card,Container,Row,Col,Image,Spinner} from 'react-bootstrap'
import PeopleDesc from './PeopleDesc'
import $ from 'jquery'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

export default function PeoplePage() {
    const [imageUrl, setImageUrl] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
        firebase.storage().ref('People/').listAll().then(async res =>{
            res.items.forEach(async item =>{
                let name = item.name.replace(".jpg","")
                let url = await item.getDownloadURL()
                setImageUrl(prev =>[...prev,{url:url,name:name}])
            })
        })
        
    }, [])
    useEffect(() => {
        $(document).on('click','.peopleImgWrapper',(e)=>{
            $(`.peopleInner.${e.target.classList[0]}`).slideToggle()
            $('.peopleInner').not('.'+e.target.classList[0]).slideUp()
        })
    }, [])

    const handlePeopleClick = (e) =>{
        if(e.target.classList[3] === undefined){
            e.target.classList.add('colorful')
        }else{
            e.target.classList.remove('colorful')
        }
    }
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
        }
        setTimeout(() => {
            setLoading(true)
        }, 500);
    });

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'1  rem'}}>
            <Spinner style={{display:!loading ? 'flex' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Container fluid style={{display:loading ? 'flex' : 'none',justifyContent:'center',alignItems:'center',margin:0,padding:0,paddingTop:'1rem',overflow:'hidden',marginBottom:'15rem'}}>
               <Row className={"peopleRow"} style={{margin:0}}>
               {
                imageUrl.map((info,idx)=>(
                <Col  className={"animate__animated animate__fadeInUp animate"+Math.round(Math.random()*7)} key={idx} onClick={handlePeopleClick} style={{margin:0,padding:0,paddingBottom:'1rem'}} xl={3} lg={4} md={6} xs={9}>
                    <div className={`peopleInner ${info.name}`} style={{textAlign:'left',padding:'1rem',display:'none'}}>
                        <PeopleDesc name={info.name}/>
                    </div>
                    <Card className={`peopleImgWrap ${info.name} `} style={{backgroundColor:'unset',border:'unset',width:'90%',fontSize:'15px'}}>
                        <Card.Header className={"peopleImgWrapper"} style={{padding:0,margin:0}}>
                                <Image className={`peopleImgWrap ${info.name} `} style={{filter:'grayscale(80%)'}} className={info.name+' '+ "peopleImg"} src={info.url} fluid/>
                        </Card.Header>
                        <span style={{fontWeight:'500',paddingTop:'5px'}}>{info.name}</span>
                    </Card>                                
                    
                </Col> 
                ))
                }
                </Row>  
            </Container>
        </div>
    )
}
