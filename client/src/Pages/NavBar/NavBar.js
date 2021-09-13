import "./NavBar.css"
import { Link } from "react-router-dom"
import React, { Fragment, useEffect, useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LogoUt } from "../../redux/Action/Auth_action"
import usermale from "../image_User/user-male.png"
import NavList from "./NavList"
import axios from "axios"
import { textCount } from "../../App"
const NavBar = ({ setIdset }) => {


    const [currentId, setCurrentId] = useContext(textCount)

    // ALL POST.. 
    const allpostID = useSelector((state) => state.allpostID)
    const { allpost } = allpostID


    // console.log('allpost',allpost)
    //console.log(keyword)


    const dispatch = useDispatch()

    // user info...
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    // users list 
    const userslistID = useSelector((state) => state.userslistID)
    const { lists } = userslistID




    const [requires, setRequires] = useState(false)
    const [sparaData, setSparaData] = useState([])
    const [userId, setUserId] = useState([])
    // console.log('sparaData',sparaData)

    const follouserID = useSelector((state) => state.follouserID)
    const { success } = follouserID

    // requires following...
    useEffect(() => {

        if (userInfo) {
            const addFollowing = async () => {
                try {
                    const { data } = await axios.get(`/api/user/listfollwing/${userInfo?._id}/`)
                    setSparaData(data.reverse())
                } catch (error) {
                    console.error(error)
                }
            }
            addFollowing()
        }

    }, [userInfo, dispatch, success])




    // check user id
    useEffect(() => {

        if (userInfo) {
            const userxpId = async () => {
                try {

                    const { data } = await axios.get(`/api/user/${userInfo._id}`)
                    setUserId(data)
                } catch (error) {
                    console.error(error)
                }
            }
            userxpId()
        }


    }, [userInfo, success])





    // navbar to Profile... 
    const [navBar, setNavBar] = useState(false)
    const HandleNvaBar = () => {
        setNavBar(true)
    }





    // check for require Follow..
    const [clickAll, setClickAll] = useState(false)
    const HanleCALI = (e) => {
        e.target.value = setClickAll(true)
        //console.log(e.target)
        //  if(clickAll === false){
        //   console.log('yes')
        //  }
    }



    // search user Frinds.. 
    const [openSearch, setOpenSearch] = useState(false)
    const [opbjectID, setOpbjectID] = useState([])
    const [searchMessage, setSearchMessage] = useState('')
    // console.log('opbject', opbjectID)




    useEffect(() => {

        if (searchMessage) {

            setOpbjectID(lists?.filter((val) => val.username.toLowerCase().includes(searchMessage.toLowerCase())))

            //  const nesResult  =  
            //if(nesResult) return (prev=>[...prev,nesResult])

        }



    }, [lists, searchMessage])





    const HandlInput = (e) => {
        e.preventDefault()
        // console.log(searchMessage)
        // setSearchMessage(e.target.value = '')


    }


    const [currentNew, setCurrentNew] = useState('')
    // close navNotifation... 
    const HandlClose = () => {
        setClickAll(false)
        setRequires(false)

    }

    return (

        <Fragment>
            {userInfo ?

                <span className="open">
                    <span className="nav">
                        <span className="home_navbar">
                            <p><Link className="Link LikeOnly" to={'/'} onClick={() => setCurrentId(null)} >My instagram</Link></p>
                        </span>


                        <span className="Search_navbar">
                            <input
                                className={openSearch ? "Search_navbar_first ringthInput" : "Search_navbar_first"}
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchMessage(e.target.value)}
                                name="search"
                                onKeyPress={(e) => e.key === 'Enter' ? HandlInput(e) : null}
                                onClick={() => setOpenSearch(true)}


                            />
                            <i className={openSearch ? "fas fa-search ringhtSearch" : "fas fa-search"}></i>

                            {openSearch ?


                                <>

                                    <p className="closcols" onClick={() => setOpenSearch(false)}>x</p>
                                    <div className="box-search">

                                        {!searchMessage ?

                                            <>

                                                <p className="search_box">Recent</p>

                                                <p className="searches">No recent searches.</p>

                                            </>

                                            :
                                            opbjectID?.map((use) => (
                                                <span className="search_list_user" key={use._id}>
                                                    <Link className="Link" to={`/profile/${use?._id}`}>
                                                        <img src={use?.image} className="search_list_user_image" alt="" onClick={() => setOpenSearch(false)} />
                                                    </Link>

                                                    <span className="list_firends_all">
                                                        <p className="list_firends_all_name">{use?.username}</p>
                                                        <p className="list_firends_all_follo">mahmoud .Followed by</p>
                                                    </span>
                                                </span>
                                            ))



                                        }









                                    </div>
                                </>
                                : null
                            }

                        </span>


                        <ul className="list">

                            <li>

                                <Link className="Link" to={`/`} onClick={() => setCurrentId(null)}>
                                    <i className="fas fa-home"></i>
                                </Link>
                            </li>

                            <li>
                                <Link className="Link" to={`/messager/`} onClick={() => setCurrentId(null)}>
                                    <i className="far fa-paper-plane"></i>
                                </Link>
                            </li>


                            <li>
                                <i className="fas fa-map-marker-alt"></i>
                            </li>


                            <li className="prevati_pox">
                                <i className={clickAll ? "fas fa-heart" : "far fa-heart"}
                                    onClick={(e) => HanleCALI(e)}  >
                                    {currentNew === 0 ? null :
                                        <span className={clickAll ? "currentNotifation open" : "currentNotifation"}>


                                            {currentNew}

                                        </span>
                                    }

                                </i>
                                <span className={clickAll ? "prevati_pox_follow open" : "prevati_pox_follow"}>
                                    <p onClick={() => HandlClose()}>x</p>

                                    <NavList
                                        sparaData={sparaData}
                                        setClickAll={setClickAll}
                                        clickAll={clickAll}
                                        userInfo={userInfo}
                                        userId={userId}
                                        allpost={allpost}
                                        setIdset={setIdset}
                                        requires={requires}
                                        setRequires={setRequires}
                                        currentNew={currentNew}
                                        setCurrentNew={setCurrentNew}


                                    />



                                </span>


                            </li>




                            <li className="profile___like">


                                {userInfo.image ?
                                    <img src={userInfo.image} alt="Profil" onClick={HandleNvaBar} className="list_image" />
                                    : <img src={usermale} alt="Profil" onClick={HandleNvaBar} className="list_image" />
                                }



                                <ul className={navBar ? "List_nav_click open" : "List_nav_click"} onClick={() => setNavBar(false)} >


                                    <li className="list_lefte">


                                        <Link className="Link" to={`/profile/${userInfo._id}`}>
                                            <span className="i___">
                                                <i className="far fa-user-circle xxx"></i>
                                                <p>proFile</p>
                                            </span>
                                        </Link>

                                    </li>


                                    <li className="list_lefte">

                                        <Link className="Link" to={`/profile/edit/${userInfo._id}/`}>
                                            <span className="i___">
                                                <i className="fas fa-cog xxx"></i>
                                                <p>Settings</p>
                                            </span>
                                        </Link>

                                    </li>


                                    <li className="LogOut" onClick={() => dispatch(LogoUt())}>
                                        <Link className="Link" to={`/login/`}>
                                            <p> Log Out</p>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                        </ul>

                    </span>
                </span>
                : null}
        </Fragment>




    )

}


export default NavBar

/*

                            <input
                            className={openSearch ? "Search_navbar_first ringthInput" : "Search_navbar_first ringthInput"}
                            type="text"
                            placeholder="Search"
                            onClick={(e)=> setSearchMessage(e.target.value)}
                            name="search"
                            onKeyPress={(e)=>e.key === 'Enter' ? HandlInput(e): null}


                            />

                            <i className={openSearch ? "fas fa-search ringhtSearch" : "fas fa-search"}></i>


                            {openSearch ?


                                <>

                                    <p className="closcols" onClick={() => setOpenSearch(false)}>x</p>
                                    <div className="box-search">

                                        <p className="search_box">Recent</p>

                                        <p className="searches">No recent searches.</p>




                                    </div>
                                </>
                                : null
                            }

*/