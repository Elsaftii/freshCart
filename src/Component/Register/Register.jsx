import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Register() {

  const [Loading, setLoading] = useState(false)
  const [apiErorr, setapiErorr] = useState(null)
  let navigate = useNavigate()

  async function registerSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => { setapiErorr(err.response.data.message); setLoading(false) })
    if (data.message == 'success') {
      setLoading(false)
      navigate('/Login')
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min width is 3').max(10, 'max width is 10'),
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is requird').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password'),
    rePassword: Yup.string().required('rePassword is requird').oneOf([Yup.ref('password')], 'password and rePassword dont match'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'we need egyption number ')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    }, validationSchema
    , onSubmit: registerSubmit
  })

  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Registration</title>
    </Helmet>
    <div className="w-75 mx-auto py-4">
      <h2>Register Now :</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiErorr ? <div className="alert alert-danger">{apiErorr}</div> : ''}


        <label htmlFor="name"> Name :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

        <label htmlFor="email"> email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}


        <label htmlFor="password"> Password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}


        <label htmlFor="rePassword"> rePassword :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}


        <label htmlFor="phone"> Phone :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

        {Loading ? <button type='button' className='btn bg-main text-white'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> : <button type='submet' className='btn bg-main text-white'>Register</button>}



      </form>
    </div>
  </>
}
