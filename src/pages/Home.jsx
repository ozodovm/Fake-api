import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import { Empty, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import useDebounce from '../hook/useDebounce'

function HOme() {
  const [products, setProducts] = useState([])
  const [isLoading , setIsLoading] =useState(true)
  const [searchValue , setSearchValue] = useState("")

  function handleProductsSearch(e){
    setIsLoading(true)
    setSearchValue(e.target.value)
  }
  const searchWaitingValue = useDebounce(searchValue, 800)
  // selected change start
  const [categoryData , setCategoryData] = useState([])
  const [categoryId , setCategoryId] = useState(null)
  const onChange = (value) => {
    setIsLoading(true)
    setTimeout(() => {
      setCategoryId(value)
    }, 800);
  };

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories").then(res => {
      setCategoryData(res.data.map(item => {
        const data = {
          value:item.id,
          label:item.name
        }
        return data
      }));
      
    })
  },[])
  console.log(categoryData);
  // selected change end
  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/?title=${searchWaitingValue}&offset=1&limit=20`,{
      params:{
        categoryId:categoryId
      }
    }).then(res => {
      setProducts(res.data);
      setIsLoading(false)
    })
  },[searchWaitingValue, categoryId])

  return (
    <div className='p-10'>
      <div className="mb-5 space-x-4">
        <Input onChange={handleProductsSearch} size='large' allowClear className='w-[350px]' name='searching' placeholder='Search Product' autoComplete='off'/>
        <Select 
          allowClear className='w-[300px]' size='large' showSearch placeholder="Choose category" optionFilterProp="label" onChange={onChange} options={categoryData}
        />
      </div>
      <ul className='flex justify-between flex-wrap gap-5'>
        {isLoading ? 
        <li className='mx-auto mt-10'>
          <LoadingOutlined className='text-blue-600  mt-150'  style={{fontSize:"80px"}} /> 
        </li> 
        : products.length > 0 ? products.map(item => <ProductItem key={item.id} item={item} />)
        : <Empty className='inline-block mx-auto mt-[45px]' />}
      </ul>
    </div>
  )
}

export default HOme
