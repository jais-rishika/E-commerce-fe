import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";

function PaginationComponents({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  //create the url
  const url = `/product-list${category}/${search}`;
  return (
    <Pagination>
      {/* when pageNum==1 disable back button */}
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {/* showing all pagination links  */}
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      {/* last pageNum then disable next button */}
      <LinkContainer
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
}

export default PaginationComponents;
