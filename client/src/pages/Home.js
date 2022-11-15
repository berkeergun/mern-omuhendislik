import React, {useEffect} from 'react'
import {MDBCol, MDBContainer,MDBRow,MDBTypography} from "mdb-react-ui-kit"
import {useDispatch, useSelector} from "react-redux"
import { getQuestions,setCurrentPage } from '../redux/features/questionSlice';
import CardQuestion from '../components/CardQuestion';
import Spinner from '../components/Spinner';
import { useLocation } from "react-router-dom";
import Pagination from '../components/Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  // console.log(searchQuery)

  const {questions,loading,currentPage,numberOfPages} = useSelector((state) => ({...state.question}))


  useEffect(() => {
    dispatch(getQuestions(currentPage))


  }, [currentPage, dispatch])
  
  // console.log(questions)

  if(loading){
    return <Spinner/>
  }

  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"1000px",alignContent:"center"}}>
      <MDBRow className='mt-5'>

        {questions.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2" style={{marginTop:"30px",color:"#fff"}}>
            Sitede soru bulunmuyor...
          </MDBTypography>
        )}
        {questions.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2" style={{marginTop:"30px",color:"#fff"}}>
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}
        {searchQuery && questions.length > 0 && (
          <MDBTypography className="text-center mb-0" tag="h2" style={{marginTop:"30px",color:"#fff"}}>
          "{searchQuery}" ile ilgili sorular
          <hr style={{color:"white" }}/>
          </MDBTypography>
          
        
        )}

        <MDBCol style={{display:"flex",justifyContent:"center"}}>
          <MDBContainer style={{padding:"0px",margin:"10px"}}>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {/* {questions && questions.slice(0).reverse().map((item,index) => */}
              {questions && questions.map((item) =>
              <CardQuestion key={item._id} {...item} />
              )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {questions.length > 0 && !searchQuery && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}

    </div>
  )
}

export default Home