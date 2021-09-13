import { useState } from "react"




const Search = ({history}) => {


    const [keyword,setKeyWork] = useState('')

    const HandlSearch = (e)=>{
        e.preventDefault()
        if(keyword){
            history.push(`/messager/${keyword}`) 
            console.log(keyword)
        }else{
            history.push('/messager/') 
        }

    }


    return (
        <>
            <input 
            placeholder="Search.."
             className="SearchUser"
              name="value" 
              onChange={(e)=> setKeyWork(e.target.value)}
              onKeyPress={(e)=> e.key === 'Enter' ? HandlSearch(e): null}
              />
        </>
    )
}


export default Search