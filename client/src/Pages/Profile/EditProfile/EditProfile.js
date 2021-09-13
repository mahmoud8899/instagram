import React, { Fragment, useEffect } from "react"
import "./EditProfile.css"
import Edit from "./Edit/Edit"
import { useDispatch, useSelector } from "react-redux"
import { UserId_action } from "../../../redux/Action/Auth_action"
import Title from "../../title"
const EditProfile = () => {



   // const userIDpRorfile = match.params.id
    //console.log(userIDpRorfile)
    const dispatch = useDispatch()
    // user Info... 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // console.log('user', userInfo)

    const userID = useSelector((state) => state.userID)
    const { userid } = userID
  //  console.log('userid', userid)




    // profile change.. 
    const profileID = useSelector((state)=>state.profileID)
    const {success} = profileID


    useEffect(() => {

        if (userInfo) {
            dispatch(UserId_action(userInfo._id))
        }

    }, [userInfo, dispatch,success])



    return (
        <Fragment>

            <Title  title={`Edit -- ${userid?.username}`} />
            <span className="profile_Edit">



                <span className="profile_Edit_left">
                    <p  >Edit Profile</p>
                    <p   >Change Password</p>

                </span>

                <span className="profile_Edit_Rinht">

                    <Edit userid={userid} userInfo={userInfo} />


                </span>


            </span>








        </Fragment>
    )
}




export default EditProfile