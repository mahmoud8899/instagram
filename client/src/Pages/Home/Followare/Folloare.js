
import "./Followare.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {  UserId_action, followUserAction } from "../../../redux/Action/Auth_action"
import ImageUsers from "../../image_User/user-male.png"
import { Link } from "react-router-dom"
import axios from "axios"


const Followare = ({ history }) => {



    // const userslistID = useSelector((state) => state.userslistID)
    //  const { lists } = userslistID
    // console.log('c',lists)


    // user Info 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    // user id 
    const userID = useSelector((state) => state.userID)
    const { userid } = userID


    //  console.log('userid', userid)



    // user follow .. 
    const follouserID = useSelector((state) => state.follouserID)
    const { success } = follouserID


    const dispatch = useDispatch()




    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            //   dispatch(ListsUser())
            dispatch(UserId_action(userInfo._id))
        }




        // eslint-disable-next-line
    }, [userInfo, dispatch, history, success,])




    const [dataList, setDataList] = useState(null)




    useEffect(() => {

        const listFollow = async () => {
            try {
                const { data } = await axios.get(`/api/user/userlist/`)
                setDataList(data)
            } catch (error) {
                console.error(error)
            }
        }

        listFollow()


    }, [])












    const HandlFollo = (e, id) => {

        e.preventDefault()
       // console.log('id', id)

        dispatch(followUserAction({ _id: id }))
    }



    return (
        <div className="Followare___Home">


            <span className="Suggested__Home">

                Suggested
                {follouserID ? <p>follw</p> : null}
            </span>


            <span className="Follow_x">

                {dataList?.map((user, userIndex) => (

                    userid?.followare?.includes(user?._id) ?

                    null
                    :

                        

                        

                        
                        <span className="user_info_followare" key={userIndex}>
                            <Link className="Link" to={`/profile/${user?._id}`}>
                                {user?.image ?
                                    <img src={user?.image} alt="hello h" className="user_info_followare_image" />
                                    :
                                    <img src={ImageUsers} alt="hello h" className="user_info_followare_image" />
                                }

                            </Link>


                            <p className="user_info_followare_name" >{user?.username}</p>
                            <p className="user_info_followare_follow" onClick={(e) => HandlFollo(e, user?._id)}>Follow</p>
                        </span>

                ))}



            </span>





        </div>
    )
}


export default Followare


/*

*/