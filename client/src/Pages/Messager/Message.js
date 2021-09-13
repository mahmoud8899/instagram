
import "./Message.css"
import ListUser from "./ListUser/ListUser"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import AllMessage from "./AllMessage"
import { ListsUser, userFolloware } from "../../redux/Action/Auth_action"
import io from "socket.io-client"
import CreateChat from "./CreateChat"
import mess from "../sound/message.mp3"
import useSound from 'use-sound';
import Title from "../title"

const Messager = ({ history }) => {



    const [PalyMessage] = useSound(mess)


    const [socket, setSocket] = useState(null)

    const setupSocket = () => {

        if (!socket) {
            const newSocket = io.connect(`https://instagram-uppsala.herokuapp.com/`, { reconnect: true })
            newSocket.on('disconnect', () => {
                setSocket(null)
                setTimeout(setupSocket, 3000)
                console.log('disconnect', 'socket Disconnect !')
            })

            newSocket.on('connect', () => {
                console.log('success')
            })

            setSocket(newSocket)

        }
    }


    useEffect(() => {
        setupSocket()
        // eslint-disable-next-line
    }, [])




    const dispatch = useDispatch()
    // user Info. 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    // list followare .. 
    const followID = useSelector((state) => state.followID)
    const { follow } = followID

    //console.log('follow',follow)

    // user Info. 
    const userslistID = useSelector((state) => state.userslistID)
    const { lists } = userslistID
    // console.log('lists',lists)

    //console.log('userLogin', userInfo)
    const [convstationData, setConvstationData] = useState([])
    const [chatId, setChatId] = useState(null)
    // console.log('chatId', chatId)
    // console.log('convsation',convstationData)
    const [mssagerallt, setMessagerallt] = useState([])
    //console.log('mssagerallt', mssagerallt)

    const [sistaUpdate, setSistaUpdate] = useState(null)
    // set user Onlline... 
    const [usersOnline, setUsersOnline] = useState([])
    const [userOnli, setUserOnli] = useState([])


    // convstion...
    useEffect(() => {

        if (userInfo) {
            dispatch(ListsUser())
            dispatch(userFolloware(userInfo._id))
            const addConverstion = async () => {
                try {
                    const { data } = await axios.get(`/api/chat/user/${userInfo._id}/`)
                    setConvstationData(data)
                    //  console.log('data', data)
                } catch (error) {
                    console.error(error)
                }
            }
            addConverstion()
        } else {
            history.push('/')
        }

    }, [userInfo, dispatch, history])




    // message...
    useEffect(() => {

        if (userInfo) {
            if (chatId) {

                const addMessage = async () => {
                    try {
                        const { data } = await axios.get(`/api/chat/chat/${chatId?._id}`)
                        setMessagerallt(data.message)
                    } catch (error) {
                        console.error(error)
                    }
                }
                addMessage()

            }
        }

    }, [userInfo, chatId])



    // userList chat.. 
    const [userAllt, setUserAllt] = useState([])

    const [meToo, setMeToo] = useState(null)
    useEffect(() => {
        if (userInfo) {
            const Onlymett = userAllt?.filter((user) => user._id !== userInfo._id)
            //console.log('Onlymett', Onlymett)
            setMeToo(Onlymett)
        }
    }, [userInfo, userAllt])



    // Online users. and Login users
    useEffect(() => {
        if (userInfo) {
            if (socket) {
                socket.emit('join', userInfo._id)

                socket.on('getUser', users => {
                    setUsersOnline(users)
                })
            }

        }
    }, [userInfo, socket])



    // send it ti the other user....
    useEffect(() => {

        if (userInfo) {

            if (socket) {

                socket.on('sendigen', (data) => {
                    setSistaUpdate({
                        sender: data.userId,
                        text: data.text,
                        date: Date.now()
                    })

                })
            }

        }



    }, [socket, userInfo])




 // filter message .... 
    useEffect(() => {

        sistaUpdate && chatId?.users?.includes(sistaUpdate.sender) &&
            setMessagerallt(prev => [...prev, sistaUpdate])


    }, [sistaUpdate, chatId])






    const [closChat, setClosChat] = useState(false)

    return (

        <>

            <Title title={`Message -${userInfo.username}`} />

            <CreateChat
                closChat={closChat}
                setClosChat={setClosChat}
                userInfo={userInfo}
                follow={follow}
                setConvstationData={setConvstationData}
                lists={lists}


            />








            <div className="Messager___Home">



                <span className="Home_Messager">


                    <span className="Messager___Home_left">

                        <span className="top_info">
                            <p>Mahmoud Talt </p>

                            <span className="filter_search">
                                <i className="far fa-edit" onClick={() => setClosChat(true)}></i>
                            </span>
                        </span>

                        <span className="userList_messager">

                            {convstationData?.map((convstationData) => (

                                <div onClick={() => setChatId(convstationData)} key={convstationData._id}>
                                    <ListUser
                                        convstationData={convstationData}
                                        userInfo={userInfo}
                                        setChatId={setChatId}
                                        usersOnline={usersOnline}
                                        userOnli={userOnli}
                                        setUserOnli={setUserOnli}

                                    />

                                </div>

                            ))}

                        </span>
                    </span>


                    <span className="Messager___Home_right">

                        {chatId ?



                            <AllMessage
                                mssagerallt={mssagerallt}
                                userInfo={userInfo}
                                chatId={chatId}
                                setUserAllt={setUserAllt}
                                lists={lists}
                                userAllt={userAllt}
                                meToo={meToo}
                                socket={socket}
                                setMessagerallt={setMessagerallt}
                                userOnli={userOnli}

                            />


                            :


                            <div className="no-message">

                                <span className="paper-send">
                                    <i className="far fa-paper-plane"></i>
                                </span>

                                <p className="Your-Messages">
                                    Your Messages

                                </p>
                                <p className="send-private">
                                    Send private photos and messages to a friend or group.
                                </p>

                                <p className="message-button" onClick={() => setClosChat(true)} >Send Message</p>


                            </div>


                        }



                    </span>


                </span>

            </div>

        </>
    )
}



export default Messager