import React, { useContext, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Cartcontext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Products() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let { data, isLoading } = useQuery('featuredProducts', getProducts)

  let { addToCart, addToWishlist } = useContext(Cartcontext)
  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data?.status == 'success') {
      toast.success(data?.message)
    }
    else {
      toast.error(data?.message)
    }
  }
  async function postToWishlist(id) {
    let { data } = await addToWishlist(id)
    if (data?.status == 'success') {
      toast.success(data?.message)
    }
    else {
      toast.error(data?.message)
    }
  }

  
  return <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>products</title>
    </Helmet>
   {isLoading ?
    <div className="text-center fs-1 mt-4 text-main">
      <i className='fas fa-spinner fa-spin'></i>

    </div> : <> 
      <div className='row gy-4'>
        {data?.data.data.map(product =>
          <div key={product.id} className="col-lg-3 p-2 ">
            <div className="product">
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/productDetails/${product.id}`}>

                <img src={product.imageCover} className='w-100' alt={product.title} />
                <span className='text-main font-sm'>{product.category.name}</span>
                <div className='d-flex py-3 justify-content-between align-items-center'>
                  <h3 className='h6'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                </div>
                <div className='d-flex py-3 justify-content-between align-items-center'>
                  <span className='font-sm'>{product.price} EGP</span>
                  <span className='font-sm'>
                    <i className='fas fa-star rating-color me-1'></i>
                    {product.ratingsAverage}</span>
                </div>
              </Link>
              <i onClick={() => { postToWishlist(product.id) }} className='fas fa-heart me-2 fs-3 cursor-pointer'></i>


              <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add to cart</button>
            </div>

          </div>
        )}
      </div></>}
  </>
}
