import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const createQuestion = createAsyncThunk(
  "question/createQuestion",
  async ({ updatedQuestionData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createQuestion(updatedQuestionData);
      navigate("/");
      toast.success("Soru başarıyla eklendi");
      // console.log(response.data);
      return response.data;

    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async (page,{ rejectWithValue }) => {
    try {
      const response = await api.getQuestions(page);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await api.getQuestion(id);
      // console.log(response.data);
      return (response.data)
    } catch (error) {
      // console.log(error);
       return rejectWithValue(error.response.data)
    }
  }
);

export const getQuestionsByUser = createAsyncThunk(
  "question/getQuestionsByUser",
  async ({userId,currentUserQuestionPage},{ rejectWithValue }) => {
    try {
      const response = await api.getQuestionsByUser(userId,currentUserQuestionPage);
      console.log(response.data);
      // console.log(currentUserQuestionPage)
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async ({id,toast},{ rejectWithValue }) => {
    try {
      const response = await api.deleteQuestion(id);
      // console.log(response.data);
      toast.success("Soru başarıyla silindi")
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async ({updatedQuestionData,id,toast,navigate},{ rejectWithValue }) => {
    try {
      const response = await api.updateQuestion(updatedQuestionData,id);
      // console.log(response.data);
      toast.success("Soru başarıyla güncellendi")
      navigate("/");
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestionsBySearch = createAsyncThunk(
  "question/getQuestionsBySearch",
  async (searchQuery,{ rejectWithValue }) => {
    try {
      const response = await api.getQuestionsBySearch(searchQuery);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getQuestionsByTag = createAsyncThunk(
  "question/getQuestionsByTag",
  async ({tag,page},{ rejectWithValue }) => {
    try {
      const response = await api.getQuestionsByTag(tag,page);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getQuestionsByTag = createAsyncThunk(
//   "question/getQuestionsByTag",
//   async (tag,{ rejectWithValue }) => {
//     try {
//       const response = await api.getQuestionsByTag(tag);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getRelatedQuestions = createAsyncThunk(
  "question/getRelatedQuestions",
  async (tags,{ rejectWithValue }) => {
    try {
      const response = await api.getRelatedQuestions(tags);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeQuestion = createAsyncThunk(
  "question/likeQuestion",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await api.likeQuestion(id);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//  - - - - - - -   - - - - --  - - - - - Comment -  - - - - - - - - - -  - - - - 

export const addNewCommentToQuestion = createAsyncThunk(
  "question/addNewCommentToQuestion",
  async ({id,commentData},{ rejectWithValue }) => {
    try {
      const response = await api.addNewCommentToQuestion(id,commentData);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCommentsByQuestion = createAsyncThunk(
  "question/getAllCommentsByQuestion",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await api.getAllCommentsByQuestion(id);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteComment = createAsyncThunk(
  "question/deleteComment",
  async ({question_id,comment_id,toast},{ rejectWithValue }) => {
    try {
      // console.log("1")
      const response = await api.deleteComment(question_id,comment_id);
      // console.log("2")
      toast.success("Yorum Başarıyla Silindi")
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentsByUser = createAsyncThunk(
  "question/getCommentsByUser",
  async ({userId,currentUserCommentPage},{ rejectWithValue }) => {
    try {
      const response = await api.getCommentsByUser(userId,currentUserCommentPage);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "question/updateComment",
  async ({updatedCommentData,id,toast,comment_id},{ rejectWithValue }) => {
    try {
      const response = await api.updateComment(id,comment_id,updatedCommentData);
      // console.log(response.data);
      toast.success("Yorum Başarıyla Güncellendi")
      // navigate("/");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const likeComment = createAsyncThunk(
  "question/likeComment",
  async ({question_id,comment_id},{ rejectWithValue }) => {
    try {
      const response = await api.likeComment(question_id,comment_id);
      // console.log(response.data);
      // toast.success("Yorum Başarıyla Güncellendi")
      // navigate("/");
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//  - - - - - - -   - - - - --  - - - - - Comment -  - - - - - - - - - -  - - - - 


const questionSlice = createSlice({
    name: "question",
    initialState: {
        question:{},
        // question:[],
        questions:[],
        userQuestions:[],
        tagQuestions:[],
        relatedQuestions:[],

        currentPage:1,
        numberOfPages:null,

        currentTagPage:1,
        numberOfTagPages:null,


        currentUserQuestionPage:1,
        numberOfUserQuestionPages:null,

        currentUserCommentPage:1,
        numberOfUserCommentPages:null,



        comments:[],
        // likesOfQuestion:[], //deneme

        userComments:[],
      
        error:"",
        loading:false,

    },
    reducers:{

      setCurrentPage:(state,action) => {
        state.currentPage=action.payload
      },
      setCurrentTagPage:(state,action) => {
        state.currentTagPage=action.payload
      },
      setCurrentUserQuestionPage:(state,action) => {
        state.currentUserQuestionPage=action.payload
      },
      setCurrentUserCommentPage:(state,action) => {
        state.currentUserCommentPage=action.payload
      },
    },

    extraReducers: {

      [createQuestion.pending]: (state, action) => {
        state.loading = true;
      },
      [createQuestion.fulfilled]: (state, action) => {
        state.loading = false;
        state.questions= [action.payload]
      },
      [createQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // ------------------------------------------------------------------------
      [getQuestions.pending]: (state, action) => {
        state.loading = true;
      },
      [getQuestions.fulfilled]: (state, action) => {
        state.loading = false;
        state.questions= action.payload.data;
        state.numberOfPages=action.payload.numberOfPages;
        state.currentPage=action.payload.currentPage;
      },
      [getQuestions.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // ------------------------------------------------------------------------
      [getQuestion.pending]: (state, action) => {
        //böyle olmamalı
        state.loading = true;
      },
      [getQuestion.fulfilled]: (state, action) => {
        state.loading = false;
        state.question= action.payload
        // console.log(state.question)
        // state.likesOfQuestion=state.question.likes
        // console.log(state.likesOfQuestionlength)

        // console.log(action.payload.likes.length)
        // state.likesOfQuestion = action.payload.likes
        // console.log(state.likesOfQuestion)
      },
      [getQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // ------------------------------------------------------------------------
      [getQuestionsByUser.pending]: (state, action) => {
        state.loading = true;
        // console.log(state.currentUserQuestionPage)
      },
      [getQuestionsByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.userQuestions= action.payload.data
        state.numberOfUserQuestionPages=action.payload.numberOfUserQuestionPages;
        state.currentUserQuestionPage=action.payload.currentUserQuestionPage

        // console.log(action.payload)
        // console.log(state.currentUserQuestionPage)
      },
      [getQuestionsByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // ------------------------------------------------------------------------
      [deleteQuestion.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteQuestion.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log("action",action)
        const {arg : {id}} = action.meta;
        if(id){
          state.userQuestions= state.userQuestions.filter((item) => item._id !== id)
          state.questions= state.questions.filter((item) => item._id !== id)
        }

      },
      [deleteQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // ------------------------------------------------------------------------
      [updateQuestion.pending]: (state, action) => {
        state.loading = true;
      },
      [updateQuestion.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log("action",action)
        const {arg : {id}} = action.meta;
        if(id){
          state.userQuestions= state.userQuestions.map((item) => item._id === id ? action.payload : item)
          state.questions= state.questions.map((item) => item._id === id ? action.payload : item)
        }

      },
      [updateQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // -------------------------------------------------------------

      [getQuestionsBySearch.pending]: (state, action) => {
        state.loading = true;
      },
      [getQuestionsBySearch.fulfilled]: (state, action) => {
        state.loading = false;
        state.questions= action.payload
      },
      [getQuestionsBySearch.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // -------------------------------------------------------------

      [getQuestionsByTag.pending]: (state, action) => {
        state.loading = true;
      },
      [getQuestionsByTag.fulfilled]: (state, action) => {
        state.loading = false;
        state.tagQuestions= action.payload.data
        state.numberOfTagPages=action.payload.numberOfTagPages;
        state.currentTagPage=action.payload.currentTagPage;
      },
      [getQuestionsByTag.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // -------------------------------------------------------------

      [getRelatedQuestions.pending]: (state, action) => {
        // state.loading = true;
      },
      [getRelatedQuestions.fulfilled]: (state, action) => {
        state.loading = false;
        state.relatedQuestions= action.payload
      },
      [getRelatedQuestions.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      // -------------------------------------------------------------

      [likeQuestion.pending]: (state, action) => {
      },

      [likeQuestion.fulfilled]: (state, action) => {
        state.loading = false;

        if(action.meta.arg){
          // state.questions= state.questions.map((item) => item._id === action.meta.arg ? action.payload : item)
          // state.question= state.questions.map((item) => item._id === action.meta.arg ? action.payload : item)
          state.question=action.payload

        }
        // console.log(action.payload)
        // console.log(state.question)
        // state.question=action.payload
      },
      [likeQuestion.rejected]: (state, action) => {
        state.error = action.payload.message;
      },

      // ----------------                         COMMENTS                       --------------------------

      [addNewCommentToQuestion.pending]: (state, action) => {
        state.loading = true; // ??????????????????????????????????????????????????????????????????????????????????????????????????????????
        // console.log("burdayım")
      },
      [addNewCommentToQuestion.fulfilled]: (state, action) => {
        // console.log("gelemedim")

        state.loading = false;
        state.comments= [...state.comments,action.payload.data]

        console.log(action.payload)
        // console.log(state.comments)
      },
      [addNewCommentToQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // -------------------------------------------------------------

      [getAllCommentsByQuestion.pending]: (state, action) => {
        state.loading = true;
      },
      [getAllCommentsByQuestion.fulfilled]: (state, action) => {
        state.loading = false;
        state.comments= action.payload.data;
        //console.log(current(state.comments))
        // console.log('getAllCommentsByQuestion');
        // console.log(action.payload);
      },
      [getAllCommentsByQuestion.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // -------------------------------------------------------------

      [deleteComment.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteComment.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log("action",action)
        const {arg : {comment_id}} = action.meta;
        if(comment_id){
          // state.userQuestions= state.userQuestions.filter((item) => item._id !== id)
          state.comments= state.comments?.filter((item) => item._id !== comment_id)
        }

      },
      [deleteComment.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // ------------------------------------------------------------------------
      [getCommentsByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getCommentsByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.userComments= action.payload.data

        state.numberOfUserCommentPages=action.payload.numberOfUserCommentPages;
        state.currentUserCommentPage=action.payload.currentUserCommentPage

        // console.log(action.payload)

        // console.log(state.userComments)
      },
      [getCommentsByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      // ------------------------------------------------------------------------
      [updateComment.pending]: (state, action) => {
        state.loading = true;
      },
      [updateComment.fulfilled]: (state, action) => {
        state.loading = false;
        // console.log("action",action)
        const {arg : {comment_id}} = action.meta;
        // console.log(action)
        // console.log('update');
        // console.log(current(state.comments))
        // console.log(comment_id)
        if(comment_id){
          state.userComments= state.userComments.map((item) => item._id === comment_id ? action.payload : item)
          state.comments= current(state.comments).map((item) => item._id === comment_id ? action.payload : item)

        }
        // console.log(state.comments)
        // console.log(action);

      },
      [updateComment.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      ///--------
      [likeComment.pending]: (state, action) => {

      },
      [likeComment.fulfilled]: (state, action) => {
        state.loading = false;
        const {arg : {comment_id}} = action.meta;
        // console.log(comment_id)
        if(comment_id){
          state.comments= state.comments.map((item) => item._id === comment_id ? action.payload : item)
        }
      },
      [likeComment.rejected]: (state, action) => {
        state.error = action.payload.message;
      },
  },
  });

  export const {setCurrentPage,setCurrentTagPage,setCurrentUserQuestionPage,setCurrentUserCommentPage} = questionSlice.actions;
  
  
  export default questionSlice.reducer;
  