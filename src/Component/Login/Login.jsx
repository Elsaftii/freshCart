import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'


export default function Login() {

  const [Loading, setLoading] = useState(false)
  const [apiErorr, setapiErorr] = useState(null)
  let navigate = useNavigate()
  let { setUserToken } = useContext(UserContext)

  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => { setapiErorr(err.response.data.message); setLoading(false) })
    if (data.message == 'success') {
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is requird').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password')
  })
  function forget(){
    navigate('/forgetpassword')
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema
    , onSubmit: loginSubmit
  })

  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
    </Helmet>
    <div className="w-75 mx-auto py-5 mt-4">
      <h2>login Now :</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiErorr ? <div className="alert alert-danger">{apiErorr}</div> : ''}



        <label htmlFor="email"> email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}


        <label htmlFor="password"> Password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}



        {Loading ? <button type='button' className='btn bg-main text-white'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> : <div className='d-flex justify-content-between '>
          <button type='submet' className='btn bg-main text-white'>login</button>
          <h3 onClick={forget} className='h5 fw-bold cursor-pointer text-main'>forget your password?</h3>
          </div>}



      </form>
    </div>
  </>
}
