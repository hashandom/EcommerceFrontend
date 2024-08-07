import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img1_mobile.jpg'
import image3 from '../assest/banner/img2.webp'
import image4 from '../assest/banner/img3.jpg'
import image5 from '../assest/banner/img3_mobile.jpg'
import image6 from '../assest/banner/img4_mobile.jpg'
import image7 from '../assest/banner/img5.webp'

const desktopImages = [image1,image3,image4,image7]
const mobileImages = [image2,image5,image6]


const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = ()=>{
    if(desktopImages.length-1>currentImage){
      setCurrentImage((currentImage) => (currentImage + 1));
    }
}

const previousImage = ()=>{
  if(0!=currentImage){
    setCurrentImage((currentImage) => (currentImage - 1));
  }
}

useEffect(() => {
  const interval = setInterval(() => {
    if (desktopImages.length - 1 > currentImage) {
      nextImage();
    } else {
      setCurrentImage(0);
    }
  }, 5000);

  // Cleanup function to clear the interval
  return () => clearInterval(interval);
}, [currentImage, desktopImages.length]); // Include dependencies here


  return (
    <div className='container  mt-5 mx-auto px-48 rounded ' >
    <div className='h-60 md:h-72 w-full bg-slate-200 relative '>

      <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
        <div className='flex justify-between w-full text-2xl'>
        <button onClick={previousImage} className='bg-white shadow-md rounded-full p-1'>
          <FaAngleLeft/>
          
        </button>
    
        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
        
          <FaAngleRight/>
        </button >
        </div>
       
      </div>
      {/* desktop and tab version */}
        <div className='hidden md:flex h-full w-full overflow-hidden '>
        {
            desktopImages.map((imageURL,index)=>{
                return(
                    <div className='= h-full w-full min-w-full min-h-full transition-all' key={imageURL}  style={{ transform: `translateX(-${currentImage * 100}%)` }} >
                    <img src ={imageURL} className='w-full h-full '/>
                    </div>
                )
            })
        }
        </div>
        {/* mobiel version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
        {
            mobileImages.map((imageURL,index)=>{
                return(
                    <div className='= h-full w-full min-w-full min-h-full transition-all' key={imageURL}  style={{ transform: `translateX(-${currentImage * 100}%)` }} >
                    <img src ={imageURL} className='w-full h-full object-cover '/>
                    </div>
                )
            })
        }
        </div>
        
        
      
    </div>
    </div>
  )
}

export default BannerProduct
