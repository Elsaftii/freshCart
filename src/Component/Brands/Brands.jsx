import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function Brands() {
  const [loading, setLoading] = useState(true)
  const [brands, setBrands] = useState([])
  async function getAllBrands() {
    setLoading(true)
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    // console.log(data.data);
    setBrands(data.data)
    setLoading(false)
    
  }
  useEffect(()=> {
    getAllBrands()
  },[])
  return <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>brands</title>
    </Helmet>
  <h2 className='text-main text-center fw-bold mt-4'>All Brands</h2>
  {loading?<div className="text-center fs-1 my-4 text-main">
        <i className='fas fa-spinner fa-spin'></i>

      </div> :<div className="row g-4 mt-3">
        {brands.map(brand => <div key={brand._id} className='col-md-3 '>
        <Link style={{textDecoration: 'none' ,color: 'black' }} to={`#`}>

          <div className="product">
            <img className='w-100'  src={brand.image} alt={brand.name} />
            <h3 className=' text-center py-2 '>{brand.name}</h3>
          </div>
          </Link>

        </div>)}
     </div> }
  </>
}
