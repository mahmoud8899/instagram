import "./Login.css"
import { Link } from "react-router-dom"
import login__ from "./login__.png"
import photo from "./photo.png"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Login_action } from "../../redux/Action/Auth_action"
import Title from "../title"

const Login = ({ history, location }) => {


    const dispatch = useDispatch()

    const [postData, setPostData] = useState({ email: '', password: '' })
    const [loadingFull, setLoadingFull] = useState(false)

    const redirect = location.search ? location.search.split('=')[1] : '/login'


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, error } = userLogin



    useEffect(() => {

        if (userInfo) {
            history.push('/')
        } else {
            history.push('/login')



        }


        // eslint-disable-next-line
    }, [history, redirect, userInfo])


    const [styleid, setStyleid] = useState(1)
   // console.log('styleid', styleid)

    useEffect(() => {

        if (loadingFull) {
            if (styleid === 101) {

                dispatch(Login_action(postData))

                setStyleid(1)

                return setLoadingFull(false)
            }
            const inver = setInterval(() => {
                setStyleid(prev => prev + 1 * 20)
            }, 1000)

            return () => clearInterval(inver)
        }

    }, [loadingFull, styleid,dispatch,postData])




    const HandelLogin = (e) => {
        e.preventDefault()

        setLoadingFull(true)

        //   dispatch(Login_action(postData))
        // console.log(postData)
        //  setPostData({ email: '', password: '' })
    }




    return (

        <>

            <Title title="Login" />



            <div className={loadingFull ? "loading open" : "loading"}>
                <span className="loading_full">
                    <p style={{ width: `${styleid}%` }} ></p>
                    
                </span>
                
            </div>






            <div className="Login__Home">


                <span className="login_photo">
                    <img src={photo} alt="nics" />
                </span>



                <span className="Login__Form">


                    <span className="login____">

                        {error ? <span className="now_eror">{error}</span> : null}

                        <p>Instagram</p>

                        <span className="_form_">

                            <input
                                type="text"
                                className="input_first_input__"
                                placeholder="Phone number, username, or email"
                                name="email"
                                required
                                onChange={e => setPostData({ ...postData, email: e.target.value })}
                                value={postData.email}
                                onKeyPress={e => e.key === 'Enter' ? HandelLogin(e) : null}

                            />
                            <input
                                type="password"
                                required
                                onChange={e => setPostData({ ...postData, password: e.target.value })}
                                value={postData.password}
                                onKeyPress={e => e.key === 'Enter' ? HandelLogin(e) : null}
                                className="input_first_input__" placeholder="Password"
                                name="password"

                            />
                            <buttom type="submit" className="butt" onClick={HandelLogin}>Login In</buttom>


                        </span>

                        <span className="_or_">
                            <p className="_first"></p>
                            <p className="_center">Or</p>
                            <p className="_last"></p>
                        </span>


                        <span className="facebook">

                            <span className="facebook____login">
                                <img src={login__} className="facebook____login_imge" alt="" />
                                <p> Log in With Facebook</p>
                            </span>

                            <span className="facebook____forgot">

                                <p> Forgot password ?</p>
                            </span>


                        </span>

                    </span>

                    <span className="ner_sigup">

                        <p>
                            Don't have an account?
                            <Link className="Link" to={`/singup`}>
                                Sign up
                            </Link>
                        </p>

                    </span>



                </span>
            </div>


        </>
    )
}


export default Login