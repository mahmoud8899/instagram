import React, { useState, useContext } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/swiper.min.css';
import "./style.css"
import { format } from "timeago.js"
import { AddComment_action, Add_like_action, AddliketocommentUser_Action } from "../../../redux/Action/Post_action"
import { useDispatch } from "react-redux";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy'
import { textCount } from "../../../App"



const Post = ({ userid, userInfo, post, lists }) => {


    const [currentId, setCurrentId] = useContext(textCount)




    const dispatch = useDispatch()




    // create comment from User... 
    const [comment, setComment] = useState('')
    const HandleComment = (e, id) => {
        e.preventDefault();

        dispatch(AddComment_action({
            _id: id,
            commentText: comment
        }))
        // console.log(comment, id)
        //  InputComment.current.value = ''
        setComment(e.target.value = '')

    }



    //console.log('sliderId', sliderId)
    const [model, setModel] = useState(false)
    const HandleOpenPhoto = (id) => {
        setModel(true)
        setCurrentId(null)

    }



    // Handle add like to post ... 
    const HandlLike = (e, id) => {

        e.preventDefault()
        //   console.log('clicke add liek to post.... !', id)

        dispatch(Add_like_action({ _id: id }))
    }



    // Handle add LIke to comment..... 
    const HandleLiketoUser = (e, comment, post) => {
        e.preventDefault()
        //  console.log('add like to comment.. ', 'id comment:' + comment, 'id post', post)
        dispatch(AddliketocommentUser_Action(post,
            comment))


    }



    return (

        <>{
            post?.message ? <h1 className="notFollo">{post?.message}</h1> : 


<>
            <span className={model ? "model open" : "model"}>

                <p className="model_close">
                    <i className="fas fa-times" onClick={() => setModel(false)}></i>
                </p>

                <Swiper navigation={true} className="mySwiper">

                    {post?.map((px) => (
                        <SwiperSlide>



                            <span className="model_xp" key={px?._id}>

                                <span className="left_image">
                                    {
                                        px?.image &&
                                        <img src={px?.image} alt="so nice" className="model_image" />
                                    }

                                    {
                                        px?.video &&
                                        <div className='player-wrapper'>
                                            <ReactPlayer
                                                className='react-player'
                                                url={px?.video}
                                                width='100%'
                                                height='100%'
                                                controls

                                            />
                                        </div>
                                    }
                                </span>
                                <span className="ringth_comment">


                                    <span className="ringth_comment_info">
                                        <img src={userid?.image} alt={userid?.username} className="Image_info_user" />
                                        <p className="ringth_comment_name_laction">
                                            <p className="ringth_comment_info_text">{userid?.username}</p>
                                            <p className="ringth_comment_info_text">{format(px?.createdAt)}</p>

                                        </p>

                                        <span className="ringth_comment_icons">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </span>
                                    </span>




                                    <span className="comment_user_LIK">


                                        <span className="comment_form_user">

                                            <span className="comment_form_user_info">
                                                <img src={userid?.image} alt="" className="comment_form_user_image" />
                                                <span className="post_text_name">{userid?.username}</span>
                                                <p className="post_text_user"> #{px?.text}</p>

                                            </span>


                                        </span>





                                        {px?.comment?.map((comment) => (
                                            <span className="comment_form_user_xop" key={comment?._id}>
                                                {lists?.map((user) => (
                                                    user?._id === comment?.user ?
                                                        <span className="comment_form_user_info" key={user?._id}>
                                                            <img src={user?.image} alt="" className="comment_form_user_image" />
                                                            <div className="comment_form_user_name">
                                                                {user?.username}
                                                                <p>{comment.commentText}</p>
                                                            </div>
                                                            {userInfo &&
                                                                <i className={comment?.commentLike?.includes(userInfo._id) ? "fas fa-heart fa-red" : "far fa-heart"}
                                                                    onClick={(e) => HandleLiketoUser(e, comment?._id, px?._id)}
                                                                ></i>
                                                            }

                                                        </span>
                                                        : null
                                                ))}

                                                <span className="like_noLike">
                                                    <p className="like_noLike_like" onClick={(e) => HandleLiketoUser(e, comment?._id, px?._id)}  >Likes</p>
                                                    <p className="like_noLike_Reply">Reply</p>
                                                </span>

                                            </span>
                                        ))}

                                    </span>



                                    <span className="ner">

                                        <span className="model_icons">
                                            {
                                                userInfo &&
                                                <i className={px?.like?.includes(userInfo._id) ? "fas fa-heart fa-red" : "far fa-heart"} onClick={(e) => HandlLike(e, px?._id)}></i>
                                            }
                                            <i className="far fa-comment">{px?.comment?.length}</i>
                                            <i className="far fa-paper-plane"></i>
                                        </span>



                                        <div className="views">
                                            <p>73 views</p>
                                        </div>

                                        <div className="date">
                                            <p>{format(px?.createdAt)}</p>
                                        </div>



                                        <span className="model_comment">
                                            <input
                                                type="text"
                                                placeholder="Add a comment…"
                                                className="input_comment"

                                                onChange={e => setComment(e.target.value)}
                                                onKeyPress={e => e.key === 'Enter' ? HandleComment(e, px?._id) : null}
                                                name="commentText"


                                            />
                                            <p className="submit_send" onClick={HandleComment}>post</p>
                                        </span>

                                    </span>

                                </span>
                            </span>



                        </SwiperSlide>
                    ))}


                </Swiper>

            </span>



            <span className="nav_list" onScroll>


                <ul className="last_list">
                    <li>Post</li>
                    <li>Tv</li>
                    <li>Image</li>
                </ul>




                <span className="image_user_video">


                    {post?.map((pox) => (

                        <span className="image_user_image" key={pox?._id}>


                            {pox?.image &&
                                <LazyLoadImage
                                    effect="blur"
                                    src={pox?.image}
                                    alt={pox?.image}
                                    key={pox?._id}
                                    width="100%"
                                    height="100%"
                                    onClick={() => HandleOpenPhoto(pox?._id)}

                                />
                            }




                            {
                                pox?.video &&
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        className='react-player'
                                        url={pox?.video}
                                        width='100%'
                                        height='100%'
                                        controls
                                        onClick={() => HandleOpenPhoto(pox?._id)}

                                    />
                                </div>



                            }







                            <span className="image_user_image_icons">
                                <i className="fas fa-heart"><span>{pox?.like?.length}</span></i>
                                <i className="fas fa-comment"> <span>{pox?.comment?.length}</span></i>
                            </span>
                        </span>

                    ))}
                </span>

            </span>
        </>




        }</>
    )
}



export default Post

