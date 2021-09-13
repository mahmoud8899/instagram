import React, { useState, useEffect } from "react"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import userImage from "../../image_User/user-male.png"
import { followUserAction } from "../../../redux/Action/Auth_action"
import { PostCreate_action } from "../../../redux/Action/Post_action"
import axios from "axios"
import "./ProfileInfo.css"


const ProfileInfo = ({ userid, userInfo, post, follow, setReloadUser }) => {



    const dispatch = useDispatch()




    useEffect(() => {

        Handlxxx()
    }, [])



    // followare.. 
    const followingID = useSelector((state) => state.followingID)
    const { following } = followingID
    // console.log('following', following)

    const [model2, setModel2] = useState(false)
    const HandleFolloware = () => {

        setModel2(true)
    }



    const [model3, setModel3] = useState(false)
    const HandleFolling = () => {

        setModel3(true)
        //console.log('click')
    }



    // block User .
    const [blockClick, setBlockClick] = useState(false)
    const HandleBlockUser = () => {
        setBlockClick(true)
    }


    // unFollow... 
    const [barimageUnfollo, setBarimageUnfollo] = useState(false)
    const HandleUnFollow = () => {

        setBarimageUnfollo(true)

    }


    // create Post... 
    // Loading...
    const [createPost, setCreatePost] = useState({ text: '', image: '', video: '' })
    const [model4, setModel4] = useState(false)




    // create post .....
    const HandlecreatePost = async (e) => {
        e.preventDefault()



        dispatch(PostCreate_action(createPost))
        setCreatePost({ text: '', image: '' })

    }



    // uploading Image....
    const [loadingImage, setLoadingImage] = useState(false)
    const HandleIamge = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setLoadingImage(true)
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',

                }
            }
            const { data } = await axios.post(`/api/uploading/`, formData, config)
            setLoadingImage(false)
            if (data.endsWith('png') || data.endsWith('jpg')) {
                setCreatePost({ image: data })
            } else {
                setCreatePost({ video: data })
            }
            // setCreatePost({ image: data })
            //console.log('data:', data)
            setLoadingImage(false)

        } catch (error) {
            console.error(error)
            setLoadingImage(false)
        }

    }







    // follow and unfollow
    const HandlFolloareUn = (e, id) => {
        e.preventDefault();

        dispatch(followUserAction({ _id: id }))

    }





    // uploading image to user profile... 
    // url /// /user/uploadingimage/:id/
    const [setuploadingimage, setSetuploadingimage] = useState(false)
    const HandleUpding = async (e) => {

        e.preventDefault()

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setSetuploadingimage(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/user/uploadingimage/${userInfo._id}`, formData, config)
            if (data) {
                setReloadUser(true)
                setSetuploadingimage(false)

            }


        } catch (error) {
            console.error(error)
            setSetuploadingimage(false)
        }



    }





    const Handlxxx = () => {


        if (userInfo && userInfo._id === userid?._id) {

            return <span className="Uploadin_profile_Photo">
                <input
                    type="file"
                    className="uploading_profile"
                    alt="uploading"
                    name="image"
                    onChange={HandleUpding}
                />
                <i className="fas fa-camera-retro"></i>
                {setuploadingimage && <span>Uploadin image </span>}
            </span>

        }










    }



    return (
        <>


            <span className={model2 ? "scroll_follow open" : "scroll_follow"}>


                <span className="followare_navbar">

                    <span className="followare_top">
                        <p className="followare_top_p" > <p className="blue">{follow?.length}</p> Followers</p>
                        <i className="fas fa-times" onClick={() => setModel2(false)}></i>
                    </span>


                    <span className="_user_follow" >


                        {follow?.map((foll, follIndex) => (

                            <span className="followare_User" key={follIndex}>
                                <Link className="Link" to={`/profile/${foll?._id}`} onClick={() => setModel2(false)}>
                                    {foll?.image ?
                                        <img src={foll?.image} alt="nic bor" className="_user_follow_image" />
                                        :
                                        <img src={userImage} alt="nic bor" className="_user_follow_image" />
                                    }
                                </Link>
                                <p className="username_foll">{foll?.username}</p>

                                <span className="_user_follow_remove_follow">
                                    <p className="_user_follow_no" onClick={(e) => HandlFolloareUn(e, foll?._id)} >
                                        unFollow
                                    </p>
                                </span>


                            </span>
                        ))}




                    </span>


                </span>

            </span>































            <span className={model3 ? "scroll_follow open" : "scroll_follow"}>


                <span className="followare_navbar">

                    <span className="followare_top">
                        <p className="followare_top_p" > <p className="blue">{following?.length}</p> Following</p>
                        <i className="fas fa-times" onClick={() => setModel3(false)}></i>
                    </span>


                    <span className="_user_follow">


                        {following?.map((following, followingIndex) => (
                            <span className="followare_User" key={followingIndex}>
                                <Link to={`/profile/${following?._id}`}>
                                    {following?.image ?
                                        <img src={following?.image} alt="" className="_user_follow_image" /> :
                                        <img src={userImage} alt="" className="_user_follow_image" />
                                    }
                                </Link>

                                <p className="username_foll">{following?.username}</p>
                                <span className="_user_follow_remove_follow">


                                    <p className="_user_follow_no" onClick={() => dispatch(followUserAction({ _id: following?._id }))} >

                                        {

                                            userid?.followare?.includes(following?._id) ? <>Unfollow</> : <>Follow</>



                                        }

                                    </p>




                                </span>

                            </span>
                        ))}

                    </span>


                </span>

            </span>




































            <div className={model4 ? "model_create_post open" : "model_create_post"}>


                <div className="_model_create_post_box">
                    <i className="fas fa-times closss" onClick={() => setModel4(false)}></i>

                    <p className="first_create_post"> Create Post..</p>
                    <span className="x__dispa_1">
                        <span className="opc">
                            <i className="far fa-file-image"></i>
                            <input
                                type="file"
                                className="uploading_file"
                                onChange={HandleIamge}
                                name="image"
                            />


                        </span>
                        <input
                            type="text"
                            className="model_create_post___input"
                            placeholder="Write a Caption"
                            onChange={e => setCreatePost({ ...createPost, text: e.target.value })}
                            name="text"
                            value={createPost.text}
                            onKeyPress={(e) => e.key === 'Enter' ? HandlecreatePost(e) : null}


                        />
                    </span>

                    <span className="x__dispa_2">
                        {loadingImage && <span>Loading Image.</span>}
                        {createPost.image ?
                            <div className="noe">
                                <img src={createPost.image} alt="new nice" className="uploading_image" />
                                <i className="fas fa-times closss" onClick={() => setCreatePost({ image: '' })}></i>
                            </div>
                            : null
                        }

                    </span>

                </div>



            </div>





            <div className={blockClick ? "block_user open" : "block_user"}>

                <span className="block_box">
                    <h1 className="block__">Block this User</h1>
                    <h1 className="cancel__" onClick={() => setBlockClick(false)}>cancel</h1>
                </span>
            </div>



            <div className={barimageUnfollo ? "unfollow_user open" : "unfollow_user"}>
                <span className="unfollow_user_box">
                    <img src={userid?.image} alt="user hel" className="unfollow_user_box_image" />
                    <p className="now_text">
                        If you change your mind,
                        you'll have to request to follow
                        <span> @{userid?.username}</span> .
                    </p>
                    <span className="unfollo___cancel" onClick={() => setBarimageUnfollo(false)}>
                        <p className="unfollo___cancel_unfollo" onClick={() => dispatch(followUserAction({ _id: userid?._id }))}>Unfollow</p>
                        <p className="unfollo___cancel_cancel" onClick={() => setBarimageUnfollo(false)}>Cancel</p>
                    </span>
                </span>
            </div>



            <span className="nav_profile">

                <span className="profile_image">

                    {userid?.image ?
                        <img src={userid?.image} className="nav_profile_image" alt={userid?.username} />
                        : <img src={userImage} className="nav_profile_image" alt="iamge" />
                    }


                    {Handlxxx()}

                </span>



                <span className="nav_profile_rigth">


                    <span className="nav_profile_rigth_edit">
                        <p className="nav_profile_rigth_name">{userid?.username}</p>
                        {userInfo ?

                            userInfo._id === userid?._id ?

                                <>
                                    <p className="edit_profil"><Link className="Link" to={`/profile/edit/${userid?._id}`} >Edit Profile</Link></p>
                                    <i className="fas fa-cog"></i>
                                </>
                                :
                                userid?.followings?.includes(userInfo._id) ?
                                    <div className="Message___i">
                                        <Link className="Link" to={`/messager/${userid?._id}`}>
                                            <p className="Message__">Message</p>
                                        </Link>

                                        <span className="olika" onClick={HandleUnFollow}>
                                            <i className="fas fa-user olika2"></i>
                                            <i className="fas fa-check olik3"></i>

                                        </span>

                                        <i className="fas fa-ellipsis-h" onClick={HandleBlockUser}></i>
                                    </div>

                                    :
                                    <Fragment>
                                        <p className="FollowProfile" onClick={() => dispatch(followUserAction({ _id: userid?._id }))} >follow</p>
                                        <i className="fas fa-ellipsis-h" onClick={HandleBlockUser}></i>
                                    </Fragment>


                            : null
                        }

                    </span>


                    <span className="nav_profile_rigth_followare">

                        <p className="nav_profile_rigth_followare_post">{post?.length} post</p>
                        <p className="nav_profile_rigth_followare_Followers" onClick={HandleFolloware}>{follow?.length} Followers</p>
                        <p className="nav_profile_rigth_followare_Following" onClick={HandleFolling} >{userid?.followings?.length} Following</p>

                    </span>



                    <span className="nav_profile_rigth_desription">
                        <p className="nav_profile_rigth_name_desription">#{userid?.username}</p>
                        <p className="nav_profile_rigth_desription_all">{userid?.bio}</p>
                        <p className="nav_profile_rigth_desription_all">#{userid?.Website}</p>
                    </span>


                    {userInfo ?


                        userInfo._id === userid?._id ?

                            <>

                                <span className="create_post" onClick={() => setModel4(true)}>
                                    <span className="create_post_post">
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </span>
                            </>

                            : null

                        : null
                    }

                </span>





            </span>




        </>
    )
}



export default ProfileInfo



