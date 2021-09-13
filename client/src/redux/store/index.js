

import {
    createStore,
    combineReducers,
    applyMiddleware

} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// from Auth user... 
import {
    LoginReducres,
    useridReducres,
    userFollowReducres,
    userfollwIngReducres,
    ListUsersReducres,
    UserStoryImageReducres,
    FollowUserReducres,
    StoryViewsReducres,
    ChangProdileReducres,
} from "../reducres/Auth_reducres"


// from post.. 
import {
    PostcreateReducres,
    ViewPostReducres,
    AddCommentReducres,
    PostAllReducres,
    AddlikeReducres,
    Post_deleteReducres,
    AddLikeCommentReducres,
    LikeViewsReducres,
} from "../reducres/Post_reducres"

const reducer = combineReducers({
    userLogin: LoginReducres,
    userID :useridReducres,
    followID :userFollowReducres,
    followingID :userfollwIngReducres,
    userslistID :ListUsersReducres,
    storimageID : UserStoryImageReducres,
    follouserID :FollowUserReducres,
    storyID: StoryViewsReducres,
     profileID :ChangProdileReducres,



    postcreateID :PostcreateReducres,
    postID: ViewPostReducres,
    deletepostID: Post_deleteReducres,
    commentID :AddCommentReducres,
    allpostID :PostAllReducres,
    likeID: AddlikeReducres,
    likecommentID: AddLikeCommentReducres,
    likelistID : LikeViewsReducres
})


const local = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')): null


const intialstate = {
    userLogin: {
        userInfo: local
    }
}


const middleware = [thunk]

const store = createStore(reducer, intialstate, composeWithDevTools(applyMiddleware(...middleware)))

export default store