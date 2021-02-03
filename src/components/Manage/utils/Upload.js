import React,{useState,useEffect} from 'react'
import Dropzone from 'react-dropzone'
import {BsPlus} from 'react-icons/bs'
import mime from 'mime-types'
import firebase from '../../../firebase'
function Upload({submit,part,handleSubmit,one,name,position,text,year,imageChange}) {
    const [deleteUrl, setDeleteUrl] = useState([])
    const [uploadUrl, setUploadUrl] = useState([])
    const [urls, setUrls] = useState([])
    useEffect(() => {
        setUrls([])
        if(part === "Philosophy"){
            firebase.storage().ref(`${part}/`).listAll().then(res =>{
                res.items.forEach(async item =>{
                    let url = await item.getDownloadURL()
                    setUrls(prev => [...prev,{url:url,name:item.name}])
                })
            })
        }else if(part ==="Projects"){
            firebase.storage().ref(`${part}/${year}/${name}`).listAll().then(res =>{
                res.items.forEach(async item =>{
                    let url = await item.getDownloadURL()
                    setUrls(prev => [...prev,{url:url,name:item.name}])
                })
            })
        }else if(part === "People"){
            firebase.storage().ref(`${part}/${name}`).getDownloadURL().then(res=>{
                setUrls({url:res})
            })
        }
        //name으로 해놔서 name 바뀔때마다 계속 파이어베이스 접근하고 있음 뭔가 대책이 필요함 지금은 머리가 안돌아가서모르겠음
    }, [name])
    async function fetchImages(part){

    } 
    const dropHandler = async (files) => {
        try{
            if(imageChange){
                imageChange(true)
            }
            for(let idx = 0; idx <files.length; idx++){
                let reader = new FileReader();
                let file = files[idx]
                reader.onloadend = () => {
                    if(part === "Projects"){    
                        setUrls(prev => [...prev,{url:reader.result,name:files[idx].name}])
                        setUploadUrl(prev =>[...prev,{url:reader.result,name:files[idx].name,file:file}])
                    }else if(part === "Philosophy"){
                        setUrls(prev => [...prev,{url:reader.result,name:files[idx].name}])
                        setUploadUrl(prev =>[...prev,{url:reader.result,name:files[idx].name,file:file}])
                    }
                    else{
                        setUrls({url:reader.result,name:files[idx].name,file:file})
                        setUploadUrl({url:reader.result,name:name,file:file})
                    }
                }
                reader.readAsDataURL(file)
            }
         }catch(error){
            alert(error)
         }
    }
    if(submit){
        if(one){
            let metadata = {contentType:mime.lookup(uploadUrl.name)}
            firebase.storage().ref().child(`${part}/${name}`).put(uploadUrl.file,metadata).then(snapshot=>{
                if(snapshot.state==="success"){
                    window.location.reload(false);
                }
            })
        }else{
            for(let idx = 0; idx < deleteUrl.length; idx++){
                firebase.storage().ref().child(`${part}/${deleteUrl[idx]}`).delete()
            }
            for(let idx2 = 0; idx2 <uploadUrl.length; idx2++){
                let subPart = part === "Projects" ? year+'/'+name : ""
                let metadata = {contentType:mime.lookup(uploadUrl[idx2].name)}
                firebase.storage().ref().child(`${part}/${subPart}/${uploadUrl[idx2].name}`).put(uploadUrl[idx2].file,metadata).then(snapshot=>{
                    if(snapshot.state==="success" && idx2 === uploadUrl.length-1){
                        // handleSubmit()
                        window.location.reload(false);
                    }
                })
            }
        }
    }
    const handleDelete = (e) =>{
        //클릭하면 url 어레이에서 삭제되게
        //e.target.src 하고 :로 split 파이어베이스에서 온거는 https로 시작하고 로컬로 올린거는 data로 시작함
        if(e.target.src.split(':')[0]==='https'){
            if(one){
                setDeleteUrl(e.target.src)
            }else{
                setDeleteUrl(prev => [...prev,e.target.name])
            }
        }
        if(one){
            setUploadUrl([])
            setUrls([])
        }else{
            let tmp_thumbnail = urls.filter(item => item.url !== e.target.src)
            let tmp_upload = uploadUrl.filter(item => item.url !== e.target.src)
            setUploadUrl(tmp_upload)
            setUrls(tmp_thumbnail)
        }
    }
    return (
        <div style={{width:'100%'}}>
            <div style={{display:'flex',margin:'0 auto',justifyContent:"space-between",marginBottom:'2rem',marginTop:'2rem'}}>
                        <Dropzone onDrop={dropHandler}>
                            {({getRootProps, getInputProps}) => (
                                <div
                                    style={{width:'47%', height:240,border:'1px solid lightgray',
                                            display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <BsPlus type="plus" style={{fontSize:'3rem'}}/>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                        <div style={{display:'flex' , width:'47%',height:'240px',overflowX:'scroll'}}>
                        {!one 
                        ?
                        urls.map((url,index)=>(
                            <div key={index}>
                                <img onClick={handleDelete} style={{width:'220px'}}
                                    src={url.url}
                                    name={url.name}
                                    alt={index}
                                />
                            </div>
                       ))
                       :
                       <div key={1}>
                                <img onClick={handleDelete} style={{width:'220px'}}
                                    src={urls.url}
                                    alt={1}
                                />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload
