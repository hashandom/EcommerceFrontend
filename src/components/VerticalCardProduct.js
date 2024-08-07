import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayLKRCurrency from '../helper/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <div className='container mx-auto mx-16 my-6 relative'>
            <h2 className='text-lg font-bold py-4'>{heading}</h2>
            {loading && <p>Loading...</p>}
            <button
                className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'
                onClick={scrollLeft}
            >
                <FaAngleLeft />
            </button>

            <button
                className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'
                onClick={scrollRight}
            >
                <FaAngleRight />
            </button>
            
            <div
                className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'
                ref={scrollElement}
            >
                {data.map((product, index) => (
                    <div key={index} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                        <div className='h-full h-48 bg-slate-200 p-2 min-w-[280px]h-32 md:min-w-[145px] flex items-center justify-center'>
                            <img
                                src={product.productImage[0] }
                                className='object-contain h-full w-full hover:scale-110 transition-all'
                                alt={product.productName}
                                
                            />
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-normal text-base text-ellipsis line-clamp-1 text-black md:text-lg'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div>
                                <p className='text-red-600 font-medium'>{displayLKRCurrency(product?.sellingPrice)}</p>
                                <p className='text-slate-500 line-through'>{displayLKRCurrency(product?.price)}</p>
                            </div>
                            <button className='bg-red-500 hover:bg-red-700 text-white text-sm px-2 py-1 rounded-full'>
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalCardProduct;
