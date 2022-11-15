import React from "react";

const PaginationUserQuestions = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <div className="paginationContainer">
          <div style={{border:"0px solid white",margin:"5px",padding:"5px"}}></div>
          <div className="currentPage">{currentPage}</div>
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
            {currentPage + 1}
          </div> 
        </div>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <div className="paginationContainer">
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
            {currentPage - 1 }
          </div>

          <div className="currentPage">
            {currentPage}
          </div>

          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
            {currentPage + 1}
          </div> 
        </div>
      );
    } else {
      return (
        <div className="paginationContainer">
          <div className="prevNextPage"
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
            {currentPage - 1 }
          </div>

          <div className="currentPage">
            {currentPage}
          </div>

          <div style={{border:"0px solid white",margin:"5px",padding:"5px"}}></div>
        </div>
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default PaginationUserQuestions;