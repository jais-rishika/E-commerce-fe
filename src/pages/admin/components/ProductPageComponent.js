import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
export default function ProductsPageComponent({
  fetchProducts,
  deleteProducts,
}) {
  const [products, setProducts] = useState([]);
  const [productDelete, setProductDelete] = useState(false);

  const deleteHandler = async(prodId) => {
    if (window.confirm("Are You Sure!?")) {
      const data = await deleteProducts(prodId);
      if (data.message === "product removed") {
        setProductDelete(!productDelete);
      }
    }
  };
  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((er) => {
        setProducts([
            {
              name: er.response.data.message
                ? er.response.data.message
                : er.response.data,
            },
          ]);
      });
    return () => abctrl.abort();
  }, [productDelete]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row className="m-5">
          <Col md={12}>
            <h1>
              Product List{" "}
              <LinkContainer to="/admin/create-new-products">
                <Button variant="primary" size="lg">
                  Create New
                </Button>
              </LinkContainer>
            </h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <i className={item}></i>
                    </td>
                    <td>
                      <LinkContainer to="/admin/edit-product">
                        <Button>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                      {" / "}
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(item._id)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
