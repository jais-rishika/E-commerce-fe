import Form from 'react-bootstrap/Form';

function SortOptionsComponent({setSortOption}) {
  return (
    <Form.Select aria-label="Default select example" className='w-50 offset-md-0.2'
      onChange={(e)=> setSortOption(e.target.value)}>
      <option>SORT BY</option>
      <option value="price_1">Price: Low to High</option>
      <option value="price_-1">Price: High to Low</option>
      <option value="rating_-1">Customer Rating</option>
      <option value="name-1">Name A-Z</option>
      <option value="name-1">Name Z-A</option>
    </Form.Select>
  );
}

export default SortOptionsComponent;