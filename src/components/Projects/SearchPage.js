import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import firebase from '../../firebase'
import ProjectsPage from './ProjectsPage'

function SearchPage() {
    const SERACH_WORD = useLocation().pathname.split('/')[2].toLowerCase()
    const [searchResult, setSearchResult] = useState([])
    const fetchProjects = async () =>{
        await firebase.storage().ref(`Projects/`).listAll().then(res=>{
            res.prefixes.forEach(year=>{
                firebase.storage().ref(`Projects/${year.name}/`).listAll().then(project=>{
                    project.prefixes.forEach(async each =>{
                        if(each.name.toLowerCase().indexOf(SERACH_WORD) !== -1){
                            firebase.storage().ref(`Projects/${year.name}/${each.name}`).listAll().then( async abc=>{
                                let url =await abc.items[0].getDownloadURL()
                                let info = await (await firebase.database().ref(`Projects/${year.name}/${each.name}`).once('value')).val()
                                setSearchResult(prev =>[...prev,{url:url,year:year.name,name:each.name,keyword:info["keyword"]}])
                            })
                        }
                    })
                })
            })
        })
    }
    useEffect(() => {
        setSearchResult([])
        fetchProjects()
    }, [SERACH_WORD])
    return (
        <div>
            <ProjectsPage info={searchResult}/>
        </div>
    )
}

export default SearchPage
