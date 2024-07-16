import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
function PriceFilterComponent() {
  return (
    <>
    <Row >
      <Form.Label className='offset-md-0.5'>
      <span className='fw-bold'>Price no greater than: </span>500$</Form.Label>
      <Form.Range min={10} max={1000} step={10} className='w-50 offset-md-1' />

    </Row>
    </>
  );
}

export default PriceFilterComponent;