import { Fragment, useEffect, useState } from "react"
import "./style.css"
import { format } from "timeago.js"
import axios from "axios"
import userImage from "../../image_User/user-male.png"
const ScrollStory = ({ story, userInfo, setUploadingtoStory }) => {


    const [closeStoryImage, setcloseStoryImage] = useState(false)
    const [arrayIamge, setArrayIamge] = useState(null)
    const [currentLingth, setCurrentLingth] = useState(0)
    const [styleid, setStyleid] = useState(3)

    const [currentLike, setCurrentLike] = useState(1)

    const [neNext, setNeNext] = useState(0)
    const [openSliser, setOpenSliser] = useState(false)

    // console.log('styleid',styleid)

    const current = arrayIamge && arrayIamge?.image?.length

    const currentStory = story && story.length








    // Handl open slider.
    const HandleImage = (imge) => {


        setcloseStoryImage(true)
        setArrayIamge(imge)






    }



    // next Rigth....
    const HandleRigth = (id) => {


        setOpenSliser(true)

        setNeNext(prev => prev + 1)



    }


    // left next...
    const Handleleft = () => {

        if (neNext === 0) {
            return null
        } else {
            setNeNext(prev => prev - 1)
        }

    }




    //.....................................................................................> AnswerImage... 




    // create comment to Image Story .. 
    const [inputStory, setInputStory] = useState('')
    const HandelSendComment = async (e, stor, image) => {
        e.preventDefault()
        //   console.log('image', stor, image)
        try {

            const sendDate = {
                userId: userInfo._id,
                lastUser: stor?.user?._id,
                sender: userInfo._id,
                image: image,
                text: inputStory
            }


            const { data } = await axios.post(`/api/chat/check/`, sendDate)
            console.log('data', data)

            setInputStory(e.target.value = '')
        } catch (error) {

            console.log(
                error.response &&
                    error.response.data.message ?
                    error.response.data.message :
                    error.message
            )
        }






    }



    // /api/create/story/
    const [loadingImage, setLoadingImage] = useState(false)

    const addStoryImage = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setLoadingImage(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/create/story/`, formData, config)
            setUploadingtoStory(true)
            //  console.log('data',data)
            story((prev) => [prev, data])
            setLoadingImage(false)
        } catch (error) {
            console.error(error)
            setLoadingImage(false)
        }
    }


    return (
        <Fragment>


            {arrayIamge &&


                <div className={closeStoryImage ? "model___open open" : "model___open"}>
                    <div className="Closse__x" onClick={() => setcloseStoryImage(false)}>x</div>
                    <span className="instagram">instagram</span>
                    <span className="nav__bar_slider">

                        <div className="Loading">

                            {arrayIamge?.image?.map((us, item) => (

                                <p
                                    className={item === currentLingth && "Loading_full"}
                                    style={{ width: `${styleid}%` }}
                                    id={item}>


                                </p>
                            ))}



                        </div>

                        <span className="top_user_info">
                            <img src={arrayIamge?.user?.image} alt="" className="top_user_info-Image" />
                            <span className="text-username" >{arrayIamge?.user?.username}</span>
                            <span className="user-upploading-date">{format(arrayIamge?.createdAt)}</span>
                        </span>

                        <img src={arrayIamge?.image?.[currentLingth]} className="Image-slider-clipa" alt="" />


                        <span className="iconsNext">
                            <i className="fas fa-chevron-left nextleft" onClick={() => Handleleft(arrayIamge?._id)}></i>
                            <i className="fas fa-chevron-right nextrigth" onClick={() => HandleRigth(arrayIamge?._id)}></i>
                        </span>


                        <div className="comment-formUser">
                            <input
                                type="text"
                                className="input_comment-input"
                                placeholder={`Reply to ${arrayIamge?.user?.username}`}
                                onChange={(e) => setInputStory(e.target.value)}
                                name="text"
                                onKeyPress={(e) => e.key === 'Enter' ? HandelSendComment(e, arrayIamge, arrayIamge?.image?.[currentLingth]) : null}

                            />
                            <i className="far fa-paper-plane" onClick={(e) => HandelSendComment(e, arrayIamge, arrayIamge?.image?.[currentLingth])}></i>
                        </div>
                    </span>




                </div>
            }





            <span className="navbar_scroll">


               {userInfo &&
               
               <span className="navBarUploading_myStory">

               {userInfo.image ? 
               <img src={userInfo.image} className="navBarUploading_myStory_image" alt="" />
              
               :
               <img src={userImage} className="navBarUploading_myStory_image" alt="" />
               
               }
                  
                  
                  
                  <span className="navBarUploading_myStory_icons">
                      <i className="fas fa-plus"></i>
                      <input type="file" className="file_uploading" name="image" onChange={addStoryImage} />

                  </span>

              </span>

               }


                <span className="navBarUploading_allStory">

                    <div className="last_CreateStory">
                        {story?.map((usermag, usermagIndex) => (


                            <div className="navBarUploading_allStory_box" key={usermagIndex} onClick={() => HandleImage(usermag)} >
                                <img src={usermag?.user?.image} alt={usermag?.user?.username} className="navBarUploading_allStory_Image" alt="now story" />
                            </div>


                        ))}
                    </div>
                </span>


            </span>
        </Fragment >
    )
}



export default ScrollStory


/*
 // set item to image...
 useEffect(() => {
    if (current) {

        if (current === currentLingth) {



            setTimeout(() => {

                setCurrentLike(prev => prev + 1)

            }, 1000)

            return setArrayIamge(story[currentLike])



        }
        const inverst = setInterval(() => {

            setCurrentLingth(prev => prev + 1)

        }, 9000)


        return () => clearInterval(inverst)




    }

}, [current, currentLingth, setArrayIamge, currentLike, story])


// console.log('arrayIamge',arrayIamge)
//console.log('st', styleid)
// full loading... 



useEffect(() => {

    if (current) {




        if (styleid === 30) return setStyleid(3)

        const inver = setInterval(() => {
            setStyleid(prev => prev + 1 * 3)
        }, 1000)

        return () => clearInterval(inver)




    }

}, [current, styleid])


useEffect(() => {
    if (closeStoryImage) {
        setCurrentLingth(0)
        setStyleid(3)


    }



}, [setCurrentLingth, closeStoryImage, setStyleid, arrayIamge, setArrayIamge, setCurrentLike])











// slider image next and prev.... 
useEffect(() => {


    if (openSliser) {



        if (currentStory === neNext) return setNeNext(0)

        setArrayIamge(story[neNext])



    }

    if (!closeStoryImage) return setArrayIamge(null)

    //  HandleImage()

}, [
    story,
    neNext,
    closeStoryImage,
    openSliser,
    arrayIamge,
    setArrayIamge,
    currentStory
])






*/

/*
    // set item to image...
    useEffect(() => {
        if (current) {

            if (current === currentLingth) {



                setTimeout(() => {

                    setCurrentLike(prev => prev + 1)

                }, 1000)

                return setArrayIamge(story[currentLike])



            }
            const inverst = setInterval(() => {

                setCurrentLingth(prev => prev + 1)

            }, 9000)


            return () => clearInterval(inverst)




        }

    }, [current, currentLingth, setArrayIamge, currentLike, story])


    // console.log('arrayIamge',arrayIamge)
    //console.log('st', styleid)
    // full loading... 



    useEffect(() => {

        if (current) {




            if (styleid === 30) return setStyleid(3)

            const inver = setInterval(() => {
                setStyleid(prev => prev + 1 * 3)
            }, 1000)

            return () => clearInterval(inver)




        }

    }, [current, styleid])


    useEffect(() => {
        if (closeStoryImage) {
            setCurrentLingth(0)
            setStyleid(3)


        }



    }, [setCurrentLingth, closeStoryImage, setStyleid, arrayIamge, setArrayIamge, setCurrentLike])











    // slider image next and prev.... 
    useEffect(() => {


        if (openSliser) {



            if (currentStory === neNext) return setNeNext(0)

            setArrayIamge(story[neNext])



        }

        if (!closeStoryImage) return setArrayIamge(null)

        //  HandleImage()

    }, [
        story,
        neNext,
        closeStoryImage,
        openSliser,
        arrayIamge,
        setArrayIamge,
        currentStory
    ])

*/
/*




                <span className="navbar_scroll_image_create">

                    <img src={userInfo.image} alt={userInfo.username} className="navbar_scroll_image_photo_create_story" />




                    <p className="create_story">
                        <i className="fas fa-plus"></i>
                        <input type="file" className="file_uploading" name="image" onChange={addStoryImage} />

                    </p>
                </span>





                <div className="last_CreateStory">
                    {story?.map((usermag, usermagIndex) => (

                        <span className="navbar_scroll_image" key={usermagIndex} onClick={() => HandleImage(usermag)} >

                            <img src={usermag?.user?.image} alt={usermag?.user?.username} className="navbar_scroll_image_photo" />


                            <p>{usermag?.user?.username}</p>

                        </span>

                    ))}
                </div>







                {userInfo ?
                    <span className="navbar_scroll_image_create">
                        {userInfo.image ?
                            <img src={userInfo.image} alt={userInfo.username} className="navbar_scroll_image_photo_create_story" />

                            :
                            <img src={userImage} alt={userImage} className="navbar_scroll_image_photo_create_story" />

                        }
                        <p className="create_story">
                            <i className="fas fa-plus"></i>
                            <input type="file" className="file_uploading" name="image" onChange={addStoryImage} />
                            {loadingImage && <p>Loading Image</p>}
                        </p>
                    </span>

                    : null}



    // set item to image...
    useEffect(() => {
        if (current) {

            if (current === currentLingth) {



                setTimeout(() => {

                    setCurrentLike(prev => prev + 1)

                }, 1000)







                return setArrayIamge(story[currentLike])



            }
            const inverst = setInterval(() => {

                setCurrentLingth(prev => prev + 1)

            }, 9000)


            return () => clearInterval(inverst)




        }

    }, [current, currentLingth, setArrayIamge,setCurrentLike,story,])

    // console.log('arrayIamge',arrayIamge)


    useEffect(() => {
        if (closeStoryImage) {
            setCurrentLingth(0)


        }

    }, [setCurrentLingth, closeStoryImage, setStyleid, arrayIamge, setArrayIamge,setCurrentLike])












             <span className="comment_story">
                 <input type="text" className="input_Message" placeholder="Reply to" />
                 <i class="far fa-paper-plane"></i>
             </span>

    const [closeStoryImage, setcloseStoryImage] = useState(false)
    //  console.log('lists',lists)
    // console.log('story',story)



    // /api/create/story/
    const [loadingImage, setLoadingImage] = useState(false)

    const addStoryImage = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setLoadingImage(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/create/story/`, formData, config)
            story((prev)=>[prev,data])
            setLoadingImage(false)
        } catch (error) {
            console.error(error)
            setLoadingImage(false)
        }
    }


                <div className={closeStoryImage ? "model___open open" : "model___open"}>
                <div className="Closse__x" onClick={() => setcloseStoryImage(false)}>x</div>
                <span className="nav__bar_slider">
                    <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                        "rotate": 50,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1,
                        "slideShadows": true
                    }} pagination={true} className="mySwiper">
                        {story?.map((nowStory) => (
                            nowStory?.image?.map((sistImage) => (
                                <SwiperSlide>
                                    <img src={sistImage} alt={sistImage} className="nav__bar_slider_image" />

                                    <img src={nowStory?.user?.image} alt={nowStory?.user?.username} className="nav__bar_slider_image_user" />
                                    <span className="comment_story">
                                        <input type="text" className="input_Message" placeholder="Reply to" />
                                        <i class="far fa-paper-plane"></i>
                                    </span>
                                </SwiperSlide>
                            ))


                        ))}

                    </Swiper>

                </span>
            </div>


                    {userInfo ?
                    <span className="navbar_scroll_image_create">
                        <img src={userInfo.image} alt={userInfo.username} className="navbar_scroll_image_photo_create_story" />
                        <p className="create_story">
                            <i className="fas fa-plus"></i>
                            <input type="file" className="file_uploading" name="image" onChange={addStoryImage} />
                            {loadingImage && <p>Loading Image</p>}
                        </p>
                    </span>

                    : null}



*/