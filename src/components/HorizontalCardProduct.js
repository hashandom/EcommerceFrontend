import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayLKRCurrency from '../helper/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(categoryProduct.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft += 300;
        }
    };

    const scrollLeft = () => {
        if (scrollElement.current) {
            scrollElement.current.scrollLeft -= 300;
        }
    };

    return (
        <div className='container relative mx-16 mx-auto my-6'>
            <h2 className='py-4 text-lg font-bold'>{heading}</h2>
            {loading && <p>Loading...</p>}
            <button
                className='absolute left-0 hidden p-1 text-lg bg-white rounded-full shadow-md md:block'
                onClick={scrollLeft}
            >
                <FaAngleLeft />
            </button>

            <button
                className='absolute right-0 hidden p-1 text-lg bg-white rounded-full shadow-md md:block'
                onClick={scrollRight}
            >
                <FaAngleRight />
            </button>
            
            <div
                className='flex items-center gap-4 overflow-x-auto transition-all md:gap-6 scrollbar-none'
                ref={scrollElement}
            >
                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
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
                            to={`product/${product._id}`}
                            key={product._id}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'
                        >
                            <div className='h-full bg-slate-200 p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                <img
                                    src={product.productImage[0]}
                                    className='object-contain w-full h-full transition-transform hover:scale-110'
                                    alt={product.productName}
                                />
                            </div>
                            <div className='p-4'>
                                <h2 className='text-base font-normal text-black text-ellipsis line-clamp-1 md:text-lg'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div>
                                    <p className='font-medium text-red-600'>{displayLKRCurrency(product?.sellingPrice)}</p>
                                    <p className='line-through text-slate-500'>{displayLKRCurrency(product?.price)}</p>
                                </div>
                                <button
                                    className='px-2 py-1 text-sm text-white bg-red-500 rounded-full hover:bg-red-700'
                                    onClick={(e) => addToCart(e, product._id)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
