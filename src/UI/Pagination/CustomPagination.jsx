// CSS
import "./CustomPagination.css";

import { Pagination } from "react-bootstrap";

function CustomPagination(props) {
  // eslint-disable-next-line react/prop-types
  const { currentPage, totalPages, onPageChange } = props;

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageItems = () => {
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <div className='paginateContainer'>
      <Pagination className='CustomPagination'>
        <Pagination.Prev
          className='NextPrev'
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        />
        {renderPageItems()}
        <Pagination.Next
          className='NextPrev'
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;
