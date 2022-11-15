import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

function Spinner() {
  return (
      <MDBSpinner
        className="me-2"
        // style={{ width: "3rem", height: "3rem", marginTop: "100px",color:"#0c55b6"}}
        style={{ width: "3rem", height: "3rem", marginTop: "100px",color:"#fff"}}
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    
  );
};

export default Spinner;