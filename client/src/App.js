import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser, setLogout, setUser } from "./redux/features/authSlice.js"
import AddEditQuestion from "./pages/AddEditQuestion";
import SingleQuestion from "./pages/SingleQuestion";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute"
import NotFound from "./pages/NotFound";
import TagQuestions from "./pages/TagQuestions";
import ResetPassword from "./pages/ResetPassword";
import ForgotResetPassword from "./pages/ForgotResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import TermsOfService from "./pages/TermsOfService";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch()


  const user = JSON.parse(localStorage.getItem("profile"))
  // const user = JSON.parse(sessionStorage.getItem("profile"))
  // console.log(user)

  useEffect(()=>{
      dispatch(setUser(user))
      if(user){
        dispatch(getLoggedInUser())
      }
  },[dispatch, user])


  return (
    <BrowserRouter>
      <div style={{textAlign:"center",border:"0px solid yellow",minHeight:"100vh"}} className="background">
        <Header/>
        <ToastContainer autoClose={2500} />

        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/questions/search" element={ <Home />} />
          <Route path="/questions/tag/:tag" element={ <TagQuestions />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/addQuestion" element={ <PrivateRoute> <AddEditQuestion /> </PrivateRoute> } />
          <Route path="/editQuestion/:id" element={ <PrivateRoute> <AddEditQuestion /> </PrivateRoute> } />
          <Route path="/question/:id" element={ <SingleQuestion />} />
          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
          <Route path="/resetPassword" element={ <PrivateRoute> <ResetPassword /> </PrivateRoute> } />
          <Route path="/terms" element={ <TermsOfService />} />

          {/* email girilen yer */}
          <Route path="/forgotPassword" element={ <ForgotPassword /> } /> 
          {/* şifre girilecek yer */}
          <Route path="/forgotResetPassword" element={ <ForgotResetPassword /> } />

          <Route path="*" element={ <NotFound />} />
          
        </Routes>


      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
