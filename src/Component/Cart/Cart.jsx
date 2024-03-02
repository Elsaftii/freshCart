import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { Cartcontext } from '../../Context/CartContext'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';


export default function Cart() {

  let { getCartItems, deleteCartItems, updateCartItems, deleteAllItems } = useContext(Cartcontext);
  const [cartItems, setCartItems] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(cartItems);

  async function getItems() {
    let { data } = await getCartItems()
    console.log(data);
    setCartItems(data)
    setLoading(false)
  }
  async function deleteItem(id) {
    setLoading(true)
    let { data } = await deleteCartItems(id)
    // console.log(data);
    setCartItems(data)
    setLoading(false)
  }
  async function deleteAllCart() {
    setLoading(true)
    let { data } = await deleteAllItems()
    if(data.message == 'success'){
      setCartItems(null)
    }
    setLoading(false)
  }
  async function updateCart(id, count) {
    setLoading(true)
    if (count < 1) {
      deleteItem(id)
      setLoading(false)

    }
    else {
      let { data } = await updateCartItems(id, count)
      setCartItems(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getItems()
  }, [])
  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Cart Shop</title>
    </Helmet>
    <div className='bg-main-light mt-5 pt-4 px-3'>

      <h2 className='fw-bold '>Cart shop</h2>
      {loading ? <div className="text-center fs-1 my-4 text-main">
        <i className='fas fa-spinner fa-spin'></i>

      </div> : cartItems? <>
        <div className='border-1 border-bottom pb-2 d-flex justify-content-between'>
          <div>
            <p className='text-main fw-bold'>Num Of Cart Items : {cartItems.numOfCartItems} </p>
            <p className='text-main fw-bold'>Total Cart Price : {cartItems.data.totalCartPrice} EGP</p>
          </div>
          <div>
            <Link to={`/shippingaddress/${cartItems.data._id}`} className='btn bg-main text-light m-3'>Check Out</Link>
          </div>
        </div>
        {cartItems.data.products.map((product, index) => <><div key={index} className="row border-1 border-bottom p-2 align-items-center">
          <div className='col-md-2'>
            <div className="img">
              <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
            </div>

          </div>
          <div className='col-md-8'>
            <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0, 4).join(' ')}</h3>
            <p className='fw-bold text-main px-3'>{product.price} EGP</p>
            <button onClick={() => deleteItem(product.product.id)} className='btn text-danger'><i className='fas fa-trash-can text-danger'></i> Remove</button>

          </div>
          <div className='col-md-2'>
            <div className="count">
              <button onClick={() => updateCart(product.product.id, product.count + 1)} className=' brdr '>+</button>
              <span className='p-2'>{product.count} </span>
              <button onClick={() => updateCart(product.product.id, product.count - 1)} className=' brdr'>-</button>

            </div>
          </div>
        </div>

        </>

        )}
        <button onClick={deleteAllCart} className='btn btn-danger my-3'>Clear All Items</button>

      </> : <h2 className='text-main text-center pb-5'> Your Cart is Empty......</h2>}

    </div>

  </>
}
