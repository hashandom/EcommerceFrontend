import React, { useContext } from 'react';
import scrollTop from '../helper/scrollTop';
import displayINRCurrency from '../helper/displayCurrency';
import Context from '../context';
import addToCart from '../helper/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.stopPropagation(); // Stop the click event from bubbling up
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
            {loading ? (
                loadingList.map((_, index) => (
                    <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
                        to={`/product/${product?._id}`} 
                        key={product?._id} 
                        className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' 
                        onClick={scrollTop}
                    >
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                            <img 
                                src={product?.productImage[0]} 
                                alt={product?.productName} 
                                className='object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply'
                            />
                        </div>
                        <div className='grid gap-3 p-4'>
                            <h2 className='text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='font-medium text-red-600'>{displayINRCurrency(product?.sellingPrice)}</p>
                                <p className='line-through text-slate-500'>{displayINRCurrency(product?.price)}</p>
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
    );
};

export default VerticalCard;
