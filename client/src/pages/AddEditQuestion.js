import React, { useState,useEffect } from 'react'
import {MDBCard,MDBCardBody,MDBValidation,MDBBtn,MDBSpinner, MDBInput,MDBIcon} from "mdb-react-ui-kit"
// import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import {toast} from "react-toastify"
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { createQuestion, updateQuestion } from '../redux/features/questionSlice'
import Spinner from '../components/Spinner'

const initialState = {
    title:"",
    description:"",
    tags:"",
    // tags:[],
}

function AddEditQuestion() {
    const [questionData,setQuestionData] = useState(initialState)
    const [tagErrMsg,setTagErrMsg] = useState(null)
    const {error,loading,userQuestions} = useSelector((state)=> ({...state.question}))
    const {user} = useSelector((state)=> ({...state.auth}))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {title,description,tags} = questionData
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const singleQuestion= userQuestions.find((question) => question._id === id);
            setQuestionData({...singleQuestion})
        }
    }, [id, userQuestions])

    useEffect(() => {
      error && toast.error(error);
    }, [error])

    const handleSubmit= (e) => {
        e.preventDefault();
        if(!tags.length){
            setTagErrMsg("Lütfen Bölüm seçiniz.")
        }
        if(title && description && tags) {
            const updatedQuestionData= {...questionData, name: user?.result?.name, }
            // console.log(updatedQuestionData)
            if(!id){
                dispatch(createQuestion({updatedQuestionData, navigate,toast }))
            }else{
                dispatch(updateQuestion({id,updatedQuestionData,navigate,toast}))
            }
            // handleClear()
        }
    }

    const onInputChange = (e) => {
        let {name,value} = e.target;
        setQuestionData({...questionData,[name]:value})
    }

    // const handleAddTag= (tag) => {
    //     setTagErrMsg(null)
    //     setQuestionData({...questionData,tags:[...questionData.tags,tag]})
    // }

    // const handleDeleteTag= (deleteTag) => {
    //     setQuestionData({...questionData,tags:questionData.tags.filter((tag)=> tag !== deleteTag)})
    // }

    const handleClear= () => {
        setQuestionData({title:"",description:"",tags:[]})
    }

    if(loading){
        return <Spinner />
    }

  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}} className="container">
        <MDBCard alignment='center'>
            <h5 style={{marginTop:"5px"}}>{ id ? "Soru Güncelle" : "Soru Ekle" }</h5>

            <MDBBtn tag="a" color="none" style={{position:"absolute",left:"15px",marginTop:"2px"}} onClick={() => navigate(-1)} >
                <MDBIcon fas style={{fontSize:"30px",color:"#000"}} color="none" icon="long-arrow-alt-left" />
            </MDBBtn>

            <MDBCardBody style={{paddingTop:"6px"}}>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className='col-md-12'>
                        <MDBInput
                        label="Ders Adı/Konu/Başlık"
                        type="text"
                        value={title}
                        name="title"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        invalid
                        validation="Lütfen Ders Adı/Konu/Başlık giriniz."
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput
                        style={{height:"100px"}} 
                        label="Soru"
                        type="text"
                        value={description}
                        name="description"
                        onChange={onInputChange}
                        className="form-control"
                        required
                        textarea
                        row={4}
                        invalid
                        validation="Lütfen Soru giriniz."
                        />
                    </div>

                    <div className="col-md-12">
                        {/* <ChipInput name="tags" value={tags} variant="outlined" placeholder='Enter Tags' fullWidth onAdd={(tag) => handleAddTag(tag)} onDelete={(tag)=>handleDeleteTag(tag)} /> */}
                        
                        <select name="tags" value={tags} onChange={onInputChange} style={{maxWidth:"300px"}} 
                        multiple={false}
                        >
                            <option value="" disabled hidden>Bölüm Seçiniz</option>
                            <option value="Makine Mühendisliği">Makine Mühendisliği</option>
                            <option value="Bilgisayar Mühendisliği">Bilgisayar Mühendisliği</option>
                            <option value="Elektrik-Elektronik Mühendisliği">Elektrik-Elektronik Mühendisliği</option>
                            <option value="İnşaat Mühendisliği">İnşaat Mühendisliği</option>
                            <option value="Çevre Mühendisliği">Çevre Mühendisliği</option>
                            <option value="Endüstri Mühendisliği">Endüstri Mühendisliği</option>
                            <option value="Metalurji ve Malzeme Mühendisliği">Metalurji ve Malzeme Mühendisliği</option>
                            <option value="Gıda Mühendisliği">Gıda Mühendisliği</option>
                            <option value="Harita Mühendisliği">Harita Mühendisliği</option>
                            <option value="Kimya Mühendisliği">Kimya Mühendisliği</option>
                        </select>

                        {tagErrMsg && <div className='tagErrMsg'>{tagErrMsg}</div>}

                    </div>

                    <div className='d-flex justify-content-start'>
                        <FileBase type="file" multiple={true} 
                        onDone={ (base64) => {
                            // console.log(base64)
                            setQuestionData({...questionData,imageFile:base64})
                            console.log(base64)
                            }} />
                            {/* <input type="file" multiple /> */}
                    </div>


                    {/* <div className='d-flex justify-content-start'>
                        <FileBase type="file" multiple={true} 
                        onDone={ ({base64})=>setQuestionData({...questionData,imageFile:base64}) } />
                    </div> */}

                    <div className='col-12'>
                        <MDBBtn style={{width:"100%"}}>{loading ? <MDBSpinner size='sm' role="status" tag="span" className='me-2' /> : id ? "Güncelle" : "Ekle"}</MDBBtn>
                        <MDBBtn style={{width:"100%"}} className="mt-2" color='danger' onClick={handleClear}>Temizle</MDBBtn>
                    </div>

                </MDBValidation>
            </MDBCardBody>
        </MDBCard>

    </div>
  )
}

export default AddEditQuestion