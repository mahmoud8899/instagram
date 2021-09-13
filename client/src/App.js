
import React, { Fragment, useState, createContext } from "react"

import { BrowserRouter, Route } from "react-router-dom"
import NavBar from "./Pages/NavBar/NavBar"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import EditProfile from "./Pages/Profile/EditProfile/EditProfile"
import Messager from "./Pages/Messager/Message"
import Followare from "./Pages/Home/Followare/Folloare"
import Login from "./Pages/Login/Login"
import Singup from "./Pages/Login/Singup"
import Footer from "./Pages/Footer/Footer"

export const textCount = createContext()

const App = () => {



  const [currentId, setCurrentId] = useState(null)







  return (

    <textCount.Provider value={[currentId, setCurrentId]}>
      <Fragment>
        <BrowserRouter>

          <NavBar />

          <Route path="/profile/:id/" component={Profile} exact />



          <Route path="/profile/edit/:id/" component={EditProfile} exact />


          <Route path="/" component={Home} exact />
          <Route path="/messager/:keyword?" component={Messager} exact />

          <Route path="/follow/" component={Followare} exact />

          <Route path="/login" component={Login} exact />
          <Route path="/singup" component={Singup} exact />
        
                <Footer />

        </BrowserRouter>


      </Fragment>
    </textCount.Provider>




  )
}



export default App


