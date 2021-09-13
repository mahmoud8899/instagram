
import { useEffect, useState } from "react"
import { ChangeProfile_action } from "../../../../redux/Action/Auth_action"
import { useDispatch} from "react-redux"
const Edit = ({ userid }) => {

 
    const dispatch = useDispatch()
   
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState('')

    //  console.log('userInfo',userInfo)

    useEffect(() => {
        if (userid) {
            setUsername(userid?.username)
            setWebsite(userid?.Website)
            setBio(userid?.bio)
            setEmail(userid?.email)
            setPhone(userid?.Phone)
        }
    }, [userid,])


    const HandlepRorfil = (e) => {
        e.preventDefault()

        dispatch(ChangeProfile_action({username,_id: userid?._id,email,Website: website,bio, phone }))
         //
       // console.log({username,_id: userid?._id,email, website,bio, phone })
        

    }


    return (
        <>

            <span className="profile_Edit_Rinht_Info">


                <span className="profile_Edit_Rinht_Info_s">
                    <img src={userid?.image} alt="" className="profile_Edit_Rinht_Image" />
                    <p className="profile_Edit_Rinht_Info_name" >{userid?.username}</p>
                </span>

            </span>

            <ul className="List_Edit">
                <li>
                    <span className="first_input">
                        <p className="Name_input">Name:</p>
                        <input type="text" placeholder="Name"
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' ? HandlepRorfil(e) : null}
                            value={username}
                            name="username"
                        />
                    </span>
                    <p className="last_andra">
                        <p>
                            Help people discover your account by
                            using the name you're known by: either your full name, nickname, or business name.
                            You can only change your name twice within 14 days.
                               </p>
                    </p>

                </li>

                <li>
                    <span className="first_input">
                        <p className="Name_input">Website :</p>
                        <input type="text" placeholder="Website"
                            onChange={(e) => setWebsite(e.target.value)}
                            name="Website"
                            onKeyPress={e => e.key === 'Enter' ? HandlepRorfil(e) : null}
                            value={website}
                        />
                    </span>
                </li>



                <li>
                    <span className="first_input">
                        <p className="Name_input">Bio :</p>
                        <textarea type="text" placeholder="Bio"
                            onChange={(e) => setBio(e.target.value)}
                            name="bio"
                            onKeyPress={e => e.key === 'Enter' ? HandlepRorfil(e) : null}
                            value={bio}
                        />
                    </span>
                    <p className="last_andra">
                        <p>
                            Personal Information
                               </p>
                        <p>
                            Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                               </p>
                    </p>

                </li>



                <li>
                    <span className="first_input">
                        <p className="Name_input">Email :</p>
                        <input type="email" placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            onKeyPress={e => e.key === 'Enter' ? HandlepRorfil(e) : null}
                            value={email}
                        />
                    </span>

                </li>

                <li>
                    <span className="first_input">
                        <p className="Name_input">Phone Number</p>
                        <input type="number" placeholder="Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                            name="Phone"
                            onKeyPress={e => e.key === 'Enter' ? HandlepRorfil(e) : null}
                            value={phone}
                        />
                    </span>

                </li>






            </ul>


            <span className="submit_button">
                <button type="submit" onClick={HandlepRorfil}>Submit</button>
            </span>

        </>
    )
}


export default Edit



/*



*/