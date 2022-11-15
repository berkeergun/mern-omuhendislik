import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      // toast.success("Login Successfully");
      toast.success("Giriş Başarılı");
      navigate("/");
      
      // console.log(response.data);
      
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      // toast.success("Register Successfully");
      toast.success("Kayıt Başarılı");
      navigate("/");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Google Sign-in Successfully");
      navigate("/");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
//--      reset password

export const resetLoggedInUserPassword = createAsyncThunk(
  "auth/resetLoggedInUserPassword",
  async ({ resetPasswordData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetLoggedInUserPassword(resetPasswordData);
      // console.log("aaa")
      toast.success("Şifreniz başarıyla yenilendi");
      navigate("/login");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ forgotPasswordEmail, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword(forgotPasswordEmail);
      // console.log("forgotPassword")
      toast.success("Email adresinize yenileme linki gönderildi");
      navigate("/");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ forgotResetPasswordData,resetPasswordToken, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(forgotResetPasswordData,resetPasswordToken);
      // console.log("resetPassword")
      toast.success("Şifreniz başarıyla değiştirildi");
      navigate("/login");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
//- Admin Dashboard

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllUsers();
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUserById(id);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "auth/deleteUserById",
  async ({id,toast}, { rejectWithValue }) => {
    try {
      const response = await api.deleteUserById(id);
      toast.success("Kullanıcı başarıyla silindi");
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockUser = createAsyncThunk(
  "auth/blockUser",
  async ({id,toast}, { rejectWithValue }) => {
    try {
      const response = await api.blockUser(id);
      toast.success(response.data.message);
      // console.log(response.data.message)

      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getUserBySearch  = createAsyncThunk(
  "auth/getUserBySearch ",
  async (searchQuery,{ rejectWithValue }) => {
    try {
      const response = await api.getUserBySearch (searchQuery);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
/// ---------------

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await api.getLoggedInUser();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);



//  - - - - - - - --  - - - 

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,

    adminAllUsers:[],
    adminUser:{},

    blockedControl:null,

  },
  reducers:{
    setUser:(state,action) => {
      state.user = action.payload
    },
    setLogout:(state,action) => {
      localStorage.clear()
      sessionStorage.clear()
      state.user = null;
    }

  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      sessionStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // reset password

    [resetLoggedInUserPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetLoggedInUserPassword.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.clear()
      sessionStorage.clear()
      state.user = null;
    },
    [resetLoggedInUserPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    //----------------        ÖNEMLİ
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      // silinebilir
      localStorage.clear()
      sessionStorage.clear()
      state.user = null;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    //----------------
    [resetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      // silinebilir
      localStorage.clear()
      sessionStorage.clear()
      state.user = null;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    // Admin Panel

    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminAllUsers= action.payload.data
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    //--
    [getUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminUser= action.payload.data
    },
    [getUserById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    //--
    [deleteUserById.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUserById.fulfilled]: (state, action) => {
      state.loading = false;

      const {arg : {id}} = action.meta;
        if(id){
          state.adminAllUsers= state.adminAllUsers.filter((item) => item._id !== id)
        }
    },
    [deleteUserById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    //--
    [blockUser.pending]: (state, action) => {
      state.loading = true;
    },
    [blockUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [blockUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      // console.log(state.error)
    },
    // -------------------------------------------------------------

    [getUserBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminAllUsers= action.payload.data
    },
    [getUserBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    //--------------------------------

    [getLoggedInUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getLoggedInUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.blockedControl= action.payload.result
      // console.log(state.blockedControl)
      if(state.blockedControl.blocked){
        localStorage.clear()
        sessionStorage.clear()
      }
    },
    [getLoggedInUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});

export const { setUser,setLogout } =authSlice.actions

export default authSlice.reducer;
