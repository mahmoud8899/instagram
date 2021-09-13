import "./Singup.css"
import { Link } from "react-router-dom"
import login__ from "./login__.png"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { singUp_action } from "../../redux/Action/Auth_action"

import Title from "../title"
const Singup = ({ history }) => {




    const dispatch = useDispatch()


    const [postData, setPostData] = useState({ email: '', password: '', username: '' })

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, error } = userLogin



    useEffect(() => {

        if (userInfo) {
            history.push('/')
        }

    }, [history, userInfo])



    const HandleSingUp = (e) => {
        e.preventDefault()

        dispatch(singUp_action(postData))

        console.log(postData)
        setPostData({ email: '', password: '', username: '' })
    }


    return (
        <>

            <Title title="Sing Up." />


            <div className="Login__Home">


                <span className="Login__Form">


                    <span className="login____">

                        {error ?
                            <p className="alr">{error}</p>
                            : null}




                        <p>Instagram</p>

                        <span className="Frinds_singUP">

                            <p>
                                Sign up to see photos and videos from your friends.
                            </p>

                        </span>

                        <span className="facebook____login_xp">
                            <img src={login__} className="facebook____login_imge" alt="" />
                            <span className="Facebook_loagin"> Log in With Facebook</span>
                        </span>



                        <span className="_or_">
                            <p className="_first"></p>
                            <p className="_center">Or</p>
                            <p className="_last"></p>
                        </span>


                        <span className="_form_">

                            <input
                                type="text"
                                className="input_first_input__"
                                placeholder="Phone number, username, or email"
                                onChange={e => setPostData({ ...postData, email: e.target.value })}
                                onKeyPress={e => e.key === 'Enter' ? HandleSingUp(e) : null}
                                value={postData.email}
                                name="email"
                                required

                            />

                            <input
                                type="text"
                                className="input_first_input__"
                                placeholder="Username"
                                onChange={e => setPostData({ ...postData, username: e.target.value })}
                                onKeyPress={e => e.key === 'Enter' ? HandleSingUp(e) : null}
                                value={postData.username}
                                name="username"
                                required
                            />
                            <input
                                type="password"
                                className="input_first_input__"
                                placeholder="Password"
                                onChange={e => setPostData({ ...postData, password: e.target.value })}
                                onKeyPress={e => e.key === 'Enter' ? HandleSingUp(e) : null}
                                value={postData.password}
                                name="password"
                                required
                            />
                            <buttom type="submit" className="butt" onClick={HandleSingUp}>Next</buttom>


                        </span>


                        <pan className="Terms">
                            <p>
                                By signing up, you agree to our Terms . Learn how we collect,
                                use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy .
                            </p>
                        </pan>




                    </span>

                    <span className="ner_sigup">

                        <p>
                            Have an account?
                            <Link className="Link" to={`/login`}>
                                Log in
                            </Link>
                        </p>

                    </span>



                </span>
            </div>


        </>


    )
}


export default Singup