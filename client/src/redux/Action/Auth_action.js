

import axios from "axios"
import {

    ADD_USER_LOGIN,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_REQUIRES,

    ADD_USERID_FAIL,
    
    ADD_USERID_SUCCESS,

    
    ADD_USER_FOLLOWARE_SUCCESS,
    ADD_USER_FOLLOWARE_FAIL,


   
    ADD_USER_FOLLOWING_SUCCESS,
    ADD_USER_FOLLOWING_FAIL,

    ADD_LIST_USERS_FAIL,
    ADD_LIST_USERS_SUCCESS,

    ADD_USER_STORY_LOADING,
    ADD_USER_STORY_SUCCESS,
    ADD_USER_STORY_FAIL,

  
    ADD_FOLLOWUSER_SUCCESS,
    ADD_FOLLOWUSER_FAIL,

    ADD_STORY_VIEWS_SUCCESS,
    ADD_STORY_VIEWS_FAIL,
    
    ADD_CHANGE_PROFILE_SUCCESS,
    ADD_CHANGE_PROFILE_FAIL,

} from "./types"










//axios.post(`/api/user/change/${userInfo._id}/`
// Change porfile... 
export const ChangeProfile_action = (user) => async (dispatch,getState) => {
    try {

        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
               Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/user/change/${user._id}`, user, config)
        dispatch({ type: ADD_CHANGE_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_CHANGE_PROFILE_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message

        })
    }
}


// GET /show/story/
// VIEWS story ... 
export const StoryViews_Action = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/show/story/`,)
        dispatch({ type: ADD_STORY_VIEWS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_STORY_VIEWS_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message

        })
    }
}





// Follow 
// PUT // /api/user/followare/:id/
export const followUserAction = (user) => async (dispatch, getState) => {
    try {
      //  dispatch({ type: ADD_FOLLOWUSER_LOADING })
        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        const { data } = await axios.post(`/api/user/followare/${user._id}/`, user, config)
        dispatch({ type: ADD_FOLLOWUSER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_FOLLOWUSER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message

        })
    }
}


// GET localhost:8000/api/user/story/60b4ff19fe6a2718fcd9c62e
// Story Image..
export const StorImageShow_Action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_STORY_LOADING })
        const { data } = await axios.post(`/api/user/story/${user._id}/`, user)
        dispatch({ type: ADD_USER_STORY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_USER_STORY_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}





// user List .... 
// GET /localhost:8000/api/user/userlist/
export const ListsUser = () => async (dispatch) => {
    try {
        

        const { data } = await axios.get(`/api/user/userlist/`)
        dispatch({ type: ADD_LIST_USERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_LIST_USERS_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// user followare .. 
// GET api/user/listfollo/ID
export const UserFollowIng_Action = (id) => async (dispatch) => {
    try {
      //  dispatch({ type: ADD_USER_FOLLOWING_LOADING })
        const { data } = await axios.get(`/api/user/listfollwing/${id}`)
        dispatch({ type: ADD_USER_FOLLOWING_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_FOLLOWING_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// user followare .. 
// GET api/user/listfollo/ID
export const userFolloware = (id) => async (dispatch) => {
    try {
     
        const { data } = await axios.get(`/api/user/listfollo/${id}`)
        dispatch({ type: ADD_USER_FOLLOWARE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_FOLLOWARE_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// GET userid 
//  /api//user/:id/

export const UserId_action = (id) => async (dispatch) => {
    try {
      //  dispatch({ type: ADD_USERID_LOADING })

        const { data } = await axios.get(`/api/user/${id}`)
        dispatch({ type: ADD_USERID_SUCCESS, payload: data })
      //  console.log('user', data)
    } catch (error) {
        dispatch({
            type: ADD_USERID_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}



// sing up 
// post api/create/
export const singUp_action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOGIN })
        const { data } = await axios.post(`/api/create/`, user)
        console.log(data)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}



// logo Ut..
export const LogoUt = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: ADD_USER_REQUIRES })
}






// user login
// Post .... /api/login/
export const Login_action = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOGIN })
        const { data } = await axios.post(`/api/login/`, user)
        //console.log(data)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}