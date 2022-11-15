import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBValidation,MDBBtn,MDBSpinner, MDBInput,MDBIcon} from "mdb-react-ui-kit"
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import { toast } from 'react-toastify'
import { forgotPassword } from '../redux/features/authSlice'

const initialState = {
    resetEmail:""
}

function ForgotPassword() {
    const [forgotPasswordEmail,setForgotPasswordEmail] = useState(initialState)
    const {user,loading,error} = useSelector((state)=> ({...state.auth}))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {resetEmail} = forgotPasswordEmail

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit= (e) => {
        e.preventDefault();
        if(resetEmail){
            dispatch(forgotPassword({forgotPasswordEmail,navigate,toast}))
            // toast.success("Hop şu an değişti")
        }
    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setForgotPasswordEmail({...forgotPasswordEmail,[name]:value})
    }

return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}} className="container">
        <MDBCard alignment='center'>
        <h5 style={{marginTop:"5px"}}>Email Adresinizi Giriniz</h5>

        <MDBBtn tag="a" color="none" style={{position:"absolute",left:"15px",marginTop:"2px"}} onClick={() => navigate(-1)} >
            <MDBIcon fas style={{fontSize:"30px",color:"#000"}} color="none" icon="long-arrow-alt-left" />
        </MDBBtn>
            <MDBCardBody style={{paddingTop:"6px"}}>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>

                    <div className='col-md-12'>
                        <MDBInput
                        label="Email"
                        type="email"
                        value={resetEmail}
                        name="resetEmail"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        row={4}
                        invalid
                        validation="Lütfen uygun bir email giriniz"
                        />
                    </div>

                    <div className='col-12'>
                        <MDBBtn style={{width:"100%",letterSpacing:"1px"}}>{loading ? <MDBSpinner size='sm' role="status" tag="span" className='me-2' /> : "Şifre Yenileme Linkini Gönder" }</MDBBtn>
                    </div>

                </MDBValidation>
            </MDBCardBody>
            {/* <span style={{fontStyle:"italic"}}>Değişiklikten sonra giriş sayfasına yönlendirileceksiniz.</span> */}
        </MDBCard>
    </div>
  )
}

export default ForgotPassword