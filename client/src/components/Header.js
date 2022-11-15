import React,{useState} from 'react'
import {MDBNavbar,MDBContainer,MDBIcon,MDBNavbarNav,MDBNavbarItem,MDBNavbarLink,MDBNavbarToggler,MDBCollapse,MDBNavbarBrand,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem} from "mdb-react-ui-kit";
  import { useSelector,useDispatch } from "react-redux";
import { setLogout } from '../redux/features/authSlice';
import { getQuestionsBySearch } from '../redux/features/questionSlice';
import {Link, useNavigate} from "react-router-dom"
import decode from "jwt-decode"
import {excerpt} from "../utility/index.js"


function Header() {

    const [show,setShow] = useState(false)
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
      }
    }

    // useEffect(() => {
    //   if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) {
    //     dispatch(setLogout());
    //   }
    // }
    // console.log("aaa")
    // }, [dispatch, token])
    


    const handleSubmit = (e) => {
      e.preventDefault();
      if(search){
        dispatch(getQuestionsBySearch(search))
        navigate(`/questions/search?searchQuery=${search}`)
        setSearch("")
      }else{
        navigate("/")
      }
    }

    const handleLogout=() => {
      dispatch(setLogout())
  }


  return(
    <MDBNavbar fixed="top" expand="lg" className='headerBack'>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{fontWeight: "600", fontSize: "22px"}}
          className="header-title-text"
        >
          OMÜHENDİSLİK
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#fff" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {/* {user?.result?._id && (
              <h5 style={{color:"#fff",marginTop:"17px",border:"0px solid black",marginRight:"10px",padding:"2px" }}>
                Kullanıcı: {user?.result?.name}
              </h5>
            )} */}

            <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"0px 20px"}}>
              {user?.result?._id && (
                <h5 className='nav-user-text' >
                  Kullanıcı: {excerpt(user?.result?.name,11)}
                </h5>
              )}
            </MDBNavbarItem>

            <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <MDBNavbarLink href="/" style={{padding:"0px",marginRight:"8px"}}>
                <p className="header-text">Ana Sayfa</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <MDBNavbarLink href="/addQuestion" style={{padding:"0px",marginRight:"8px"}}>
                    <p className="header-text">Soru Ekle</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <MDBNavbarLink href="/dashboard" style={{padding:"0px",marginRight:"8px"}}>
                    <p className="header-text">Profil</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <MDBNavbarLink href="/login" style={{padding:"0px",marginRight:"8px"}}>
                  <p className="header-text" 
                  onClick={() => handleLogout()}
                  >
                    Çıkış
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <MDBNavbarLink href="/login" style={{padding:"0px",marginRight:"8px"}}>
                  <p className="header-text">Giriş</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" 
          onSubmit={handleSubmit}
          >
            <input
              type="text"
              // className="form-control"
              className="search-input"
              placeholder="Soru Ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" color="white" />
            </div> */}
          </form>

          <MDBNavbarItem style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"0px 20px"}}>
              <MDBDropdown group>
                <MDBDropdownToggle style={{backgroundColor:"#fff",color:"#203a43"}}>Bölümler</MDBDropdownToggle>
                <MDBDropdownMenu style={{zIndex:"1500",marginTop:"5px"}}>

                  <MDBDropdownItem style={{padding:"5px",backgroundColor:"#fff"}} >
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Makine%20Mühendisliği"}>Makine Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Bilgisayar%20Mühendisliği"}>Bilgisayar Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Elektrik-Elektronik%20Mühendisliği"}>Elektrik-Elektronik Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/İnşaat%20Mühendisliği"}>İnşaat Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Çevre%20Mühendisliği"}>Çevre Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Endüstri%20Mühendisliği"}>Endüstri Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Metalurji%20ve%20Malzeme%20Mühendisliği"}>Metalurji ve Malzeme Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Gıda%20Mühendisliği"}>Gıda Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Harita%20Mühendisliği"}>Harita Mühendisliği</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{padding:"5px"}}>
                    <Link style={{color:"#203a43"}} to={"/questions/tag/Kimya%20Mühendisliği"}>Kimya Mühendisliği</Link>
                  </MDBDropdownItem>

                </MDBDropdownMenu>
              </MDBDropdown>
          </MDBNavbarItem>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header