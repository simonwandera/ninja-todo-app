import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../contexts/UserContext';
import { useFormik } from 'formik'

const Login = () => {
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
    const [isPending, setIsPending] = useState(false)
    const {userProfile, setUserProfile} = useContext(userContext)
    const navigate = useNavigate();


    const validate = values => {
        const errors = {}

        if (!values.username) {
            errors.username = 'Required'
        }

        if (!values.password) {
            errors.password = 'Required'
        }
        return errors
    }

    const onSubmit = (values) => {
        fetch('https://keylogging.pythonanywhere.com/api/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (!responce.ok) {
                alert("Failed to log in!")
            }else{
                alert("success")
            }
            return responce.json();
        }).then(data => {
            if (data.access_token){
                setUserProfile(data)
                localStorage.setItem("token", data.access_token)
                navigate('/admin')
            }

        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
    }

    const formik = useFormik({
        initialValues:  {
            username: '',
            password: ''
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
                    id='password'
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && <div className='text-danger'>{formik.errors.password}</div>}

                {!isPending && <button className="button" type='submit'>Login</button>}
                {!isPending && <button className="signup" type='button' onClick={() => navigate('/signup')}>Create account</button>}
                {/* {isPending && <button disabled>Adding blog... </button>} */}
            </form>

        </div>
    )
}

export default Login
