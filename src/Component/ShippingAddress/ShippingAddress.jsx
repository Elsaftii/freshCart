import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Cartcontext } from '../../Context/CartContext';

export default function ShippingAddress() {
  let {checkOutSession} = useContext(Cartcontext)
  let {cartId} =useParams()

  async function CheckOut(values){
    let {data} = await checkOutSession(cartId , values)

    if(data.status == 'success'){
      window.location.href =data.session.url
    }
  }

  let formik = useFormik({
    initialValues:{
      details : '',
      phone : '',
      city : ''
    }, onSubmit : CheckOut
  })
  return <>
  <Helmet>
    <meta charSet="utf-8" />
    <title>Check Out</title>
  </Helmet>
  <h2>ShippingAddress</h2>
  <div className="w-75 mx-auto">
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details"> details</label>
      <input onChange={formik.handleChange} type="text " id='details' name='details' className='form-control mb-3' />
      <label htmlFor="phone"> phone</label>
      <input onChange={formik.handleChange} type="tel " id='phone' name='phone' className='form-control mb-3' />
      <label htmlFor="city"> city</label>
      <input onChange={formik.handleChange} type="text " id='city' name='city' className='form-control mb-3' />
      <button className='btn bg-main text-light' type='submet'>Check Out</button>
    </form>
  </div>
  </>
}
