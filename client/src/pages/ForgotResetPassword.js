import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBValidation,MDBBtn,MDBSpinner, MDBInput,MDBIcon} from "mdb-react-ui-kit"
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import { resetPassword } from '../redux/features/authSlice'
import { useLocation } from "react-router-dom";
import LoadingToRedirect from '../components/LoadingToRedirect'


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const initialState = {
    password:"",
    confirmPassword:"",
}

function ForgotResetPassword() {
    const [forgotResetPasswordData,setForgotResetPasswordData] = useState(initialState)
    const {loading,error} = useSelector((state)=> ({...state.auth}))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery();
    const resetPasswordToken = query.get("resetPasswordToken");

    // console.log(resetPasswordToken)

    const {password,confirmPassword} = forgotResetPasswordData

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit= (e) => {
        e.preventDefault();
        if( password && confirmPassword ){
            dispatch(resetPassword({forgotResetPasswordData,resetPasswordToken,navigate,toast}))
            // toast.success("Hop şu an değişti")
        }
        // if(newPassword && confirmNewPassword){
        //     dispatch(resetPassword({forgotResetPasswordData,navigate,toast}))
        //     toast.success("Hop şu an değişti")
        // }

    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setForgotResetPasswordData({...forgotResetPasswordData,[name]:value})
    }

    if(!resetPasswordToken){
        return <LoadingToRedirect />
    }

return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}} className="container">
        <MDBCard alignment='center'>
        <h5 style={{marginTop:"5px"}}>Şifreni Yenile</h5>

        <MDBBtn tag="a" color="none" style={{position:"absolute",left:"15px",marginTop:"2px"}} onClick={() => navigate(-1)} >
            <MDBIcon fas style={{fontSize:"30px",color:"#000"}} color="none" icon="long-arrow-alt-left" />
        </MDBBtn>
            <MDBCardBody style={{paddingTop:"6px"}}>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>

                    <div className='col-md-12'>
                        <MDBInput
                        label="Yeni Şifreniz"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        row={4}
                        invalid
                        validation="Lütfen yeni şifrenizi giriniz."
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput
                        label="Yeni Şifrenizi doğrulayınız"
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        row={4}
                        invalid
                        validation="Lütfen yeni şifrenizi doğrulayınız."
                        />
                    </div>
                    

                    <div className='col-12'>
                        <MDBBtn style={{width:"100%"}}>{loading ? <MDBSpinner size='sm' role="status" tag="span" className='me-2' /> : "Şifreni değiştir" }</MDBBtn>
                    </div>

                </MDBValidation>
            </MDBCardBody>
            <span style={{fontStyle:"italic"}}>Değişiklikten sonra giriş sayfasına yönlendirileceksiniz.</span>
        </MDBCard>
    </div>
  )
}

export default ForgotResetPassword