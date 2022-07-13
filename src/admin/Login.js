import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../contexts/UserContext';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isPending, setIsPending] = useState(false)
    const {userProfile, setUserProfile} = useContext(userContext)
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { username, password };
        fetch('https://traffic.pythonanywhere.com/api/login', {
            method: 'POST',
            body: JSON.stringify(blog),
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
            }

        }).catch(error => {
            console.log(error.responce, error.status, error.headers)
        })
    }

    return (
        <div className="create">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <label>Password:</label>

                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isPending && <button className="button">Login</button>}
                {/* {isPending && <button disabled>Adding blog... </button>} */}
            </form>

        </div>
    )
}

export default Login
