import { Link } from "react-router-dom"
import ImageUser from "../image_User/user-male.png"



const ListFolloware = ({ lists, userInfo }) => {


    return (
        <div className="flex_dev">

            {userInfo ?

                <Link to={`/profile/${userInfo._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <span className="info_user">
                        {userInfo.image ?
                            <img src={userInfo.image} alt="" className="info_user_image" /> :
                            <img src={ImageUser} alt="" className="info_user_image" />
                        }
                        <span className="info_user_name">{userInfo.username}</span>

                    </span>
                </Link>

                : null}




            <div className="FollowareIng">

                <span className="first_follo">
                    <p>Suggestions For You</p>
                    <Link style={{ textDecoration: 'none' }} to={`/follow/`}>
                        <p className="block">See All</p>
                    </Link>

                </span>


                <span className="follo_list__">
                    {lists?.map((list, listIndex) => (
                        <span className="follo_list___user" key={listIndex}>
                           <Link className="Link" to={`/profile/${list?._id}/`}>
                           {list?.image ?
                                <img src={list?.image} alt="" className="follo_list__image" />
                                :
                                <img src={ImageUser} alt="" className="follo_list__image" />
                            }
                           
                           </Link>
                           <p className="follo_list__name">{list?.username}</p>
                            <p className="follo_list__follow">Follow</p>
                        </span>
                    ))}
                </span>

            </div>



        </div>
    )
}



export default ListFolloware