import React, {useState} from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router';



const Signup = () => {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate();


  const validate = values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Required'
    }

    if(values.password1.length < 6){
      errors.password1 = 'Password must be more than 6 characters'
    }

    if (!values.password1) {
      errors.password1 = 'Required'
    }

    if (!values.password2) {
      errors.password2 = 'Required'
    }

    if (values.password1 !== values.password2){
      errors.password2 = 'Password mismatch'
    }

    return errors
  }

  const onSubmit = (values) => {

    const { password1: password, ...rest} = values;
    const new_values = {password, ...rest}


    console.log(new_values)

    fetch('https://keylogging.pythonanywhere.com/api/add_user', {
            method: 'POST',
            body: JSON.stringify(new_values),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
              setMessage("Username already taken. Please pick try a different one")
            }else{
                alert("Account created")
            }
            return responce.json();
        }).then(data => {
          
            data.msg && navigate('/login')
            
        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password1: '',
      password2: ''
    },
    validate,
    onSubmit
  })


  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <label>Username:</label>
        <input
          id='username'
          name='username'
          onChange={formik.handleChange}
          type="text"
          value={formik.values.username}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && <div className='text-danger'>{formik.errors.username}</div>}

        <label>Password:</label>

        <input
          id='password1'
          type="password"
          name="password1"
          onChange={formik.handleChange}
          value={formik.values.password1}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password1 && formik.errors.password1 && <div className='text-danger'>{formik.errors.password1}</div>}

        <label>Repeat Password</label>

        <input
          id='password2'
          type="password"
          name="password2"
          onChange={formik.handleChange}
          value={formik.values.password2}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password2 && formik.errors.password2 && <div className='text-danger'>{formik.errors.password2}</div>}

        {!isPending && <button className="button" type='submit'>Create</button>}

        {message && <div className='loginAlert'>{message}</div>}
        {/* {isPending && <button disabled>Adding blog... </button>} */}
      </form>

    </div>
  )
}

export default Signup
