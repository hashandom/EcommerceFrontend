import React from 'react'
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
  return (
    <div className='container  mt-5 mx-auto px-48 rounded ' >
    <div className='h-72 w-full bg-slate-200 '>
        <div className='flex h-full w-full'>
        {
            desktopImages.map((imageURL,index)=>{
                return(
                    <div className='= h-full w-full min-w-full min-h-full ' key={imageURL} >
                    <img src ={imageURL} className='w-full h-full '/>
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
