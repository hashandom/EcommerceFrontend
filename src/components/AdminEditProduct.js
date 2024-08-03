import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, MenuItem, Select, TextField, Typography, Grid, Card, CardMedia, CardActions } from '@mui/material';
import { toast } from 'react-toastify';
import productCategory from '../helper/productCategory';
import uploadImage from '../helper/uploadimage';
import SummaryApi from '../common/index';
import DisplayImage from './DisplayImage';

// Import Material-UI icons
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Edit Product
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            required
          />
          <Select
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {productCategory.map((el) => (
              <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>
            ))}
          </Select>
          <Input
            type="file"
            id="uploadImageInput"
            style={{ display: 'none' }}
            onChange={handleUploadProduct}
          />
          <label htmlFor="uploadImageInput">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
              style={{ margin: '16px 0' }}
            >
              Upload Product Image
            </Button>
          </label>
          <Grid container spacing={2}>
            {data.productImage.length > 0 ? (
              data.productImage.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt="Product"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(image);
                      }}
                    />
                    <CardActions>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography color="error" variant="caption">*Please upload product image</Typography>
            )}
          </Grid>
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Selling Price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 16 }}
          >
            Update Product
          </Button>
        </form>
      </DialogContent>
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </Dialog>
  );
};

export default AdminEditProduct;
