import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import VerticalCard from '../components/VerticalCart'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.filterProduct.url, {
                method: SummaryApi.filterProduct.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    category: filterCategoryList
                })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const dataResponse = await response.json()
            setData(dataResponse?.data || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory(prev => ({
            ...prev,
            [value]: checked
        }))
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName])
        

        setFilterCategoryList(arrayOfCategory)

        const urlFormat = arrayOfCategory.map((el, index) => `category=${el}${index < arrayOfCategory.length - 1 ? '&&' : ''}`)

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    return (
        <div className='container p-4 mx-auto'>
            {/***desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/***left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/**sort by */}
                    <div>
                        <h3 className='pb-1 text-base font-medium uppercase border-b text-slate-500 border-slate-300'>Sort by</h3>
                        <form className='flex flex-col gap-2 py-2 text-sm'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>
                    {/**filter by */}
                    <div>
                        <h3 className='pb-1 text-base font-medium uppercase border-b text-slate-500 border-slate-300'>Category</h3>
                        <form className='flex flex-col gap-2 py-2 text-sm'>
                            {productCategory.map((category, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <input type='checkbox' name={"category"} value={category.value} checked={selectCategory[category.value]} id={category.value} onChange={handleSelectCategory} />
                                    <label htmlFor={category.value}>{category.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
                {/***right side (product) */}
                <div className='px-4'>
                    <p className='my-2 text-lg font-medium text-slate-800'>Search Results : {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
