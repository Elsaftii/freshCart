import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { Cartcontext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'


export default function Wishlist() {
  let {getWishlistItems ,deleteWishlistItems , addToCart} =useContext(Cartcontext)
  
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  async function getItems() {
    let { data } = await getWishlistItems()
    // console.log(data);
    setWishlist(data)
    setLoading(false)
  }
  async function postToCart(id){
    setLoading(true)
    let {data} = await addToCart(id)
    if(data?.status== 'success'){
      toast.success(data?.message)
      setLoading(false)
    }
    else{
      toast.error(data?.message)
      setLoading(false)

    }
  }
  async function deleteItem(id) {
    setLoading(true)
    let { data } = await deleteWishlistItems(id)
    console.log(data);
    setWishlist(data)
    getItems()
    setLoading(false)
  }
  useEffect(() => {
    getItems()
  }, [])
  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Wishlist</title>
    </Helmet>
    <div className='bg-main-light mt-5 pt-4 px-3'>

      <h2 className='fw-bold mb-4'>My Wishlist</h2>
      {loading ? <div className="text-center fs-1 my-4 text-main">
        <i className='fas fa-spinner fa-spin'></i>

      </div> : (wishlist.count != 0)? <>
      {wishlist.data.map((product , index)=><>
      <div key={index} className="row  border-1 border-bottom p-2 align-items-center">
        <div className="col-md-2">
          <div className="img">
            <img className='w-100' src={product.imageCover} alt={product.title} />
          </div>
        </div>
        <div className="col-md-8">
            <h3 className='h5 fw-bold'>{product.title}</h3>
            <p className='fw-bold text-main px-3'>{product.price} EGP</p>
            <button onClick={() => deleteItem(product._id)}  className='btn text-danger'><i className='fas fa-trash-can text-danger'></i> Remove</button>

        </div>
        <div className="col-md-2">
          <button onClick={()=> postToCart(product._id)} className='btn bg-main text-light'>Add to Cart</button>
        </div>
      </div>
      </>)}
      </> :<h2 className='text-main text-center pb-5'> Your Wishlist is Empty......</h2>}
    </div>
    
  </>
}
// onClick={() => deleteItem(product.product.id)}

