import React,{useState,useEffect} from 'react'
import firebase from '../../firebase'
import {CardColumns,Card} from 'react-bootstrap'
import {Link,useLocation} from 'react-router-dom'
function ProjectsPage() {
    const [year, setYear] = useState("")
    const [projectURLs, setProjectURLs] = useState([])
    const location = useLocation();
    useEffect(() => {
        setYear("")
        setProjectURLs([])
        let path = window.location.href
        let currentYear = path.split('/')[path.split('/').length-1]
        setYear(currentYear)
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
    }, [location])

    return (
        <div>
            <CardColumns style={{padding:'3rem'}}>
                    {
                        projectURLs.map((item)=>(
                            <Link className={"projectLink"} style={{textDecoration:'none',color:'black',boxSizing:'border-box',padding:'1rem',width:'10%'}} to={`/Project/${item.year}/${item.name}`}>
                                <Card className={"projectWrapper"} style={{border:'none'}}>
                                    <Card.Img style={{filter:'grayscale(80%)'}} className={"projectImage"} variant="top" src={item.url} fluid/>
                                    <Card.Body>
                                    <Card.Title style={{borderBottom:'1px solid gray'}}>{item.name}</Card.Title>
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
