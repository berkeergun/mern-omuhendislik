import axios from "axios"

const API=axios.create({baseURL:"http://localhost:5000"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

//user

export const signIn= (formData) => API.post("/users/signin",formData)
export const signUp= (formData) => API.post("/users/signup",formData)
export const googleSignIn= (result) => API.post("/users/googleSignIn",result)
export const resetLoggedInUserPassword= (resetPasswordData) => API.put("/users/resetLoggedInUserPassword",resetPasswordData)

export const forgotPassword= (forgotPasswordEmail) => API.post("/users/forgotPassword",forgotPasswordEmail)
export const resetPassword= (resetPasswordData,resetPasswordToken) => API.put(`/users/resetPassword?resetPasswordToken=${resetPasswordToken}`,resetPasswordData)


// Comment
export const getCommentsByUser= (user_id,page) => API.get(`/question/${user_id}/comments?page=${page}`)
export const deleteComment=(question_id,comment_id) => API.delete(`/question/${question_id}/comment/${comment_id}`)

export const updateComment=(question_id,comment_id,updatedCommentData) => API.patch(`/question/${question_id}/comment/${comment_id}`,updatedCommentData)

export const addNewCommentToQuestion=(id,commentData)=> API.post(`/question/${id}/comment`,commentData)
export const getAllCommentsByQuestion=(id)=> API.get(`/question/${id}/comment`)
export const likeComment=(question_id,comment_id)=> API.patch(`/question/${question_id}/comment/like/${comment_id}`)


//question
export const createQuestion= (questionData) => API.post("/question",questionData)
export const getQuestions= (page) => API.get(`/question?page=${page}`)
export const getQuestion= (id) => API.get(`/question/${id}`)
export const deleteQuestion= (id) => API.delete(`/question/${id}`)
export const updateQuestion= (updatedQuestionData,id) => API.patch(`/question/${id}`,updatedQuestionData)
export const getQuestionsByUser= (userId,page) => API.get(`/question/userQuestions/${userId}?page=${page}`)

//sıkıntı
export const getQuestionsBySearch = (searchQuery) => API.get(`/question/search?searchQuery=${searchQuery}`)

// export const getQuestionsByTag = (tag) => API.get(`question/tag/${tag}`)

export const getQuestionsByTag = (tag,pageTag) => API.get(`/question/tag/${tag}?pageTag=${pageTag}`)
export const getRelatedQuestions = (tags) => API.post(`/question/relatedQuestions`,tags)

export const likeQuestion = (id) => API.patch(`/question/like/${id}`);


//admin

export const getAllUsers = () => API.get(`/admin/getAllUsers`);
export const getUserById = (id) => API.get(`/admin/getUserById/${id}`);
export const deleteUserById = (id) => API.delete(`/admin/deleteUserById/${id}`);
export const blockUser = (id) => API.patch(`/admin/blockUser/${id}`);
export const getUserBySearch = (searchQuery) => API.get(`/admin/getUserBySearch/?searchQuery=${searchQuery}`);


export const getLoggedInUser = () => API.get(`/users/`)