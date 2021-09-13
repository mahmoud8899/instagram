
import { format } from "timeago.js"
import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AddComment_action } from "../../../redux/Action/Post_action"
import { useDispatch } from "react-redux";
import {textCount} from "../../../App"


const Notifications = ({ userInfo, lists }) => {

   
      const [currentId]  = useContext(textCount)

     // console.log('from',currentId)

    const [objectPost, setObjectPost] = useState(null)
   // ADD comment... 
  // const commentID = useSelector((state) => state.commentID)
   //const { success: succesScommentID } = commentID
    const dispatch = useDispatch()

    useEffect(() => {


        if (currentId) {

            const OnlyPost = async () => {
                try {
                    const { data } = await axios.get(`/api/post/onlypost/${currentId}`)
                    setObjectPost(data)
                } catch (error) {
                    return console.error(error)
                }
            }
            OnlyPost()
        }






    }, [currentId])


 

    // create comment from User... 
    const [comment, setComment] = useState('')
    const HandleComment = (e, id) => {
        e.preventDefault()


        dispatch(AddComment_action({
            _id: id,
            commentText: comment
        }))
        setComment(e.target.value = '')



    }







    return (
        <div classNmae="notification_post" style={{margin:'0rem 0rem 6rem 0rem'}}>




            <span className="model_xp notification" >

                <span className="left_image">

                    <img src={objectPost?.image} alt="so nice" className="model_image" />





                </span>
                <span className="ringth_comment">


                    <span className="ringth_comment_info">
                        <img src={objectPost?.user?.image} alt="" className="addUserInfo" />
                        <p className="ringth_comment_name_laction">
                            <p className="ringth_comment_info_text">{objectPost?.user?.uername}</p>
                            <p className="ringth_comment_info_text">{format(objectPost?.createdAt)}</p>

                        </p>

                        <span className="ringth_comment_icons">
                            <i className="fas fa-ellipsis-h"></i>
                        </span>
                    </span>




                    <span className="comment_user_LIK">


                        <span className="comment_form_user">


                            <span className="comment_form_user_info" >
                                <img src={objectPost?.user?.image} alt="hello nice" className="comment_form_user_image" />
                                <span className="post_text_name">{objectPost?.user?.uername}</span>
                                <p className="post_text_user"> #{objectPost?.text}</p>

                            </span>




                        </span>






                        {objectPost?.comment?.map((comment) => (
                            <span className="comment_form_user_xop" key={comment?._id}>
                                {lists?.map((user) => (
                                    user?._id === comment?.user ?
                                        <span className="comment_form_user_info" key={user?._id}>
                                            <img src={user?.image} alt="" className="comment_form_user_image" />
                                            <div className="comment_form_user_name">
                                                {user?.username}
                                                <p>{comment.commentText}</p>
                                            </div>
                                            <i className="far fa-heart"></i>
                                        </span>
                                        : null
                                ))}

                                <span className="like_noLike">
                                    <p className="like_noLike_like">Likes</p>
                                    <p className="like_noLike_Reply">Reply</p>
                                </span>

                            </span>
                        ))}

                    </span>



                    <span className="ner">

                        <span className="model_iconsnotification">
                            <i className="far fa-heart"></i>
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </span>



                        <div className="views">
                            <p>73 views</p>
                        </div>

                        <div className="date">
                            <p>JANUARY 10, 2020</p>
                        </div>



                        <span className="model_comment">
                            <input
                                type="text"
                                placeholder="Add a comment…"
                                className="input_commentNotification"

                                onChange={e => setComment(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' ? HandleComment(e, objectPost?._id) : null}
                                name="commentText"


                            />
                            <p className="submit_sendNotification" onClick={(e)=> HandleComment (e,objectPost?._id)}>post</p>
                        </span>

                    </span>

                </span>
            </span>




        </div>
    )




}



export default Notifications




/*

                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url="hello"
                            width='100%'
                            height='100%'
                            controls

                        />
                    </div>
*/