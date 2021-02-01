import React from 'react'
import {InputGroup,FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {BiSearchAlt2} from 'react-icons/bi'

function SideSearch() {
    const handleSubmit = (e) =>{
        console.log(e.value)
    }
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            handleSubmit(e.target)
        }
    }
    const handleSubmitClick = () =>{
        handleSubmit(document.getElementsByClassName("searchForm")[0].value)
    }
    return (
        <div>
            <InputGroup onKeyDown={handleKeyDown} onSubmit={handleSubmit} className="mb-3">
                <FormControl
                className={"searchForm"}
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
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
