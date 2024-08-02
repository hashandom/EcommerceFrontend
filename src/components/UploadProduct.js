import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, IconButton, Backdrop, Fade, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import productCategory from '../helper/productCategory';
import uploadImage from '../helper/uploadimage';

const ProductUpload = ({ open, onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [uploadProductImageUpload, setUploadProductImageUpload] = useState("");
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
      setUploadProductImageUpload(file.name);
      const uploadImageCloudinary = await uploadImage(file);
      console.log("image uploaded using Cloudinary", uploadImageCloudinary.url);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }));
    }
  };

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
          
          <TextField
            name="productName"
            label="Product Name"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={data.productName}
            onChange={handleOnChange}
          />
          <TextField
            name="brandName"
            label="Brand Name"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={data.brandName}
            onChange={handleOnChange}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              variant="outlined"
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
          />
        </Container>
      </Fade>
    </Backdrop>
  );
};

export default ProductUpload;
