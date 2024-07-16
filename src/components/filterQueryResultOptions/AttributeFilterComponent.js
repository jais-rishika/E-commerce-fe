import React from "react";
import { Form } from "react-bootstrap";
export default function AttributeFilterComponent() {
  return (
    <>
      {[{ color: ["Red", "Blue", "Green"] }, { ram: ["1TB", "2TB"] }].map(
        (item, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{Object.keys(item)}</b>
            </Form.Label>
            {item[Object.keys(item)].map((i, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                id={`default-checkbox`}
                label={i}
              />
            ))}
          </div>
        )
      )}
    </>
  );
}
