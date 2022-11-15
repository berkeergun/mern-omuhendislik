import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBValidation,MDBBtn,MDBSpinner, MDBInput,MDBIcon} from "mdb-react-ui-kit"
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import { toast } from 'react-toastify'
import { resetLoggedInUserPassword } from '../redux/features/authSlice'

const initialState = {
    password:"",
    newPassword:"",
    confirmNewPassword:"",
}

function ResetPassword() {
    const [resetPasswordData,setResetPasswordData] = useState(initialState)
    const {user} = useSelector((state)=> ({...state.auth}))
    const {loading,error} = useSelector((state)=> ({...state.auth}))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {password,newPassword,confirmNewPassword} = resetPasswordData

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit= (e) => {
        e.preventDefault();

        // if(user && (password && newPassword && confirmNewPassword) && (newPassword === confirmNewPassword)){
        //     dispatch(resetLoggedInUserPassword({resetPasswordData,navigate,toast}))
        //     console.log(resetPasswordData)
        // }
        // toast.error("please provide benim warning")

        if(user && (password && newPassword && confirmNewPassword)){
            dispatch(resetLoggedInUserPassword({resetPasswordData,navigate,toast}))
        }

    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setResetPasswordData({...resetPasswordData,[name]:value})
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
                        label="Mevcut Şifreniz"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        invalid
                        validation="Lütfen mevcut şifrenizi giriniz."
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput
                        label="Yeni Şifreniz"
                        type="password"
                        value={newPassword}
                        name="newPassword"
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
                        label="Yeni Şifrenizi Doğrulayınız"
                        type="password"
                        value={confirmNewPassword}
                        name="confirmNewPassword"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        row={4}
                        invalid
                        validation="Lütfen yeni şifrenizi doğrulayınız"
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

export default ResetPassword