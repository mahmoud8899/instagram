import React, { useState, Fragment, useEffect } from "react"
import { format } from "timeago.js"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    AddComment_action,
    Add_like_action,
    DeletePost_formUserAction,
    AddliketocommentUser_Action
} from "../../../redux/Action/Post_action"
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
import ReactPlayer from 'react-player'
import  userImage from "../../image_User/user-male.png"
import { Link } from "react-router-dom"

const PostUser = ({
    allpost,
    lists,
    userInfo,
    setIdLike,
    like
}) => {


    const dispatch = useDispatch()


    // add like to post from user.. 
    const likeID = useSelector((state) => state.likeID)
    const { success: successlikeID } = likeID

    // DELETE POST.. 
    const deletepostID = useSelector((state) => state.deletepostID)
    const { success: successdeletepostID } = deletepostID


    // comment.. 
    const likecommentID = useSelector((state) => state.likecommentID)
    const { success: succesSlikecommentID } = likecommentID

    useEffect(() => {
        // eslint-disable-next-line
    }, [
        userInfo,
        successlikeID,
        successdeletepostID,
        succesSlikecommentID,


    ])


    const [inputMessagee, setInputMessagee] = useState('')
    const HandlComment = (e, id) => {
        e.preventDefault()
        //  console.log(inputMessagee,id)

        dispatch(AddComment_action({
            _id: id,
            commentText: inputMessagee
        }))

        setInputMessagee(e.target.value = '')
        setInputMessagee('')

    }



    const [clickHandle, setClickHandle] = useState(false)
    const [sparaId, setSparaId] = useState(null)
    const HandlCL = (e, id) => {
        e.preventDefault()
        setClickHandle(true)
        setSparaId(id)

    }



    // remove post..
    const HandlRemove = (e) => {

        e.preventDefault()

        if (sparaId) {
            console.log('id', sparaId)
            dispatch(DeletePost_formUserAction({ _id: sparaId }))
            console.log('Remove..')
        }


    }


    // like
    const [model3, setModel3] = useState(false)

    const HandleFolling = (e, id) => {
        e.preventDefault()
        setIdLike(id)
        setModel3(true)
    }



    const [viewImage, setViewImage] = useState(false)
    const [imageNew, setImageNew] = useState(null)
    const HandleImage = (src) => {
        setViewImage(true)
        setImageNew(src)
    }


    return (
        <Fragment>


            <div className={viewImage ? "ModelImageViews open" : "ModelImageViews"}>
                <div className="colos_xx" onClick={() => setViewImage(false)}>X</div>
                <img src={imageNew} alt={imageNew} className="ImageViews" />
            </div>


            <span className="post_comment_x">

                {allpost?.map((post, postIndex) => (
                    <span className="all_Post" key={postIndex}>

                        <span className="post_image_info">
                            <Link className="Link" to={`/profile/${post?.user?._id}`}>
                                {post?.user?.image ? 
                                <img src={post?.user?.image} alt="nics pos" className="post_image_info_imag" />
                                : 
                                <img src={userImage} alt="nics pos" className="post_image_info_imag" />
                            
                             }
                                
                            </Link>
                            <p className="post_image_info_name" >{post?.user?.username}</p>

                            {userInfo ?
                                <span className="iconsInfo">
                                    {post?.user._id === userInfo._id ? <i className="fas fa-ellipsis-h" onClick={(e) => HandlCL(e, post?._id)}></i> : null}

                                </span>
                                : null}

                            <span className={clickHandle ? "model_edit_remove open" : "model_edit_remove"}>
                                <span className="model_edit_remove_new" onClick={() => setClickHandle(false)}>
                                    <i className="fas fa-times" onClick={() => setClickHandle(false)}></i>
                                    <p className="model_edit_remove__remove"
                                        onClick={(e) => HandlRemove(e)}

                                    > Remove</p>
                                    <p className="model_edit_remove__edit" >Edit</p>
                                </span>

                            </span>

                        </span>


                        <span className="post_image">



                            {post?.image &&
                                <LazyLoadImage
                                    alt={post?.image}
                                    src={post?.image}
                                    className="post_image"
                                    onClick={() => HandleImage(post?.image)}
                                />  
                        }

                            {post?.video &&
                                <ReactPlayer url={post?.video}
                                    controls
                                />
                            }
                        </span>


                        <span className="icons_like_all">

                            {userInfo ?
                                <>

                                    <i className={post?.like?.includes(userInfo._id) ? "fas fa-heart color_heart" : "far fa-heart"} onClick={() => dispatch(Add_like_action({ _id: post?._id }))}></i>
                                    <i className="far fa-comment">
                                        <span>
                                            {post?.comment?.length === 0 ? null : post?.comment?.length}
                                        </span>
                                    </i>
                                    <i className="far fa-paper-plane"></i>
                                </>
                                : null}


                        </span>


                        <div className={model3 ? "viws_like_user open" : "viws_like_user"}>


                            <span className="followare_navbar">

                                <span className="followare_top">

                                    <span className="like_____">Likes {post?.like?.length}</span>

                                    <i className="fas fa-times" onClick={() => setModel3(false)}></i>
                                </span>


                                <span className="_user_follow">


                                    {like?.map((like, likeIndex) => (
                                        <span className="followare_User" key={likeIndex}>
                                            
                                            <Link to={`/profile/${like?._id}`}>
                                                {like?.image ? 
                                                 <img src={like?.image} alt="helo nico" className="_user_follow_image" />
                                            
                                                  :
                                                  <img src={userImage} alt="helo nico" className="_user_follow_image" />
                                                  }
                                               
                                            </Link>
                                            <p className="username_foll">{like?.username}</p>
                                        </span>

                                    ))}




                                </span>


                            </span>



                        </div>


                        <span className="viewLike" onClick={(e) => HandleFolling(e, post?._id)}>
                            <p className="view_lis">
                                <span>
                                    {post?.like?.length === 0 ? null : post?.like?.length} Like

                                </span>
                            </p>
                        </span>

                        <span className="post_comment">

                            <span className="post_commentall">

                                <p className="post_comment_comment">#{post?.text}</p>

                            </span>

                            {post?.comment?.map((comment, commentIndex) => (

                                lists?.map((user) => (

                                    user?._id === comment?.user ?
                                        <span className="post_commentall" key={commentIndex}>
                                            <p className="post_comment_name">{user?.username}</p>
                                            <p className="post_comment_comment_x"> {comment.commentText}</p>
                                            {userInfo ?
                                                <i className={comment?.commentLike?.includes(userInfo._id) ? "fas fa-heart color_heart" : "far fa-heart"}

                                                    onClick={() => dispatch(AddliketocommentUser_Action(post?._id, comment._id))}
                                                ></i>
                                                : null}

                                        </span>
                                        : null
                                ))


                            ))}

                            <span className="time__">
                                {format(post?.createdAt)}
                            </span>
                        </span>



                        <span className="comment_write">

                            <input
                                placeholder="Add a Comment..."
                                className="input_comment_xxx"
                                onChange={e => setInputMessagee(e.target.value)}

                                name="commentText"
                                onKeyPress={e => e.key === 'Enter' ? HandlComment(e, post?._id) : null}

                            />
                            <p className="comment_write_post" onClick={HandlComment} >Post</p>

                        </span>






                    </span>


                ))}





            </span>



        </Fragment>
    )
}


export default PostUser


/*
  <img src={post?.image} alt={post?.image} className="post_image" />
*/