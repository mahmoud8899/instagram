import { useEffect, useState } from "react"
import axios from "axios"
const CreateChat = ({ closChat, setClosChat, follow, userInfo, setConvstationData, lists }) => {






    const [valueName, setValueName] = useState(null)
    const [idBlue, setIdBlue] = useState(null)
    const [inputOption, setInputOption] = useState('')
    const [resultFilter, setResultFilter] = useState(null)






    useEffect(() => {


        if (inputOption) {

            setResultFilter(lists.filter((val) => val.username.toLowerCase().includes(inputOption.toLowerCase())))
        } else {
            setResultFilter(null)
        }



    }, [lists, inputOption, setResultFilter])





    const HandlSearch = () => { }


    const HandlCreateChat = (e, user, id) => {
        e.preventDefault()


        console.log(user, id)
        setValueName(user)
        setIdBlue(id)




    }


    // create chat wthid user... 
    // localhost:8000/api/chat/create/
    const HandlCeateChatwithUser = async (e) => {

        e.preventDefault()
        // console.log('next',idBlue)
        if (idBlue) {
            try {

                const config = {
                    userId: userInfo._id,
                    lastId: idBlue
                }



                const { data } = await axios.post(`/api/chat/create/`, config)
                setConvstationData((prev) => [...prev, data])
                setClosChat(false)
                setValueName(e.target.value = '')


            } catch (error) {
                // console.log(error.response ? error.response.data.message : error.message)
                alert(error.response ? error.response.data.message : error.message)
            }


        } else {
            return
        }

    }





    return (
        <div className={closChat ? "create_chat open" : "create_chat"}>

            <div className="first_create_chat">


                <span className="first_close">
                    <i className="fas fa-times" onClick={() => setClosChat(false)}></i>
                    <p className="message_newww">New Message</p>
                    <p className="next__" onClick={(e) => HandlCeateChatwithUser(e)}>next</p>
                </span>


                <span className="last_search_">
                    <p className="to__">to :</p>
                    {valueName ?
                        <p className="addUser">
                            {valueName}
                            <i className="fas fa-times" onClick={() => setValueName('')}></i>
                        </p>

                        : null}


                    <input
                        placeholder="Search.."
                        className="SearchUser"
                        name="value"
                        onChange={(e) => setInputOption(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? HandlSearch(e) : null}
                    />

                </span>



                <h1 className="Suggested">Suggested</h1>


                <span className="scroll_image" >



                    {inputOption &&

                        resultFilter?.map((user, userIndex) => (

                            <span className="user_list_image" key={userIndex} onClick={(e) => HandlCreateChat(e, user?.username, user?._id)} >

                                <img src={user?.image} alt={user?.username} className="user_list_image_image" />
                                <p>{user?.username}</p>
                                <span className="check_mahmoud">


                                    {valueName ?


                                        idBlue === user?._id ?


                                            <p className="xop"></p>

                                            : null

                                        : null
                                    }
                                </span>
                            </span>
                        ))
                    }




                    {follow?.map((folo, foloIndex) => (

                        <span className="user_list_image" key={foloIndex} onClick={(e) => HandlCreateChat(e, folo?.username, folo?._id)} >

                            <img src={folo?.image} alt={folo?.username} className="user_list_image_image" />
                            <p>{folo?.username}</p>
                            <span className="check_mahmoud">


                                {valueName ?


                                    idBlue === folo?._id ?


                                        <p className="xop"></p>

                                        : null

                                    : null
                                }
                            </span>
                        </span>
                    ))}



















                </span>

            </div>

        </div>








    )
}


export default CreateChat



/*

                      {keyword ?


                        lists?.map((user, userIndex) => (

                            <span className="user_list_image" key={userIndex} onClick={(e) => HandlCreateChat(e, user?._id)} >

                                <img src={user?.image} alt={user?.username} className="user_list_image_image" />
                                <p>{user?.username}</p>
                                <span className="check_mahmoud">


                                    {valueName ?


                                        idBlue === user?._id ?


                                            <p className="xop"></p>

                                            : null

                                        : null
                                    }
                                </span>
                            </span>
                        ))



                        :
*/