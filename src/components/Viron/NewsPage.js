import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Spinner} from 'react-bootstrap'
import NewsModal from './NewsModal'
import {FaClone} from 'react-icons/fa'
function NewsPage() {
    const [fetched, setFetched] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(
        () => {
        fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,children,user_profile&access_token=IGQVJXV1Jra1ZAHXzVxeTVoOVNHcWoyaFQwOGlzSEFJRnJqVUNFclVMVktUbUUtTmFlNFZASelg2eXNvZAUlFUW81V2djNkJaTXl5OGhmQWpxOUNZATmZAZAWFB5OHZAQVmhPVTNjWkdTZAWFPRkIzZAFkwMk5vdgZDZD')
        .then(async response => {
            let result = await response.json()
            setFetched(result["data"])
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
        }, 500);
    });
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'1  rem'}}>
            <Spinner style={{display:!loading ? 'flex' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <Container className={"animate__animated animate__fadeIn"} style={{padding:0,margin:0,maxWidth:'unset',paddingRight:'2rem',display:loading ? 'block' : 'none'}}>
                <Row>
                {
                    fetched.map((item,idx) => (
                        <Col style={{paddingBottom:'1rem'}} xl={3} lg={4} md={6} xs={9} key={idx}>
                             <NewsModal data={item}/>
                             {item.children && <FaClone style={{position:'absolute',top:'5px',right:'20px',fontSize:'18px',color:'white'}}/>}
                        </Col>
                    ))
                }
                </Row>
            </Container>

        </div>
    )
}

export default NewsPage
