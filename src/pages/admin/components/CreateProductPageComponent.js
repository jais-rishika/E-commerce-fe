import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CreateProductPageComponent = ({
  categories,
  createProductApiRequest,
  uploadImagesCloudinaryApiRequest,
  changeCategory,
  setAttributeWrapper,
  setValueForAttributeKey,
  newCategory,
  deleteCategory,
  reduxDispatch,
  saveAttributesInTheDoc,
}) => {
  const navigate = useNavigate();
  //local States

  const [validated, setValidated] = useState(false);
  const [attributeTable, setAttributeTable] = useState([]);
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [image, setImage] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChosen, setCategoryChosen] = useState("choose category");
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);

  const attrkey = useRef(null);
  const attrvalue = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrValue = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    //creating these values
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributeTable: attributeTable,
    };
    if (event.currentTarget.checkValidity() === true) {
      if (image.length > 3) {
        setIsUploading("too many Files");
      }
      createProductApiRequest(formInputs)
        .then((data) => {
          if (image) {
            uploadImagesCloudinaryApiRequest(image, data.productId);
          }
          console.log(data);
          if (data.message === "product created") navigate("/admin/products");
        })
        .catch((er) =>
          setCreateProductResponseState(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }

    setValidated(true);
  };

  const uploadHandler = (image) => {
    setImage(image);
  };

  const deleteAttribute = (key) => {
    setAttributeTable((attr) => attr.filter((row) => row.key !== key));
  };

  const attributeValueSelector = (e) => {
      setAttributeWrapper(
        attrkey.current.value,
        attrvalue.current.value,
        setAttributeTable
      );
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
        setAttributeWrapper(newAttrKey, newAttrValue, setAttributeTable);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrValue.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value));
      setCategoryChosen(e.target.value);
      setTimeout(() => {
        let element = document.getElementById("cats");
        element.value = e.target.value;
        e.target.value = "";
      }, 200);
      setAttributeTable([])
    }
  };
  const deleteCategoryHandler = (e) => {
    let element = document.getElementById("cats");
    reduxDispatch(deleteCategory(element.value));
    setCategoryChosen("Choose category");
    setAttributeTable([])
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
          <h1>Create a new product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category <CloseButton onClick={deleteCategoryHandler} />(
                <small>remove selected</small>)
              </Form.Label>
              <Form.Select
                id="cats"
                required
                name="category"
                aria-label="Default select example"
                onChange={(e) =>{
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChosen
                  )
                  setAttributeTable([])
                  }
                }
              >
                <option value="">Choose category</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new Category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control
                name="newcategory"
                type="text"
                onKeyUp={newCategoryHandler}
              ></Form.Control>
            </Form.Group>

            {attributesFromDb.length > 0 && (
              <Row>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formbasicattributeValue"
                  >
                    <Form.Label>Choose Attribute & set Value</Form.Label>
                    <Form.Select
                      name="atrrval"
                      aria-label="Default select example"
                      ref={attrkey}
                      onChange={(e) =>
                        setValueForAttributeKey(
                          e,
                          attributesFromDb,
                          attrvalue
                        )
                      }
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </React.Fragment>
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
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributeTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributeTable.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
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
                    ref={createNewAttrKey}
                    disabled={["", "choose category"].includes(categoryChosen)}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
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
                    ref={createNewAttrValue}
                    disabled={["", "choose category"].includes(categoryChosen)}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttributeValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>

              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => uploadHandler(e.target.files)}
              />
              {isUploading}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
