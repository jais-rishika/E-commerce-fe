import { Fragment } from "react";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
function RatingFilterComponent({rating,setRating}) {
  return (
    <>
      <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={idx}>
          <Form.Check type="checkbox" id={`check-api-${idx}`} >
            <Form.Check.Input type="checkbox" isValid className="mt-2 p-2" onChange={(e)=>{
              setRating((items)=> {return{...items,[5-idx]:e.target.checked}})
            }}/>
            <Form.Check.Label style={{ cursor: "pointer" }}>
              <Rating readonly size={20} initialValue={5 - idx} className=" pb-1"/>
            </Form.Check.Label>
          </Form.Check>
        </Fragment>
      ))}
    </>
  );
}

export default RatingFilterComponent;
