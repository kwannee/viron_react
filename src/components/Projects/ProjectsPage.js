import React,{useState,useEffect,useRef} from 'react'
import firebase from '../../firebase'
import {CardColumns,Card,Spinner} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
function ProjectsPage({info}) {
    const [year, setYear] = useState("")
    const [projectURLs, setProjectURLs] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    useEffect(() => {
        setYear("")
        setProjectURLs([])
        let path = window.location.href
        let currentYear = path.split('/')[path.split('/').length-1]
        setYear(currentYear)
        if(info){
            setProjectURLs(info)
        }else{
            try{
                firebase.storage().ref(`Projects/${currentYear}`).listAll().then(projects=>{
                    projects.prefixes.forEach(async (folderRef)=>{
                        let folder = await firebase.storage().ref(`Projects/${currentYear}/${folderRef.name}`).listAll()
                        let keyword = await firebase.database().ref(`Projects/${currentYear}/${folderRef.name}`).once('value').then((snapshot)=>{
                            return snapshot.hasChild('keyword') ? snapshot.val().keyword : null
                        })
                        let downloadURL = await folder.items[0].getDownloadURL()
                        setProjectURLs(prev =>[...prev,{url:downloadURL,year:currentYear,name:folderRef.name,keyword:keyword}])
                    })
                })
            }catch(error){
                alert(error)
            }
        }
    }, [location,info])
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
        }
    /*business logic for component did update*/
       setLoading(true)
    });
    return (
        <div>
            <Spinner style={{display:!loading ? 'block' : 'none',position:'absolute',top:'50%',left:'62%'}} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <CardColumns style={{padding:'3rem'}}>
                    {
                        projectURLs.map((item)=>(
                            <Link className={"projectLink animate__animated animate__fadeInUp animate"+Math.round(Math.random()*7)} style={{textDecoration:'none',color:'black',boxSizing:'border-box',padding:'1rem',width:'10%'}} to={`/Project/${item.year}/${item.name}`}>
                                <Card className={"projectWrapper"} style={{border:'none'}}>
                                    <Card.Img style={{filter:'grayscale(80%)'}} className={"projectImage"} variant="top" src={item.url} fluid/>
                                    <Card.Body>
                                    <Card.Title style={{borderBottom:'1px solid gray',fontWeight:'bold'}}>{item.name}</Card.Title>
                                    <Card.Text>
                                        {
                                            item.keyword
                                            ? item.keyword.split(',').map(item=>(
                                                <span className={"projectText"} style={{color:'gray',borderBottom:'1px solid gray',margin:'5px'}}>{item}</span>
                                            ))
                                            : <span>This is a longer card with supporting text below as a natural lead-in to
                                            additional content. This content is a little bit longer.</span>
                                        }
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))
                    }
            </CardColumns>
        </div>
    )
}

export default ProjectsPage
