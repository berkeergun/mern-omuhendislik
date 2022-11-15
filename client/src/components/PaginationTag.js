import React from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";

const PaginationTag = ({
  setCurrentTagPage,
  currentTagPage,
  numberOfTagPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentTagPage === numberOfTagPages && currentTagPage === 1) return null;
    if (currentTagPage === 1) {
      return (
        <div className="paginationContainer">
          <div style={{border:"0px solid white",margin:"5px",padding:"5px"}}></div>
          <div className="currentPage">{currentTagPage}</div>
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentTagPage(currentTagPage + 1))}>
            {currentTagPage + 1}
          </div> 
        </div>
      );
    } else if (currentTagPage !== numberOfTagPages) {
      return (
        <div className="paginationContainer">
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentTagPage(currentTagPage - 1))}>
            {currentTagPage - 1 }
          </div>
          <div className="currentPage">
            {currentTagPage}
          </div>
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentTagPage(currentTagPage + 1))}>
            {currentTagPage + 1}
          </div> 
        </div>
      );
    } else {
      return (
        <div className="paginationContainer">
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentTagPage(currentTagPage - 1))}>
            {currentTagPage - 1 }
          </div>
          <div className="currentPage">
            {currentTagPage}
          </div>
        <div style={{border:"0px solid white",margin:"5px",padding:"5px"}}></div>
        </div>
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default PaginationTag;