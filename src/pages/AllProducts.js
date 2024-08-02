import { Container, Typography, Button } from '@mui/material';
import UploadProduct from '../components/UploadProduct';
import { useEffect, useState } from 'react';
import SummaryApi from '../common/index'; // Make sure this is used correctly in your code
import CloseIcon from '@mui/icons-material/Close';
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  // const [allProduct, setAllProduct] = useState([]);

  // const fetchAllProduct = async () => {
  //   try {
  //     // Fetch data from your API
  //     const response = await SummaryApi.get('/products'); // Adjust the endpoint as needed
  //     setAllProduct(response.data); // Assuming the data is an array of products
  //   } catch (error) {
  //     console.error('Failed to fetch products:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAllProduct();
  // }, []);

  return (
    <Container>
      <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'yellow', padding: '10px' }}>
        <Typography>All Products</Typography>
        <Button variant="contained" onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </Button>
      </Container>
      <Container>
        {openUploadProduct && <UploadProduct onClose ={() => setOpenUploadProduct(false)} open={openUploadProduct} />}
        {/* Display the products here */}
        {/* Example: */}
        
        
        {/* Display the products here */}
        {/* Example: */}
        {/* <Container>
          {allProduct.map((product) => (
            <Typography key={product.id}>{product.name}</Typography> // Adjust based on your product structure
          ))}
        </Container> */}
      </Container>
    </Container>
  );
};

export default AllProducts;
