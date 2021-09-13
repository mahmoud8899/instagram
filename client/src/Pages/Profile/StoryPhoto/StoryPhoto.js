import React, { useEffect, useState } from "react"
import userImge from "../../image_User/user-male.png"
import "./style.css"

const StoryPhoto = ({ storyimage, userInfo, userid }) => {





    // iMAGE.... 
    const [modelImage, setModelImage] = useState(false)
    const [imagemodel, setImagemodel] = useState(null)
    const [currentslider, setCurrentslider] = useState(1)




    // const [styleclass, setStyleclass] = useState(0)


    // console.log(styleclass)
    // const valueImage = imagemodel?.length
    //console.log('value', valueImage)

    // slider current with photo....
    useEffect(() => {

        if (imagemodel) {

            if (imagemodel.length === currentslider) return setModelImage(false)

            const revet = setInterval(() => {

                setCurrentslider(prev => prev + 1)

            }, [9000])



            return () => clearInterval(revet)

        }

    }, [imagemodel, currentslider, modelImage])











    // current Back to the real value
    useEffect(() => {
        if (!modelImage) {

            return setCurrentslider(0)
        }




        // if(valueImage) return 
    }, [modelImage, currentslider])

    //  console.log('imagemodel', )
    // console.log('[currentslider]', currentslider)

    const HandleImageAllt = (e, im) => {
        e.preventDefault()
        setImagemodel(im)
        setModelImage(true)
    }




    return (
        <>






            <span className={modelImage ? "modelImage open" : "modelImage"}>


                <div className="SliderImageCurrent">
                    <div className="loading_Iamge">

                        {imagemodel?.map((us, items) => (
                            <p id={items} key={us?._id}
                                className={items === currentslider ? "normal_style open_style" : "normal_style"}

                            >

                            </p>
                        ))}



                    </div>

                    {imagemodel &&
                        <>


                            <span className="userInfo_infromtion">
                                <img src={imagemodel[currentslider]} className="userInfo_infromtion_Iamge" alt="hello nic" />
                                <p>Mahmoud Talat</p>

                            </span>
                            <img src={imagemodel[currentslider]} className="nextIamge" alt="hello nic" />
                        </>
                    }
                </div>


                <i className="fas fa-times" onClick={() => setModelImage(false)}></i>
            </span>






            <span className="nav_men">
                <span className="first_image_slider" >
                    {storyimage?.message ? null : storyimage?.map((user) => (


                        user?.image?.map((im) => (
                            <img src={im} alt="nic helo" className="first_image_slider_class" onClick={(e) => HandleImageAllt(e, user?.image)} />
                        ))
                    ))}
                    {

                        storyimage?.message ? null : storyimage?.length === 0 ? null :
                            userid?.image ?
                                <img src={userid?.image} alt={userid?.username} className="first_image_slider_profile" />
                                :
                                <img src={userImge} alt="ince." className="first_image_slider_profile" />
                    }
                    <p className="first_image_slider_text"></p>

                </span>
            </span>



        </>
    )
}



export default StoryPhoto







/*

    useEffect(() => {






        if (modelImage) {


            if (styleclass === 32) return setStyleclass(0)

            const revet = setInterval(() => {

                setStyleclass(prev => prev + 1)

            }, [1000])



            return () => clearInterval(revet)
        }


    }, [styleclass,modelImage])


    // slider current with photo....
    useEffect(() => {

        if (imagemodel) {

            if (imagemodel.length === currentslider) return setModelImage(false)

            const revet = setInterval(() => {

                setCurrentslider(prev => prev + 1)

            }, [3000])



            return () => clearInterval(revet)

        }

    }, [imagemodel, currentslider, modelImage])



    // current Back to the real value
    useEffect(() => {
        if (!modelImage) return setCurrentslider(0)
    }, [modelImage, currentslider])
*/

