import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


    const fetchData = async() =>{
        
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
       

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }


    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr?.quantity * curr?.ProductId?.sellingPrice) ,0)
    console.log("price of the total Products",totalPrice)
  return (
    <div className='container mx-auto'>
        
        <div className='my-3 text-lg text-center'>
            {
                data.length === 0 && !loading && (
                    <p className='py-5 bg-white'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col gap-10 p-4 lg:flex-row lg:justify-between'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full h-32 my-2 border rounded bg-slate-200 border-slate-300 animate-pulse'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.ProductId?.productImage[0]} className='object-scale-down w-full h-full mix-blend-multiply' />
                                </div>
                                <div className='relative px-4 py-2'>
                                    {/**delete product */}
                                    <div className='absolute right-0 p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-600 hover:text-white' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.ProductId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.ProductId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-lg font-medium text-red-600'>{displayINRCurrency(product?.ProductId?.sellingPrice)}</p>
                                            <p className='text-lg font-semibold text-slate-600'>{displayINRCurrency(product?.ProductId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='flex items-center justify-center w-6 h-6 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='flex items-center justify-center w-6 h-6 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='w-full max-w-sm mt-5 lg:mt-0'>
                        {
                            loading ? (
                            <div className='border h-36 bg-slate-200 border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='bg-white h-36'>
                                    <h2 className='px-4 py-1 text-white bg-red-600'>Summary</h2>
                                    <div className='flex items-center justify-between gap-2 px-4 text-lg font-medium text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between gap-2 px-4 text-lg font-medium text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='w-full p-2 mt-2 text-white bg-blue-600'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
  )
}

export default Cart