import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AttributeFilterComponent from "../../components/filterQueryResultOptions/AttributeFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import PaginationComponents from "../../components/user/PaginationComponents";
import ProductForListComponent from "../../components/user/ProductForListComponent";
import SortOptionsComponent from "../../components/user/SortOptionsComponent";
export default function ProductListComponent({ fetchProducts, categories }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFromFilter, setAttrsFromFilter] = useState([]);
  const [attrsFilter, setAttrsFilter] = useState([]);
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
  const [filter,setFilter] = useState({})
  const [price,setPrice] =useState(500)
  const [rating,setRating] = useState(0)
  const [categoryChecked, setCategoryChecked] =useState({})
  const [sortOption, setSortOption]= useState("")
  const [paginationLinksNumber,setPaginationLinksNumber]=useState(null)
  const [pageNum,setPageNum]= useState(null)
  const location=useLocation()

  const { categoryName } = useParams() || "";
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";

  const navigate=useNavigate()
  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find((item) => {
        return item.name === categoryName.replaceAll(",", "/");
      });
      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);

  //for object key value pairs we check length if >0 let new array then for each push category 
  // findIndex and then set attributes accordingly
  useEffect(()=>{
    if(Object.entries(categoryChecked).length>0){
      setAttrsFilter([])
      var cat=[]
      let count;
      Object.entries(categoryChecked).forEach(([category,checked])=>{
        if(checked){
          var name= category.split("/")[0]
          cat.push(name)
          count =cat.filter((x)=>x===name).length
          if(count===1){
            var index= categories.findIndex((item)=> item.name === name)
            setAttrsFilter((attrs)=>[...attrs,...categories[index].attrs])
          }
        }
      })
    }
  },[categoryChecked,categories])

  useEffect(() => {
    fetchProducts(categoryName, pageNumParam, searchQuery, filter, sortOption)
      .then((prod) => {
        setProduct(prod.products);
        setPaginationLinksNumber(prod.paginationLinksNumber)
        setPageNum(prod.pageNum)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [categoryName,filter,sortOption,pageNumParam,searchQuery]);


  const filterHandler=()=>{
    navigate(location.pathname.replace(/\/[0-9]+$/, "")); 
    setShowResetFiltersButton(true)
    setFilter({
      rating: rating,
      attrs : attrsFromFilter,
      price : price,
      categories: categoryChecked
    })
  }

  const resetFilterHandler=()=>{
    setShowResetFiltersButton(false)
    setFilter({})
    window.location.href="/product-list"
  }
  
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent setSortOption={setSortOption}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Filter: <br />
              <PriceFilterComponent price={price} setPrice={setPrice}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent rating={rating} setRating={setRating}/>
            </ListGroup.Item>
            {!location.pathname.match(/\/category/) && (
            <ListGroup.Item>
              <CategoryFilterComponent setCategoryChecked={setCategoryChecked} />
            </ListGroup.Item>

            )}
            <ListGroup.Item>
              <AttributeFilterComponent
                attrsFilter={attrsFilter}
                setAttrsFromFilter={setAttrsFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" className="mt-1 w-50 " onClick={filterHandler}>
                Filter
              </Button>
              <br />
              {showResetFiltersButton && (
                <Button variant="danger" className="mt-1 w-50 " onClick={resetFilterHandler}>
                  Reset Filters
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Loading Products...</h1>
          ) : error ? (
            <h1>Error while loading products. Try again later.</h1>
          ) : (
            product.map((product) => (
              <ProductForListComponent
                key={product._id}
                images={product.images}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
                reviewsNumber={product.reviewsNumber}
                productId={product._id}
              />
            ))
          )}
          {paginationLinksNumber>1 ? (
            <PaginationComponents 
              categoryName={categoryName}
              searchQuery={searchQuery}
              paginationLinksNumber={paginationLinksNumber}
              pageNum={pageNum}
            />
          ): null}
        </Col>
      </Row>
    </Container>
  );
}
