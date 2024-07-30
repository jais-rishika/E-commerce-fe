import { Fragment, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-11px",
  transform: "scale(2.7)",
};

const EditProductComponent = ({
  categories,
  fetchProducts,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributesInTheDoc,
  imageDeleteHandler,
  uploadHandler,
  uploadImagesCloudinaryApiRequest,
  changeCategory,
  setAttributeWrapper,
  setValueForAttributeKey
}) => {
  //local States
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState([]);
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [attributeFromDb, setAttributeFromDb] = useState([]);
  const [attributeTable, setAttributeTable] = useState([]);
  const [categoryChosen, setCategoryChosen] = useState("choose category");
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageDelete, setImageDelete] = useState(false);
  const [isUploading, setIsUploading] =useState("");
  const [imageUploaded,setImageUploaded] =useState(false)
  const navigate = useNavigate();
  const { id } = useParams();

  //references
  const attrkey = useRef(null);
  const attrvalue = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrValue = useRef(null);

  //changing attributes based on category
  
  // const changeCategory = (e) => {
  //   const highLevelCategory = e.target.value.split("/")[0];
  //   const highLevelCategoryAllData = categories.find(
  //     (cat) => cat.name === highLevelCategory
  //   );
  //   if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
  //     console.log(highLevelCategoryAllData);
  //     setAttributeFromDb(highLevelCategoryAllData.attrs);
  //   } else {
  //     setAttributeFromDb([]);
  //   }
  //   setCategoryChosen(e.target.value);
  // };

 
  // const setValueForAttributeKey = (e) => {
  //   if (e.target.value !== "choose attribute") {
  //     var selectedAttr = attributeFromDb.find(
  //       (item) => item.key === e.target.value
  //     );
  //     let valueForAttribute = attrvalue.current;
  //     if (selectedAttr && selectedAttr.value.length > 0) {
  //       valueForAttribute.options.length = 0;
  //       valueForAttribute.add(new Option("choose attribute"));
  //       selectedAttr.value.map((item) => {
  //         valueForAttribute.add(new Option(item));
  //       });
  //     }
  //   }
  // };

  //fetching product detail
  useEffect(() => {
    fetchProducts(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((er) => console.log(er));
  }, [id, imageDelete,imageUploaded]);

  //fetching product category categories
  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      let mainCategory = categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryAllData = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategory
      );
      if (mainCategoryAllData && mainCategoryAllData.attrs.length > 0) {
        setAttributeFromDb(mainCategoryAllData.attrs);
      }
    }
    setCategoryChosen(product.category);
    setAttributeTable(product.attrs);
  }, [product]);

  //form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    //updating these values
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributeTable: attributeTable,
    };
    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          console.log(data);
          if (data.message === "product updated") navigate("//products");
        })
        .catch((er) =>
          setUpdateProductResponseState(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }

    setValidated(true);
  };

  //adding th e attributes into the html table as they are added
  const attributeValueSelector = (e) => {
    if (e.target.value !== "choose attribute") {
      setAttributeWrapper(attrkey.current.value, attrvalue.current.value,setAttributeTable);
    }
  };
  
  // const setAttributeWrapper = (key, val) => {
  //   setAttributeTable((attr) => {
  //     if (attr.length != 0) {
  //       let keyExistInTable = false;
  //       let modifiedTable = attr.map((item) => {
  //         if (item.key === key) {
  //           keyExistInTable = true;
  //           item.value = val;
  //           return item;
  //         } else {
  //           return item;
  //         }
  //       });
  //       return keyExistInTable
  //         ? modifiedTable
  //         : [...modifiedTable, { key: key, value: val }];
  //     } else {
  //       return [{ key: key, value: val }];
  //     }
  //   });
  // };

  const deleteAttribute = (key) => {
    setAttributeTable((attr) => attr.filter((row) => row.key !== key));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const newAttributeKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };
  const newAttributeValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      //13 -> enter
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributesInTheDoc(newAttrKey, newAttrValue, categoryChosen)
        );
        setAttributeWrapper(newAttrKey, newAttrValue,setAttributeTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrValue.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit Product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                onChange={(e)=>changeCategory(e,categories,setAttributeFromDb,setCategoryChosen)}
              >
                <option value="choose category">Choose category</option>
                {categories.map((category, idx) => {
                  return product.category === category.name ? (
                    <option selected key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            {attributeFromDb.length > 0 && (
              <Row>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formbasicattributeValue"
                  >
                    <Form.Label>Choose Attribute & set Value</Form.Label>
                    <Form.Select
                      name="atrrkey"
                      aria-label="Default select example"
                      ref={attrkey}
                      onChange={(e)=>setValueForAttributeKey(e,attributeFromDb,attrvalue)}
                    >
                      <option value="choose attribute">Choose attribute</option>
                      {attributeFromDb.map((attr, idx) => (
                        <Fragment key={idx}>
                          <option value={attr.key}>{attr.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formbasicattributeValue"
                  >
                    <Form.Label>Attribute Value</Form.Label>
                    <Form.Select
                      name="atrrval"
                      aria-label="Default select example"
                      ref={attrvalue}
                      onChange={attributeValueSelector}
                    ></Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributeTable && attributeTable.length > 0 && (
                <Table hover className="px-5">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributeTable.map((attr, idx) => (
                      <tr key={idx}>
                        <td>{attr.key}</td>
                        <td>{attr.value}</td>
                        <td>
                          {" "}
                          <CloseButton
                            onClick={() => deleteAttribute(attr.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={categoryChosen === "choose category"}
                    placeholder="first choose or create category"
                    required={newAttrValue}
                    name="newAttrKey"
                    type="text"
                    ref={createNewAttrKey}
                    onKeyUp={newAttributeKeyHandler}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={categoryChosen === "choose category"}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    ref={createNewAttrValue}
                    onKeyUp={newAttributeValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="primary" show={newAttrKey && newAttrValue}>
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row className="mb-2">
                {product.images &&
                  product.images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                        {console.log(image.path)}
                      <Image
                        crossOrigin="anonymous"
                        src={image.path ?? null}
                        fluid
                      />
                      <i
                        style={onHover}
                        className="bi bi-x text-danger"
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then((data) =>
                            setImageDelete(!imageDelete)
                          )
                        }
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => {
                  setIsUploading("upload files in Progress...");
                  uploadImagesCloudinaryApiRequest(e.target.files, id)
                  setTimeout(() => {
                      setImageUploaded(!imageUploaded);
                      setIsUploading("upload files Completed");
                    },5000)
                }}
              />
              {isUploading}
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductComponent;

