import {
    ADD_USER_POST_LOADING,
    ADD_USER_POST_SUCCESS,
    ADD_USER_POST_FAIL,


   
    ADD_POST_PRIVATE_SUCESS,
    ADD_POST_PRIVATE_FAIL,


   
    ADD_USER_COMMENT_SUCCESS,
    ADD_USER_COMMENT_FAIL,

    ADD_POST_VIWES_LOADING,
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

} from "../Action/types"


//view like user...
export const LikeViewsReducres = (state = {like: []}, action) => {

    switch (action.type) {
        case ADD_LIKE_POST_SUCCESS: return {like: action.payload }
        case     ADD_LIKE_POST_FAIL : return { error: action.payload }
        default: return state
    }
}



// add like to comment user.
export const AddLikeCommentReducres = (state = {}, action) => {

    switch (action.type) {
        case ADD_LIKE_COMMENT_SUCCESS: return {success: action.payload }
        case     ADD_LIKE_COMMENT_FAIL : return { error: action.payload }
        default: return state
    }
}

// put like to post from user..
export const Post_deleteReducres = (state = {}, action) => {

    switch (action.type) {
        case ADD_DELETE_USER_SUCCESS: return { success: action.payload }
        case ADD_DELETE_USER_FAIL: return { error: action.payload }
        default: return state
    }
}


// put like to post from user..
export const AddlikeReducres = (state = { }, action) => {

    switch (action.type) {
        case ADD_LIKE_USER_SUCCESSS: return { success: action.payload }
        case ADD_LIKE_USER_FAIL: return { error: action.payload }
        default: return state
    }
}

// viwe post to user. 
export const PostAllReducres = (state = { allpost: [] }, action) => {

    switch (action.type) {

        case ADD_POST_VIWES_LOADING: return { loading: true }
        case ADD_POST_VIWES_SUCCESS: return { allpost: action.payload }
        case ADD_POST_VIWES_FAILT: return { error: action.payload }
        default: return state
    }
}



// viwe post to user. 
export const AddCommentReducres = (state = {}, action) => {

    switch (action.type) {

        case ADD_USER_COMMENT_SUCCESS: return { success: action.payload }
        case ADD_USER_COMMENT_FAIL: return { error: action.payload }
        default: return state
    }
}




// viwe post to user. 
export const ViewPostReducres = (state = { post: [] }, action) => {

    switch (action.type) {

        case ADD_POST_PRIVATE_SUCESS: return {post: action.payload }
        case ADD_POST_PRIVATE_FAIL: return { error: action.payload }
        default: return state
    }
}




// create Post. 
export const PostcreateReducres = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_POST_LOADING: return { loading: true }
        case ADD_USER_POST_SUCCESS: return { success: action.payload }
        case ADD_USER_POST_FAIL: return { error: action.payload }
        default: return state
    }
}
