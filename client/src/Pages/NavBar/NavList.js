import { Fragment, useEffect, useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { followUserAction } from "../../redux/Action/Auth_action"
import ReactPlayer from "react-player"
import { LazyLoadImage } from 'react-lazy-load-image-component';


import { textCount } from "../../App"


const NavList = ({ sparaData, userId, allpost, setClickAll, requires, setRequires, currentNew, setCurrentNew, clickAll }) => {


    const [currentId, setCurrentId]  = useContext(textCount)


    const dispatch = useDispatch()


    const [followare, setFolloware] = useState([])


    useEffect(() => {

        setFolloware(sparaData.slice(0, 1))



    }, [sparaData])


    const HandlChange = () => {
        setRequires(true)

    }





    useEffect(() => {



        if (clickAll) {
            setCurrentNew('')
        } else {
            setCurrentNew(allpost?.length)
        }


    }, [allpost, currentNew, clickAll,setCurrentNew])



    return (


        <Fragment>
            
      



            {followare?.map((foll) => (
                <span className={requires ? "now_dis" : "navbar_list_now"} key={foll._id} onClick={() => HandlChange(true)}>

                    <div className="center_dev">
                        <Link to={`/profile/${foll?._id}`}>
                            <img src={foll?.image} alt={foll?.username} className="listImagreee" />
                        </Link>

                        <span className="requires_follow">
                            <p className="requires_follow_x">Follow requires</p>
                            <p className="username_foll_text">{foll?.username}</p>
                        </span>

                        <span className="icons_nextt">
                            <p className="all_next"></p>
                            <i className="fas fa-chevron-right next_iconss"></i>

                        </span>
                    </div>
                </span>
            ))}


            {requires &&


                sparaData?.map((folllo, userIndex) => (
                    <span className="navbar_list" key={userIndex}>
                        <Link to={`/profile/${folllo?._id}`}>
                            <img src={folllo?.image} alt={folllo?.username} className="listImagreee" />
                        </Link>
                        <p className="addpadding">{folllo?.username}</p>

                        {userId?.followare?.includes(folllo?._id) ?


                            <span className="first_class_config">
                                <Link className="Link" to={`/messager/${folllo?._id}`}>
                                    <span className="confirm__delete">Message</span>
                                </Link>


                            </span>

                            :
                            <span className="confirm__follo">
                                <span className="config_" onClick={() => dispatch(followUserAction({ _id: folllo?._id }))} >Confirm</span>
                                <span className="confirm__delete_icons">Delete</span>
                            </span>

                        }

                    </span>
                ))



            }






            <div className="notifition__post__post">
                {allpost?.map((post) => (
                    <div className="post_notifition" key={post?._id}>
                        <Link className="Link" to={`/profile/${post?.user?._id}`} onClick={() => setClickAll(false)}>
                            <div className="postIamge" onClick={() => setCurrentId(post?._id)}>

                                <img src={post?.user?.image} alt="" className="postIamgeNotifition" />

                                <span className="name_post_username">{post?.user?.username}

                                    {
                                        post?.image && <span> Create a picture</span>
                                    }
                                    {
                                        post?.video && <span> Create a new video</span>
                                    }



                                </span>

                            </div>
                        </Link>
                        <span className="post_Iamge_post">

                            {post?.image && <LazyLoadImage alt={post?.image}
                                src={post?.image} className="post_Iamge_post__Image" />
                            }


                            {post?.video && <ReactPlayer url={post?.video}
                                alt="hello post"
                                width="40px"
                                height="40px"

                            />}
                        </span>
                    </div>

                ))}


            </div>









        </Fragment>


    )
}



export default NavList




/*
            {sparaData?.map((folllo, userIndex) => (
                <span className="navbar_list" key={userIndex}>
                    <Link to={`/profile/${folllo?._id}`}>
                        <img src={folllo?.image} alt={folllo?.username} className="listImagreee" />
                    </Link>
                    <p className="username_foll_text">{folllo?.username}</p>

                    {userId?.followare?.includes(folllo?._id) ?


                        <span className="confirm__follo">
                            <Link className="Link" to={`/messager/${folllo?._id}`}>
                                <span className="confirm__delete">Message</span>
                            </Link>


                        </span>

                        :
                        <span className="confirm__follo">
                            <span className="confirm__" onClick={() => dispatch(followUserAction({ _id: folllo?._id }))} >Confirm</span>
                            <span className="confirm__delete">Delete</span>
                        </span>

                    }

                </span>
            ))}
*/