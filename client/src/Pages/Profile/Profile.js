import "./Profile.css"
import React, { Fragment, useEffect, useContext, useState } from "react"
import Post from "./Post/Post"
import StoryPhoto from "./StoryPhoto/StoryPhoto"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import Title from "../title"
import Notifications from "./notifications/Notifications"
import { useSelector, useDispatch } from "react-redux"
import {
    UserId_action,
    userFolloware,
    UserFollowIng_Action,
    StorImageShow_Action,
    ListsUser,

} from "../../redux/Action/Auth_action"
import { PostOnly_actionView } from "../../redux/Action/Post_action"
import { textCount } from "../../App"
const Profile = ({ history, match }) => {


    const [currentId] = useContext(textCount)





    const dispatch = useDispatch()
    const userprofileId = match.params.id
    // console.log(userprofileId)

    // check user Info ... 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // user id
    const userID = useSelector((state) => state.userID)
    const { userid } = userID

    //console.log('userid',userid)

    // userStory Imae... 
    const storimageID = useSelector((state) => state.storimageID)
    const { storyimage } = storimageID
    // console.log('storimageID',storyimage)






    // follow and unfollw..
    const follouserID = useSelector((state) => state.follouserID)
    const { success: FollowareSuccess } = follouserID







    // post only user.. 
    const postID = useSelector((state) => state.postID)
    const { post } = postID






    // create post.. 
    const postcreateID = useSelector((state) => state.postcreateID)
    const { success: successpostcreateID } = postcreateID







    const userslistID = useSelector((state) => state.userslistID)
    const { lists } = userslistID




    // ADD comment... 
    const commentID = useSelector((state) => state.commentID)
    const { success: succesScommentID } = commentID




    // following 
    const followID = useSelector((state) => state.followID)
    const { follow } = followID
    // console.log('follow',follow)


    // add like to post... from user... 
    const likeID = useSelector((state) => state.likeID)
    const { success: likesuccess } = likeID



    // add like to comment ... 
    const likecommentID = useSelector((state) => state.likecommentID)
    const { success: likecommentIDSuccess } = likecommentID



    // upload My page...
    useEffect(() => {


        if (userInfo) {
            if (userprofileId) {
                dispatch(UserId_action(userprofileId))
                dispatch(userFolloware(userprofileId))
                dispatch(UserFollowIng_Action(userprofileId))
                dispatch(StorImageShow_Action({_id :userprofileId, userFollo : userInfo._id}))
                dispatch(PostOnly_actionView({ _id: userprofileId, userId: userInfo._id }))

            }


            dispatch(ListsUser())
            // eslint-disable-next-line
        } else {
            history.push('/login')
        }

    }, [
        history,
        userInfo,
        dispatch,
        userprofileId,
    ])




    // create post and update post   and komment. ....
    useEffect(() => {


        if (userInfo) {
            if (successpostcreateID) {
                if (userprofileId) {
                    dispatch(PostOnly_actionView({ _id: userprofileId, userId: userInfo._id }))
                }
                // console.log('successpostcreateID',successpostcreateID)
            }

        }







    }, [userprofileId, successpostcreateID, dispatch, userInfo])





    // followare and Unfollo
    useEffect(() => {

        if(userInfo){
            if (FollowareSuccess) {

                if (userprofileId && FollowareSuccess) {
    
                    dispatch(userFolloware(userprofileId))
                    dispatch(UserId_action(userprofileId))
                    dispatch(PostOnly_actionView({ _id: userprofileId, userId: userInfo._id }))
                  //  dispatch(StorImageShow_Action({_id :userprofileId, userFollo : userInfo._id}))
    
    
                }
                // dispatch(UserId_action(userprofileId))
                //  console.log('FollowareSuccess',FollowareSuccess)
            }
        }



    }, [userprofileId, FollowareSuccess, dispatch,userInfo])





    // add comment... 

    useEffect(() => {
        if (userInfo) {
            if (succesScommentID) {

                if (userprofileId || userprofileId) {
                    dispatch(PostOnly_actionView({ _id: userprofileId, userId: userInfo._id }))
                }


            }
        }



    }, [succesScommentID, userprofileId, dispatch, userInfo])



    // add Like...
    useEffect(() => {

        if (userInfo) {
            if (likesuccess || likecommentIDSuccess) {
                // console.log('likesuccess', likesuccess)
                dispatch(PostOnly_actionView({ _id: userprofileId, userId: userInfo._id }))
            }
        }





    }, [likesuccess, dispatch, likecommentIDSuccess, userprofileId, userInfo])







    // user realod.. 
    const [reloadUser,setReloadUser] = useState(false)
  //  console.log('reloadUser',reloadUser)
    useEffect(()=>{
        if (userInfo && reloadUser) {
            if (userprofileId) {
                dispatch(UserId_action(userprofileId))
                setReloadUser(false)
            }
        }
    },[userInfo,userprofileId,reloadUser])





    return (


        <Fragment>



            <Title title={`My Profile - ${userid?.username}`} />

            <span className="profile_home">

                {currentId ?


                    <Notifications
                        userInfo={userInfo}
                        lists={lists}

                    />

                    :
                    <>
                        <ProfileInfo userid={userid} userInfo={userInfo} post={post} follow={follow} setReloadUser={setReloadUser} />
                        <StoryPhoto userid={userid} storyimage={storyimage} userInfo={userInfo} />

                    </>

                }

                <Post userid={userid} userInfo={userInfo} post={post} lists={lists} />
            </span>

        </Fragment>

    )
}



export default Profile



