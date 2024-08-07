import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayLKRCurrency from '../helper/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)
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
                className='flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all'
                ref={scrollElement}
            >
               
                {
    loading ? (
        loadingList.map((product,index)=>{
            return(
                <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                        </div>
                        <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                    </div>
                </div>
            )
        })
        
    ) : (
        data.map((product, index) => (
            <Link to={`product/${product._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
            <div className='h-full bg-slate-200 p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
              <img
                src={product.productImage[0]}
                className='object-contain h-full w-full hover:scale-110 transition-transform'
                alt={product.productName}
              />
            </div>
            <div className='p-4'>
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
          </Link>
        ))
    )
}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
