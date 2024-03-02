import React, { useState } from 'react'
import style from './VerifyCode.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function VerifyCode() {
  const [Loading, setLoading] = useState(false)
  const [apiErorr, setApiErorr] = useState(null)
  let navigate = useNavigate()
  
  async function verifyCode(values) {
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
      .catch(err => { setApiErorr(err.response.data.message); setLoading(false) ;
     })

     if (data.status === "Success"){
      toast.success('verification code is correct' ,{ duration:2000})
      
     setLoading(false)
     navigate('/resetpassword')
     }

}
  let validationSchema = Yup.object({
    code: Yup.number().required('code is required')
  })


  let formik = useFormik({
    initialValues: {
      resetCode: ''
    }, validationSchema
    , onSubmit: verifyCode
  })
  return <>
  <div className="w-75 mx-auto py-5 mt-4">
    <h2>Please Enter verfication code :</h2>
    <form onSubmit={formik.handleSubmit}>
    {apiErorr ? <div className="alert alert-danger">{apiErorr}</div> : ''}

    <input placeholder='Code' onBlur={formik.handleBlur} onChange={formik.handleChange}  id='code' name='code' className='form-control mb-3' />
    {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger py-2'>{formik.errors.resetCode}</div> : null}

    {Loading ? <button type='button' className='btn bg-main text-white'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> :<button type='submet' className='btn bg-main text-white'>verfy</button>}
    </form>
  </div>
  </>
}
