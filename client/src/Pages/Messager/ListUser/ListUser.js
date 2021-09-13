import axios from "axios"
import { useEffect, useState } from "react"




const ListUser = ({ convstationData, userInfo, usersOnline, userOnli, setUserOnli }) => {

    const [userGet, setUserGet] = useState(null)

           // console.log('convstationData',convstationData)
    // check users Online... 
    useEffect(() => {

        if (userInfo) {

            const userOnli = usersOnline?.filter((user) => user.userId !== userInfo._id)
            setUserOnli(userOnli)

        }

    }, [userInfo, usersOnline, setUserOnli])





    useEffect(() => {
        if (userInfo) {

            const listFilterUsers = convstationData?.users.find((user) => user !== userInfo._id)

            const addUser = async () => {
                try {
                    const { data } = await axios.get(`/api/user/${listFilterUsers}`)
                    setUserGet(data)
                } catch (error) {
                    console.error(error)
                }

            }

            addUser()
        }
    }, [userInfo, convstationData])




    return (

        <span className="list_Messager">



            <img src={userGet?.image} alt="hello nicso" className="image_messager" />

            {userOnli.length === 0 ? null : userOnli?.map((user) => (

                user?.userId === userGet?._id && <p className="green"></p>
                   

                  

            ))}

            <span className="name_nav">
                <p className="xp1">{userGet?.username}</p>

                
                <p className="xp2">{convstationData?.lastMessage}</p>
            </span>
        </span>

    )
}


export default ListUser