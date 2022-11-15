import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"


function Footer() {
    const {loading} = useSelector((state) => ({...state.question}))

    if(loading){
      return null
    }
    
  return (
    <MDBFooter className='text-center text-lg-start text-muted' style={{backgroundColor:"#0f2027"}}  >
      <footer>

      <div className='p-1'>
        <MDBContainer className='text-center text-md-start mt-2' >
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:"#fff",letterSpacing:"1px"}}>
                OMÜHENDİSLİK
              </h6>
              <p style={{color:"#fff"}}>
              Bacon ipsum dolor amet tongue brisket strip steak chislic.  Jerky cow ham hock pork tenderloin, bresaola swine tri-tip sirloin.
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:"#fff",letterSpacing:"1px"}}>İLETİŞİM</h6>
              {/* <p style={{color:"#fff"}}>
                <MDBIcon icon="home" className="me-2" />
                Atakum, Samsun, TR
              </p> */}
              <p style={{color:"#fff"}}>
                <MDBIcon icon="envelope" className="me-3" />
                <a className='text-reset' href='mailto:omuhendislik@gmail.com'>
                omuhendislik@gmail.com
                </a>
              </p>
              {/* <p style={{color:"#fff"}}>
                <MDBIcon icon="phone" className="me-3" /> + 090 5** *** ** **  
              </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div className='text-center p-1' style={{color:"#fff",letterSpacing:"1px"}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}OMÜHENDİSLİK
        <br/>
        <Link target={"_blank"} to={"/terms"} style={{color:"#70bbdb"}}>Kullanım Sözleşmesi</Link>

      </div>
      </footer>

    </MDBFooter>
  )
}

export default Footer