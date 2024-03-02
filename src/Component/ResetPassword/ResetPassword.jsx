import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'
export default function ResetPassword() {

  const [Loading, setLoading] = useState(false)
  const [apiErorr, setapiErorr] = useState(null)
  let navigate = useNavigate()
  let { setUserToken } = useContext(UserContext)


  async function resetPassword(values) {
    setLoading(true)
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((err) => { setapiErorr(err.response.data.message); setLoading(false) 
     })
     setLoading(false)
     localStorage.setItem('userToken' , data.token)
     setUserToken(data.token)
     navigate('/login')
  }
  let validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is requird').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password')

  })
//   async function resetPassword(values) {
//     const apiUrl = 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword';
//     const payload = {
//       values
//     };

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'put',
//             body: JSON.stringify(payload)
//         });

//         if (response.ok) {
//             console.log('Password reset successful');
//         } else {
//             console.error('Password reset failed');
//         }
//     } catch (err) {
//       { setapiErorr(err.response.data.message); setLoading(false) }
//     }
// }

// Example usage
// const email = 'user@example.com';
// const newPassword = 'new_password';
// resetPassword(email, newPassword);

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    }, validationSchema
    , onSubmit: resetPassword
  })
  return <>
    <div className="w-75 mx-auto py-5 mt-4">
      <h2>reset your password :</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiErorr ? <div className="alert alert-danger">{apiErorr}</div> : ''}

        <input placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}


        <input placeholder='password' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}


        {Loading ? <button type='button' className='btn bg-main text-white'>
          <i className='fas fa-spinner fa-spin'></i>
        </button> : <button type='submet' className='btn bg-main text-white'>reset</button>}
      </form>
    </div>
  </>
}
