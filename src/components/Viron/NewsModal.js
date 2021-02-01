import React,{useState,useEffect} from 'react'
import {Image,Modal,Carousel} from 'react-bootstrap'
import {FiInstagram} from 'react-icons/fi'
function NewsModal({data}) {
    const [urls, setUrls] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(data.children !== undefined){
            let media_id = data.id
            fetch('https://graph.instagram.com/' + media_id + '/children/?fields=id,media_type,media_url,timestamp&access_token=IGQVJXV1Jra1ZAHXzVxeTVoOVNHcWoyaFQwOGlzSEFJRnJqVUNFclVMVktUbUUtTmFlNFZASelg2eXNvZAUlFUW81V2djNkJaTXl5OGhmQWpxOUNZATmZAZAWFB5OHZAQVmhPVTNjWkdTZAWFPRkIzZAFkwMk5vdgZDZD')
            .then(async response => {
                let info = await response.json()
                setUrls(info["data"])
            })
        }else{
            setUrls(data.media_url)
        }
    }, [])
    return (
        <div>
           <Image onClick={handleShow} style={{width:'100%',height:'auto'}} src={data.media_url}/>
           <Modal centered size={'lg'} show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{width:'70%'}}>
                <Modal.Body>
                <Carousel pause={false} interval={2000} style={{margin:'0 auto', width:'100%',height:'auto'}}>
                    {typeof urls === "string" 
                    ?
                    <Carousel.Item key={urls}>
                        <img
                            style={{objectFit:'cover',width:'100%',height:'auto'}}
                            src={urls}
                            alt={2}
                        />
                    </Carousel.Item>
                    :
                    urls.map((url,idx) =>(
                        <Carousel.Item key={idx}>
                           <img
                                style={{objectFit:'cover',width:'100%',height:'auto'}}
                                key={idx}
                                src={url.media_url}
                                alt={idx}
                            />
                        </Carousel.Item>
                    ))
                }
                </Carousel>
                </Modal.Body>
            </div>
            <div style={{width:'30%'}}>
                <Modal.Body stlye={{height:'100%'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span>__Viron</span>
                        <a style={{color:'black'}} href={"https://www.instagram.com/__viron/"} rel={"noreferrer"} target={"_blank"}><FiInstagram /></a>
                    </div>
                    <div style={{paddingTop:'2rem',display:'flex',justifyContent:'space-between',height:'80%',flexDirection:'column'}}>
                        <div>{data.caption}</div>
                        <div style={{textAlign:'right',color:'gray'}}>{data.timestamp.split('T')[0]}</div>
                    </div>
                </Modal.Body>
            </div>
            </div>
        </Modal>
        </div>
    )
}

export default NewsModal
