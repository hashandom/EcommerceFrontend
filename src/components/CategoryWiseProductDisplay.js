import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayCurrency from '../helper/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.preventDefault(); // Prevent default action of button click
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct?.data || []);
        } catch (error) {
            console.error('Failed to fetch category products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className='container relative px-4 mx-auto my-6'>
            <h2 className='py-4 text-2xl font-semibold'>{heading}</h2>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 scrollbar-none'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                            </div>
                            <div className='grid gap-3 p-4'>
                                <h2 className='p-1 py-2 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 animate-pulse bg-slate-200'></h2>
                                <p className='p-1 py-2 capitalize rounded-full text-slate-500 animate-pulse bg-slate-200'></p>
                                <div className='flex gap-3'>
                                    <p className='w-full p-1 py-2 font-medium text-red-600 rounded-full animate-pulse bg-slate-200'></p>
                                    <p className='w-full p-1 py-2 line-through rounded-full text-slate-500 animate-pulse bg-slate-200'></p>
                                </div>
                                <button className='px-3 py-2 text-sm text-white rounded-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link
                            key={product?._id}
                            to={`product/${product?._id}`}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img
                                    src={product?.productImage[0] || 'placeholder-image.jpg'}
                                    alt={product?.productName || 'Product image'}
                                    className='object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply'
                                />
                            </div>
                            <div className='grid gap-3 p-4'>
                                <h2 className='text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1'>{product?.productName || 'Product Name'}</h2>
                                <p className='capitalize text-slate-500'>{product?.category || 'Category'}</p>
                                <div className='flex gap-3'>
                                    <p className='font-medium text-red-600'>{displayCurrency(product?.sellingPrice) || 'Price'}</p>
                                    <p className='line-through text-slate-500'>{displayCurrency(product?.price) || 'Original Price'}</p>
                                </div>
                                <button
                                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
