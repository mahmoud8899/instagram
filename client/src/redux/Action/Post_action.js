
import {
    ADD_USER_POST_LOADING,
    ADD_USER_POST_SUCCESS,
    ADD_USER_POST_FAIL,

    
    ADD_POST_PRIVATE_SUCESS,
    ADD_POST_PRIVATE_FAIL,

  
    ADD_USER_COMMENT_SUCCESS,
    ADD_USER_COMMENT_FAIL,

  
    ADD_POST_VIWES_SUCCESS,
    ADD_POST_VIWES_FAILT,

    ADD_LIKE_USER_SUCCESSS,
    ADD_LIKE_USER_FAIL,


    ADD_DELETE_USER_SUCCESS,
    ADD_DELETE_USER_FAIL,

    ADD_LIKE_COMMENT_SUCCESS,
    ADD_LIKE_COMMENT_FAIL,


    ADD_LIKE_POST_SUCCESS,
    ADD_LIKE_POST_FAIL,

} from "./types"
import axios from "axios"



// get views like
// localhost:8000/api/post/like/user/60ba4a5971cd122070212ae0
export const vIEWlIKE_Action = (post) => async (dispatch,getState)=>{
    try{

        const {data} = await axios.get(`/api/post/like/user/${post}/`)
        dispatch({type:ADD_LIKE_POST_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: ADD_LIKE_POST_FAIL,
            payload: error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

// add like to  comment... 
// PUT / /api/post/comment/60b601e10c39032c383f473e/60b630b0d50b4429b00b3744
export const AddliketocommentUser_Action = (post,comment) => async (dispatch,getState)=>{
    try{
        const {userLogin : {userInfo}}= getState()
        const config = {
            headers: {
                Authorization :`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/post/comment/${post}/${comment}`,comment, config)
        dispatch({type:ADD_LIKE_COMMENT_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: ADD_LIKE_COMMENT_FAIL,
            payload: error.response &&
            error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}






// Add like to post
// PUT /post/like/id....
export const Add_like_action = (user)=> async (dispatch,getState)=>{
    try{

        const {userLogin : {userInfo}} = getState()
        const config = {headers:{
            Authorization : `Bearer ${userInfo.token}`
        }}
        const {data} = await axios.put(`/api/post/like/${user._id}/`,user, config)
        dispatch({type:ADD_LIKE_USER_SUCCESSS,payload: data})

    }catch(error){
        dispatch({
            type: ADD_LIKE_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


// delete post 
// DELETE api/post/delete/60b60bb60c39032c383f4740

export const DeletePost_formUserAction = (user)=> async (dispatch,getState)=>{
    try{

      //  dispatch({type:ADD_USER_COMMENT_LOADING})
      const {userLogin : {userInfo}} = getState()

      const config = {
          headers: {
              Authorization : `Bearer ${userInfo.token}`
          }
      }
        const {data} = await axios.delete(`/api/post/delete/${user._id}/`, config)
        dispatch({type: ADD_DELETE_USER_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: ADD_DELETE_USER_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

// get /api/post/
// viwe post.. 
export const ViewPost_action = ()=> async (dispatch) =>{
    try{
       

        const {data} = await axios.get(`/api/post/`)
        dispatch({type:ADD_POST_VIWES_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: ADD_POST_VIWES_FAILT,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// add comment... 
// POST ocalhost:8000/api/post/comment/60b601e10c39032c383f473e
export const AddComment_action = (user) => async (dispatch,getState)=>{
    try{
      //  dispatch({type:ADD_USER_COMMENT_LOADING})
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/post/comment/${user._id}/`, user, config)
        dispatch({type: ADD_USER_COMMENT_SUCCESS, payload: data})
    }catch(error){
        dispatch({
            type: ADD_USER_COMMENT_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// GET // POST Only User.. 
// /post/user/private/:id/
export const PostOnly_actionView = (user) => async (dispatch) => {
    try {
      
        const { data } = await axios.post(`/api/post/user/private/${user._id}/`, user)
        dispatch({ type: ADD_POST_PRIVATE_SUCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_POST_PRIVATE_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}




// create Post.... 
// api/post/create
export const PostCreate_action = (user) => async (dispatch, getState) => {
    try {
       dispatch({ type: ADD_USER_POST_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/post/create/`, user, config)
        dispatch({ type: ADD_USER_POST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_POST_FAIL,
            payload: error.response &&
                error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}