import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, IconButton, Backdrop, Fade, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import productCategory from '../helper/productCategory';
import uploadImage from '../helper/uploadimage';
import DisplayImage from './DisplayImage';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index'
const ProductUpload = ({ open, onClose, fetchdata }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }));
    }
  };

  const deleteProductImage = (index) => () => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
      const response = await fetch(SummaryApi.uploadProduct.url,{
        method : SummaryApi.uploadProduct.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const responseData = await response.json()
  
      if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchdata()
      }
  
  
      if(responseData.error){
        toast.error(responseData?.message)
      }
    
  
    }
  

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(1px)' }}
      open={open}
    >
      <Fade in={open}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            width: 500,
            maxWidth: '100%',
            margin: 'auto',
            position: 'relative',
            maxHeight: '80vh', // Set a max height for scrolling
            overflowY: 'auto'  // Enable vertical scrolling
          }}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography sx={{ color: "black", marginBottom: 2 }} variant="h6">
            Upload Product
          </Typography>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              name="productName"
              label="Product Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={data.productName}
              onChange={handleOnChange}
              required
            />
            <TextField
              name="brandName"
              label="Brand Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={data.brandName}
              onChange={handleOnChange}
              required
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={data.category}
                onChange={handleOnChange}
                variant="outlined"
                required
              >
                {productCategory.map((e1, index) => (
                  <MenuItem key={e1.value + index} value={e1.value}>
                    {e1.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <input
                type="file"
                hidden
                onChange={handleUploadProduct}
                id="upload-product-image"
                required
              />
              <label htmlFor="upload-product-image">
                <Button
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Upload Image
                
                </Button>
              </label>
              
            </FormControl>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {data.productImage.map((el, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                  <IconButton
                    sx={{ position: 'absolute', bottom: 0, right: 0, color: 'red' }}
                    onClick={deleteProductImage(index)}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <img
                    src={el}
                    alt={`Product ${index}`}
                    width={80}
                    height={80}
                    style={{ backgroundColor: '#f0f0f0', border: '1px solid #ddd', cursor: 'pointer' }}
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />
                </div>
              ))}
            </div>
            
            <TextField
              name="description"
              label="Product Description"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              multiline
              rows={2}
              value={data.description}
              onChange={handleOnChange}
              required
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="number"
              value={data.price}
              onChange={handleOnChange}
              required
            />
            <TextField
              name="sellingPrice"
              label="Selling Price"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="number"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
            />
            <Button variant='contained' type='submit'>Upload Product</Button>
          </form>
        </Container>
      </Fade>
      <div>
        {/* Display image in full width */}
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
          open={openFullScreenImage}
        />
      </div>
    </Backdrop>
  );
};

export default ProductUpload;
