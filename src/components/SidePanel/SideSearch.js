import React,{useState,useEffect} from 'react'
import {InputGroup,FormControl} from 'react-bootstrap'
import {Link,useHistory,useLocation} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'

function SideSearch() {
    let location = useLocation().pathname.split('/')[1]
    const history = useHistory()
    const [search, setSearch] = useState("")
    const handleSubmit = () =>{
        history.push(`/Search/${search}`)
    }
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            handleSubmit()
        }
    }
    const handleSubmitClick = () =>{
        handleSubmit(document.getElementsByClassName("searchForm")[0].value)
    }
    useEffect(() => {
        document.getElementsByClassName("searchForm")[0].value=""
    }, [location])
    return (
        <div>
            <InputGroup onKeyDown={handleKeyDown} onSubmit={handleSubmit} className="mb-3">
                <FormControl
                className={"searchForm"}
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={(e)=>setSearch(e.target.value)} value={search}
                />
                <InputGroup.Prepend>
                    <InputGroup.Text onClick={handleSubmitClick} id="basic-addon1">
                        <BiSearchAlt2/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
        </div>
    )
}

export default SideSearch
