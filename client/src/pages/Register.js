import React,{useState,useEffect} from 'react'
import {MDBCard,MDBCardBody,MDBInput, MDBCardFooter,MDBValidation,MDBBtn,MDBIcon,MDBSpinner,MDBCheckbox} from "mdb-react-ui-kit"
import {Link , useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"
import { register } from '../redux/features/authSlice'

const initialState={
  firstName:"",
  lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
}

function Register() {
    const [formValue,setFormValue]=useState(initialState);
    const {loading,error} = useSelector((state) => ({...state.auth}))
    const [checkBox,setCheckBox]=useState(false)

    const {email,password,firstName,lastName,confirmPassword} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])



    useEffect(() => {
    const profile = localStorage.getItem("profile")
      if(profile){
        navigate("/")
      }
    }, [navigate])
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
          return toast.error("Şifreler eşleşmiyor")
        }

        if(email && password && firstName && lastName && confirmPassword && checkBox){
            dispatch(register({formValue,navigate,toast}))
        }

    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value})
    }

    // console.log(checkBox)
    

  return (

    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className='fa-2x' style={{marginTop:"10px",color:"#203a43"}} />
            <h5>Kayıt Ol</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>

                    <div className='col-md-6'>
                        <MDBInput label="İsim" type="text" value={firstName} name="firstName" onChange={onInputChange} required invalid validation="Please provide first name" maxLength="20" />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput label="Soyisim" type="text" value={lastName} name="lastName" onChange={onInputChange} required invalid validation="Please provide last name" maxLength="20" />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label="Email" type="text" value={email} name="email" onChange={onInputChange} required invalid validation="Please provide email" maxLength="120"  />
                    </div>

                    <div className='col-md-12'>
                        <MDBInput label="Şifre" type="password" value={password} name="password" onChange={onInputChange} required invalid validation="Please provide password" />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label="Şifre Tekrarı" type="password" value={confirmPassword} name="confirmPassword" onChange={onInputChange} required invalid validation="Please provide confirm password" />
                    </div>
                    <div className='col-md-12'>
                        <MDBCheckbox name='flexCheck' value={checkBox} onClick={()=>setCheckBox(!checkBox)}id='flexCheckDefault' label='Kullanım sözleşmesini okudum, kabul ediyorum.' required invalid validation="Please provide anlaşma"  />
                    </div>
                    
                        <Link to={"/terms"} target={"_blank"} style={{margin:"0px",padding:"0px"}} >Kullanım Sözleşmesi</Link>
                        
                    <div className='col-12'>
                        <MDBBtn style={{width:"100%"}} className="mt-2">
                            {loading ? (
                                <MDBSpinner size='sm' role="status" tag="span" className='me-2' /> 
                            ) : "Kayıt Ol"}
                        </MDBBtn>
                    </div>

                </MDBValidation>
            </MDBCardBody>

            <MDBCardFooter>
                <Link to="/login">
                <p>Zaten bir hesabın var mı? Giriş Yap</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Register