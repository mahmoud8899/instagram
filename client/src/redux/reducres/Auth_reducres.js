import {

    ADD_USER_LOGIN,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_REQUIRES,


    ADD_USERID_SUCCESS,
   
    ADD_USERID_FAIL,


    ADD_USER_FOLLOWARE_SUCCESS,
    ADD_USER_FOLLOWARE_FAIL,


   
    ADD_USER_FOLLOWING_SUCCESS,
    ADD_USER_FOLLOWING_FAIL,


    ADD_LIST_USERS_FAIL,
    ADD_LIST_USERS_LOADING,
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

} from "../Action/types"


// profile change
export const ChangProdileReducres = (state = {  }, action) => {
    switch (action.type) {
        case ADD_CHANGE_PROFILE_SUCCESS: return {success: action.payload }
        case ADD_CHANGE_PROFILE_FAIL: return { error: action.payload }
        default: return state
    }
}


// put user follow to user..
export const StoryViewsReducres = (state = { story: [] }, action) => {
    switch (action.type) {
        case ADD_STORY_VIEWS_SUCCESS: return {story: action.payload }
        case ADD_STORY_VIEWS_FAIL: return { error: action.payload }
        default: return state
    }
}


// put user follow to user..
export const FollowUserReducres = (state = {}, action) => {
    switch (action.type) {

      //  case ADD_FOLLOWUSER_LOADING: return { loading: true }
        case ADD_FOLLOWUSER_SUCCESS: return { success: action.payload }
        case ADD_FOLLOWUSER_FAIL: return { error: action.payload }
        default: return state
    }
}



// user story image..
export const UserStoryImageReducres = (state = { storyimage: [] }, action) => {
    switch (action.type) {
        case ADD_USER_STORY_LOADING: return { loading: true }
        case ADD_USER_STORY_SUCCESS: return { storyimage: action.payload }
        case ADD_USER_STORY_FAIL: return { error: action.payload }

        default: return state
    }
}



// list users..
export const ListUsersReducres = (state = { lists: [] }, action) => {
    switch (action.type) {

        case ADD_LIST_USERS_LOADING: return { loading: true }
        case ADD_LIST_USERS_SUCCESS: return { lists: action.payload }
        case ADD_LIST_USERS_FAIL: return { error: action.payload }
        default: return state
    }
}




// following user .. 
export const userfollwIngReducres = (state = { following: [] }, action) => {
    switch (action.type) {
        //case ADD_USER_FOLLOWING_LOADING: return { loading: true }
        case ADD_USER_FOLLOWING_SUCCESS: return { following: action.payload }
        case ADD_USER_FOLLOWING_FAIL: return { error: action.payload }
        default: return state
    }
}

// followare user .. 
export const userFollowReducres = (state = { follow: [] }, action) => {
    switch (action.type) {

        case ADD_USER_FOLLOWARE_SUCCESS: return { follow: action.payload }
        case ADD_USER_FOLLOWARE_FAIL: return { error: action.payload }
        default: return state
    }
}



// user id .. 
export const useridReducres = (state = { userid: [] }, action) => {
    switch (action.type) {
      //  case ADD_USERID_LOADING: return { loading: true }
        case ADD_USERID_SUCCESS: return {...state,userid: action.payload }
        case ADD_USERID_FAIL: return { error: action.payload }
        default: return state
    }
}



// login post
export const LoginReducres = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case ADD_USER_LOGIN: return { loading: true }
        case ADD_USER_SUCCESS: return { userInfo: action.payload }
        case ADD_USER_FAIL: return { error: action.payload }
        case ADD_USER_REQUIRES: return {}

        default: return state
    }
}