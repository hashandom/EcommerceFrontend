import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import UploadProduct from '../components/UploadProduct';
import { useEffect, useState } from 'react';
import SummaryApi from '../common/index'; // Ensure this path is correct
import CloseIcon from '@mui/icons-material/Close';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url, {
        method: SummaryApi.allProduct.method,
      });
      const dataResponse = await response.json();
      console.log('All products:', dataResponse);
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <Container>
      <Container
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10, // Ensure the sticky section is above other content
          backgroundColor: 'white',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">All Products</Typography>
        <Button variant="contained" onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </Button>
      </Container>
      {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} open={openUploadProduct} fetchdata={fetchAllProduct} />}
      <Container sx={{ mt: 2, maxHeight: 'calc(100vh - 70px)', overflowY: 'auto', padding: '10px', backgroundColor:"#E0F6FF" }}>
        <Container sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
          {allProduct.map((product, index) => (
            <AdminProductCard data={product} key={index + "allProducts"} fetchdata={fetchAllProduct} />
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default AllProducts;
