import axios from "axios";

export const uploadImagesCloudinaryApiRequest =(images, productId) => {
  const url = "https://api.cloudinary.com/v1_1/dcdboluf5/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "gjxfhnd2");
    fetch(url, { method: "POST", body: formData })
    .then(res=>{
      return res.json()
    })
    .then(data =>{
      console.log(data)
      console.log(productId)
      axios.post("/api/v1/products/admin/upload?productId=" + productId, data)
    })
  }
};
