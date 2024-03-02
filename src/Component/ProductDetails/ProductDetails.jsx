import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Helmet} from "react-helmet";

export default function ProductDetails() {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  let { id } = useParams()
  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data.data);
    setDetails(data.data)
    setLoading(false)
  }
  useEffect(() => {
    getProductDetails(id)
  }, [])
  return <>
    {loading ?
      <div className="text-center fs-1 mt-4 text-main pt-5">
        <i className='fas fa-spinner fa-spin'></i>

      </div> : <>

        <Helmet>
          <meta charSet="utf-8" />
          <title>{details.category.name}</title>
        </Helmet> 
        <div className='row align-items-center mt-4 pt-5'>

          <div className="col-md-4">
            <img src={details.imageCover} className='w-100' alt="" />
          </div>
          <div className='col-md-8'>
            <div className="details">
              <h3 className='py-3 h4'></h3>
              <p>{details.description}</p>
              <span className=' font-sm text-main'>{details.category.name}</span>
              <div className='d-flex py-3 justify-content-between align-items-center'>
                <span className='font-sm'>{details.price} EGP</span>
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {details.ratingsAverage}</span>
              </div>
              <button className='btn bg-main text-main-light w-100 btn-sm text-white'> Add to cart</button>


            </div>
          </div>

        </div></>}

  </>
}
