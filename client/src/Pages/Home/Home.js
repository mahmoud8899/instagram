import "./Home.css"
import ScrollStory from "./ScrollStory/ScrollStory"
import PostUser from "./PostUser/PostUser"
import ListFolloware from "./ListFolloware"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ListsUser, StoryViews_Action } from "../../redux/Action/Auth_action"
import { ViewPost_action, vIEWlIKE_Action } from "../../redux/Action/Post_action"
import Title from "../title"
const Home = ({ history }) => {

    const dispatch = useDispatch()
    // check user Info... 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin




    // users list 
    const userslistID = useSelector((state) => state.userslistID)
    const { lists } = userslistID
    //   console.log('ListsUser',lists)

    // ALL POST.. 
    const allpostID = useSelector((state) => state.allpostID)
    const { allpost } = allpostID

    // add comment =..>
    const commentID = useSelector((state) => state.commentID)
    const { success: successcommentID } = commentID


    // add like to post from user.. 
    const likeID = useSelector((state) => state.likeID)
    const { success: successlikeID } = likeID

    // DELETE POST.. 
    const deletepostID = useSelector((state) => state.deletepostID)
    const { success: successdeletepostID } = deletepostID



    // comment.. 
    const likecommentID = useSelector((state) => state.likecommentID)
    const { success: succesSlikecommentID } = likecommentID


    // story views 
    const storyID = useSelector((state) => state.storyID)
    const { story } = storyID


    


    // upload page ...>
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {

            dispatch(ListsUser())
            dispatch(ViewPost_action())
            dispatch(StoryViews_Action())
        }


    }, [
        userInfo,
        history,
        dispatch,
        //successcommentID,
        // successlikeID,
        //successdeletepostID,
        //  succesSlikecommentID
    ])


    // uploading story.. images.. 
        // uploadin story... 
        const [uploadingtoStory, setUploadingtoStory] = useState(false)
        useEffect(()=>{

            if(uploadingtoStory){
            //    console.log('uploading',uploadingtoStory)
                dispatch(StoryViews_Action())
            }

        },[uploadingtoStory,dispatch])


    // add comment..  and like to comment...
    useEffect(() => {

        if (successcommentID || successdeletepostID) {
            // console.log('Success comment...!', successlikeID)
            return dispatch(ViewPost_action())
        } else {

            if (succesSlikecommentID) {
                //console.log('succesSlikecommentID', succesSlikecommentID)
                return dispatch(ViewPost_action())
            }

        }
    }, [successcommentID, dispatch, succesSlikecommentID,successdeletepostID])




    // add like to post... 
    useEffect(() => {
        if (successlikeID) {
            return dispatch(ViewPost_action())
        }
    }, [successlikeID, dispatch])






    const [idLike, setIdLike] = useState(null)
    //console.log('idLike',idLike)
    // viws likes // 
    const likelistID = useSelector((state) => state.likelistID)
    const { like } = likelistID


    // View  likes  
    useEffect(() => {

        if (userInfo) {
            if (idLike) {

                dispatch(vIEWlIKE_Action(idLike))
            }

        }

      
    }, [dispatch, idLike, userInfo])


    const [offset,setOffset] = useState('')

       // scroll 
       useEffect(()=>{

          window.onscroll = ()=>{
           if(window.scrollY >= 1000)
            {
              //  console.log('stop 100')
                setOffset('addShop')
            }else{
               // console.log('not  100')
                setOffset('')
            }
          }

       },[offset])

    //   console.log(offset)

      const HandlScroll = ()=>{
         // console.log('click')

          window.scrollTo({
              top : 0,
              behavior : 'smooth'
          })
      }

    return (

        <>

            <Title />


            <span className={offset ? "stopUp addShop" : "stopUp"}   onClick={HandlScroll} >
            <i className="fas fa-chevron-up"></i>
            </span>


            <div className="Home_navBar">
                <span className="Home_navbar_List">
                   

              
                        <ScrollStory
                            story={story}
                            userInfo={userInfo}
                            lists={lists}
                            setUploadingtoStory={setUploadingtoStory}
                        />
                        <PostUser
                            allpost={allpost}
                            lists={lists}
                            userInfo={userInfo}
                            setIdLike={setIdLike}
                            like={like}
                        />


                </span>

                <span className="following_list_home">

             
                      
                       <ListFolloware lists={lists} userInfo={userInfo} />
            
                </span>
            </div>




        </>
    )
}


export default Home




/*

            <div className="Home_navBar">
                <span className="Home_navbar_List">
                    <span className="Home_navBar_Story">Sory</span>
                    <span className="Home_navBar_Post">Post</span>
                </span>

                <span className="following_list_home">

                    list following....

                </span>
            </div>

            <div className="xx">
                <div className="Home_First">


                    <span className="Home_left">
                        <ScrollStory
                            story={story}
                            userInfo={userInfo}
                            lists={lists}
                            setUploadingtoStory={setUploadingtoStory}
                        />
                        <PostUser
                            allpost={allpost}
                            lists={lists}
                            userInfo={userInfo}
                            setIdLike={setIdLike}
                            like={like}
                        />
                    </span>


                    <span className="Home_rinht">
                        <ListFolloware lists={lists} userInfo={userInfo} />
                    </span>

                </div>
            </div>
*/