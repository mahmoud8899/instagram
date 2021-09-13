import { useEffect, useState, useRef } from "react"
import { format } from "timeago.js"
import axios from "axios"
import write from "../sound/write.gif"
const AllMessage = ({ mssagerallt, userInfo, chatId, setUserAllt, lists, userAllt, meToo, socket, setMessagerallt, userOnli }) => {


    const scrollUseRef = useRef()
    const [messageInput, setMessageInput] = useState('')
   
    useEffect(() => {

        scrollUseRef.current?.scrollIntoView();
        scrollUseRef.current?.scrollIntoView(false);
        scrollUseRef.current?.scrollIntoView({ block: "end" });
        scrollUseRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        // eslint-disable-next-line
    }, [mssagerallt])


    useEffect(() => {
        if (chatId) {


            const newFirend = chatId?.users?.filter((user) => user)

            setUserAllt(lists?.filter((user) => newFirend.includes(user._id)))

        }
    }, [chatId, lists, setUserAllt])



    // uploading Image.. 
    const [uploadingImage, setUploadingImage] = useState(false)
    const [image, setImage] = useState(null)

    const HandlUploading = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/uploading/`, formData, config)
            //console.log('data', data)
            setImage(data)
        } catch (error) {
            console.error(error)
            setUploadingImage(false)
        }

    }










    const HandleSendMessage = (e) => {
        e.preventDefault()

        

        if (messageInput.trim()) {

            
            if (socket) {
                if (chatId) {

                    const lastUser = chatId?.users?.find((user) => user !== userInfo._id)
                    socket.emit('sendM', {
                        chatId: chatId._id,
                        userId: userInfo._id,
                        text: messageInput,
                        image: image,
                        lastUser,
                    })
                    setImage('')
                    
                    socket.on('LoadingMess', (data) => {
                        setMessagerallt([...data.message, mssagerallt])
                    })
                }

            }
            setMessageInput(e.target.value = '')
        }


    }




    const [closee, setClosee] = useState(false)
    const [imageGett, setImageGett] = useState('')
    const HandlgetImage = (src) => {
        setImageGett(src)
        setClosee(true)

    }



    return (
        <>



            <div className={closee ? "Image_open open" : "Image_open"}>

                <i className="fas fa-times" onClick={() => setClosee(false)}></i>
                <img src={imageGett} className="Image_open-image" alt="hello igem" />
            </div>


            <span className="top_nav_message">
                {meToo?.map((too) => (
                    <span className="top_nav_message_som">
                        <img src={too?.image} alt={too?.username} className="top_nav_message_image" />
                        {userOnli?.map((user) => (
                            user?.userId === too?._id &&
                            <p className="green_2 "></p>


                        ))}

                        <span className="name_nav eop">
                            <p className="xp1 eop2">{too?.username}</p>
                            <p className="xp2">Activ 44m ago</p>
                        </span>

                        <span className="i__">
                            <p>i</p>
                        </span>
                    </span>

                ))}

            </span>


            <span className="messager_Allt" >

                {userInfo ?


                    mssagerallt?.map((mess, messIndex) => (

                        <span className={mess?.sender === userInfo._id ? "messager_Allt_message_right_first" : "messager_Allt_message_left"} >

                            <span className={mess?.sender === userInfo._id ? "messager_Allt_message_right" : "messager_Allt_message"}>
                                {userAllt?.map((user) => (
                                    user?._id === mess?.sender ?
                                        <img src={user?.image} className={mess?.sender === userInfo._id ? "messager_Allt_message_image_right" : "messager_Allt_message_image"} alt="" />
                                        : null
                                ))}

                                <p key={messIndex} ref={scrollUseRef}>{mess?.text}</p>

                            </span>
                            <span className={mess?.sender === userInfo._id ? "time_message_right" : "time_message"}>

                                {mess?.image &&

                                    <img src={mess?.image} alt="hello nice" className={mess?.sender === userInfo._id ? "ImageChat" : "ImageChat_ringht"} onClick={() => HandlgetImage(mess?.image)} />
                                }
                                <p>{format(mess?.date)}</p>
                            </span>


                        </span>
                    ))

                    : null}






            </span>



            <span className="messager_input">

                <input
                    className="messager_input_input"
                    placeholder="Message..."
                    onChange={e => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleSendMessage(e) : null
                    }

                />

                <i className="far fa-file-image" onClick={() => console.log('Uploading..')}>
                    <input type="file" name="image" className="Uploading_Image" onChange={HandlUploading} />
                    {uploadingImage && <h1>Uploading...</h1>}
                </i>
                <i className="far fa-smile smip"></i>

            </span>




        </>
    )
}


export default AllMessage






/*
 const [userWrites, setUserWrites] = useState(null)
    // Handle send Mesage... 
    const [messageInput, setMessageInput] = useState('')



    useEffect(() => {

        if (messageInput || socket || userInfo) {
            socket.emit('writes',   userInfo.username )

            socket.on('new-date', (username)=>  setUserWrites(username)
            )
        }

    }, [messageInput, socket, userInfo, setUserWrites])

            {userWrites &&

                <span className="Writing">
                    <p className="Writing-name">{userWrites}..</p>
                    <img src={write} className="Writing-user" alt="" />
                </span>

            }

  
 */