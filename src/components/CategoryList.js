import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import SummaryApi from '../common';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(dataResponse.data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <Container sx={{marginTop: 10}}>
            <Grid container spacing={2} justifyContent="center">
                {loading ? (
                    Array.from(new Array(13)).map((_, index) => (
                        <Grid item xs={4} sm={3} md={2} key={index}>
                            <Paper elevation={3} style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Grid item xs={4} sm={3} md={2} key={product?.category}>
                            <Link to={`/product-category/${product?.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.category}
                                        style={{ height: 100, objectFit: 'cover', borderRadius: '50%', marginBottom: 8 }}
                                    />
                                    <Typography variant="body2" component="p" style={{ textTransform: 'capitalize' }}>
                                        {product?.category}
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default CategoryList;
