import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AdminEditProduct from './AdminEditProduct';
import displayLKRCurrency from '../helper/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'white', borderRadius: 5, position: 'relative' }}>
      <CardMedia
        component="img"
        height="5" // Adjusted height for better visibility
        image={data?.productImage[0]}
        alt={data.productName}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {data.productName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {displayLKRCurrency(data.sellingPrice)}
        </Typography>
        <Tooltip title="Edit">
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 8,
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
            }}
            onClick={() => setEditProduct(true)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardContent>

      {editProduct && (
        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
      )}
    </Card>
  );
};

export default AdminProductCard;
