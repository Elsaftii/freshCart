import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'

export default function Navbar() {
  let {userToken , setUserToken} =useContext(UserContext)
  let navigate =useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/'}>
      <img src={logo} alt="fresh cart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken != null?<>
          <li className="nav-item">
          <Link className="nav-link "  to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/cart'}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/wishlist'}>Wishlist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/brands'}>Brands</Link>
        </li>
        </> :''}
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <Link style={{ textDecoration: 'none', color: 'blue' }} to={'https://www.facebook.com/profile.php?id=100010953011673'} target='_blank'><i className='fab fa-facebook me-3'></i></Link>
          <Link style={{ textDecoration: 'none', color: 'red' }} to={'https://www.instagram.com/saftiii_53/'} target='_blank'><i className='fab fa-instagram me-3'></i></Link>
          <Link style={{ textDecoration: 'none', color: 'black' }} to={'https://github.com/Elsaftii'} target='_blank'><i className='fab fa-github me-3'></i></Link>
          <Link style={{ textDecoration: 'none', color: 'blue' }} to={'https://www.linkedin.com/in/mahmoud-elsafty-26b811250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'} target='_blank'><i className='fab fa-linkedin me-3'></i></Link>
        </li>
        {userToken!=null?<>
        
          <li className="nav-item">
          <span onClick={logOut} className="nav-link cursor-pointer" >LogOut</span>
        </li></>:<> <li className="nav-item">
          <Link className="nav-link "  to={'/register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "  to={'/login'}>Login</Link>
        </li></>}
       
      </ul>
    </div>
  </div>
</nav>
  </>
}
