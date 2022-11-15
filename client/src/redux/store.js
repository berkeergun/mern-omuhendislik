import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import QuestionReducer from "./features/questionSlice"

export default configureStore({
    reducer:{
        auth:AuthReducer,
        question:QuestionReducer,
        
    }
})