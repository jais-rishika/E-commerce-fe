import React from "react";
import { Form } from "react-bootstrap";
export default function AttributeFilterComponent({
  attrsFilter,
  setAttrsFromFilter,
}) {
  // console.log(attrsFilter)
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((filter, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{filter.key}</b>
            </Form.Label>
            {filter.value.map((valueForKey, idx2) => (
              <Form.Check
                key={idx2}
                type="checkbox"
                label={valueForKey}
                onChange={(e) => {
                  setAttrsFromFilter((filters) => {
                    if (filters.length == 0) {
                      return [{ key: filter.key, value: [valueForKey] }];
                    }
                    let index = filters.findIndex(
                      (item) => item.key === filter.key
                    );
                    if (index == -1) {
                      return [
                        ...filters,
                        { key: filter.key, value: [valueForKey] },
                      ];
                    }

                    //if clicked key is inside filters and checked
                    if (e.target.checked) {
                      filters[index].value.push(valueForKey);
                      let unique = [...new Set(filters[index].value)];
                      filters[index].value = unique;
                      return [...filters];
                    }

                    // if clicked key is inside filters and unchecked
                    let valuesUncheked = filters[index].value.filter(
                      (val) => val !== valueForKey
                    );
                    filters[index].value = valuesUncheked;
                    if (valuesUncheked.length > 0) {
                      return [...filters];
                    } else {
                      let filterWithoutOneKey = filters.filter(
                        (item) => item.key !== filter.key
                      );
                      return [...filterWithoutOneKey];
                    }
                  });
                }}
              />
            ))}
          </div>
        ))}
    </>
  );
}
