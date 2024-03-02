import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Categories() {

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  async function getAllCategories() {
    setLoading(true)
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    // console.log(data.data);
    setCategories(data.data)
    setLoading(false)
    
  }
  function click(){
    setLoading(true)
    setLoading(false)
  }
  useEffect(()=> {
    getAllCategories()
  },[])
  return <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>categories</title>
    </Helmet>
  {loading?<div className="text-center fs-1 my-4 text-main pt-5">
        <i className='fas fa-spinner fa-spin'></i>

      </div> :<div className="row g-4 mt-3">
        {categories.map(category => <div key={category._id} className='col-md-4 '>
        <Link onClick={click} style={{textDecoration: 'none' ,color: 'black' }} to={`#`}>

          <div className="product">
            <img className='w-100' height={400} src={category.image} alt={category.name} />
            <h3 className='text-main text-center py-2 fw-bold'>{category.name}</h3>
          </div>
          </Link>

        </div>)}
     </div> }

  </>
}