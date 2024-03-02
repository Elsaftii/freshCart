import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function ForgetPassword() {
  
  const [Loading, setLoading] = useState(false)
  const [apiErorr, setapiErorr] = useState(null)
  let navigate = useNavigate()
  
  async function GetCode(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .catch((err) => { setapiErorr(err.response.data.message); setLoading(false) })
      console.log(data);
    if (data.statusMsg == 'success') {
      setLoading(false)
      navigate('/verifycode')
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email')
  })

  let formik = useFormik({
    initialValues: {
      email: ''
    }, validationSchema
    , onSubmit: GetCode
  })
  return <>
  <div className="w-75 mx-auto py-5 mt-4">
    <h2>Please Enter your E-mail :</h2>
    <form onSubmit={formik.handleSubmit}>
    {apiErorr ? <div className="alert alert-danger">{apiErorr}</div> : ''}

    <input placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

    {Loading ? <button type='button' className='btn bg-main text-white'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> :<button type='submet' className='btn bg-main text-white'>Get code</button>}
    </form>
  </div>
  </>
}
