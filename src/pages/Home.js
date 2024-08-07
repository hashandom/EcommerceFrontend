import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"printers"} heading={"top printers"}/>
      <HorizontalCardProduct category={"airpodes"} heading={"top airpodes"}/>
      <VerticalCardProduct category={"airpodes"} heading={"top airpodes"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
      <VerticalCardProduct category={"printers"} heading={"top printers"}/>
    </div>
  )
}

export default Home
