import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
function CategoryFilterComponent({setCategoryChecked}) {
  const {categories}=useSelector((state)=> state.getCategories)
  const [selectedCategories, setSelectedCategories] = useState([]);

  const myRef=useRef([])

  const selectCategory=(e,category,idx)=>{
    setCategoryChecked((items)=>{
      return {...items,[category.name]:e.target.checked}
    }) 
    let selectMainCategory = category.name.split("/")[0]
    let allCategories =myRef.current.map((_,id)=>{
      return {name:categories[id].name , idx: id}
    })
    let IndexOfMainCategory =allCategories.reduce((acc,item)=>{
      var cat= item.name.split("/")[0]
      if(cat===selectMainCategory){
        acc.push(item.idx)
      }
      return acc
    },[])
    console.log(IndexOfMainCategory)
    if(e.target.checked){
      setSelectedCategories((old)=>[...old,"cat"]) //try later
      myRef.current.map((_,idx)=>{
        if(!IndexOfMainCategory.includes(idx))
          myRef.current[idx].disabled=true
        return ""
      })
    }else{
      setSelectedCategories((old)=>{
        var a=[...old]
        a.pop()
        if(a.length===0){
          window.location.href ="/product-list"
        }
        return a
      }) 
  }
}
  return (
    <>
    <span className="fw-bold">Category</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input ref={(el)=> (myRef.current[idx]=el)} type="checkbox" isValid onChange={(e)=>{
                selectCategory(e,category,idx)
              }}/>
              <Form.Check.Label style={{ cursor: "pointer" }}>
                {category.name}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
}

export default CategoryFilterComponent
