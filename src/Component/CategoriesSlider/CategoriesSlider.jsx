import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'


export default function CategoriesSlider() {
  var settings = {
    dots: false,
    autoplay : true,
    autoplaySpeed : 1800,
    infinite : true,
    speed :700,
    slidesToShow :6,
    slidesToScroll : 1,
    arrows : false

  }
  async function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data} =useQuery('categories' , getCategories)
  console.log(data?.data.data);
  return <>
  <h2 className='h5' >Shop Popular Categories</h2>
  <div className="row">
    
  <Link style={{textDecoration: 'none' ,color: 'black' }} to={'/categories'}><Slider {...settings}>
    {data?.data.data.map(category=> <div key={category._id} className='col-md-2'>
      <div className="img">
        <img src={category.image} className='w-100' height={200} alt={category.name} />
        <p>{category.name}</p>
      </div>
    </div> )}
    </Slider></Link>
  </div>

  </>
}
